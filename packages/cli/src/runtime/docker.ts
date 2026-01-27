import type { Task } from '../loader.js';
import type { Agent, AgentEvent } from '../agents/index.js';
import type { ExecutionResult } from '../evaluator.js';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface RuntimeOptions {
  timeout: number;
  tokenLimit: number;
  useDocker?: boolean;
}

export interface ExecuteOptions {
  task: Task;
  agent: Agent;
  workspaceId: string;
  live?: boolean;
  record?: boolean;
  onProgress?: (event: AgentEvent) => void;
}

export class DockerRuntime {
  private options: RuntimeOptions;
  private workspaces = new Map<string, string>();

  constructor(options: RuntimeOptions) {
    this.options = options;
  }

  async createWorkspace(task: Task): Promise<string> {
    const id = crypto.randomUUID().slice(0, 8);
    const workspacePath = path.join(process.cwd(), '.workspaces', id);

    await fs.mkdir(workspacePath, { recursive: true });

    // Copy task files
    const taskDir = path.dirname(task.promptFile);
    await this.copyDir(taskDir, workspacePath);

    // Copy template if exists
    if (task.template) {
      const templatePath = path.resolve(process.cwd(), 'templates', task.template);
      await this.copyDir(templatePath, workspacePath);
    }

    this.workspaces.set(id, workspacePath);
    return id;
  }

  async execute(options: ExecuteOptions): Promise<ExecutionResult> {
    const { task, agent, workspaceId, onProgress } = options;
    const workspacePath = this.workspaces.get(workspaceId);

    if (!workspacePath) {
      throw new Error(`Workspace not found: ${workspaceId}`);
    }

    const startTime = Date.now();
    let totalTokens = 0;
    let steps = 0;
    const filesCreated: string[] = [];
    const filesModified: string[] = [];

    // Read prompt
    let prompt: string;
    try {
      const promptPath = path.join(workspacePath, 'PROMPT.md');
      prompt = await fs.readFile(promptPath, 'utf-8');
    } catch {
      prompt = `Complete the following task:\n\n${task.description}`;
    }

    // Get initial file list
    const initialFiles = await this.listFiles(workspacePath);

    // Execute agent
    const events: AgentEvent[] = [];
    const agentOutput: string[] = [];

    for await (const event of agent.execute(task, prompt)) {
      events.push(event);
      steps++;

      if (onProgress) {
        onProgress(event);
      }

      if (event.type === 'text') {
        agentOutput.push(event.message);

        // Parse code blocks and write files
        const codeBlocks = this.parseCodeBlocks(event.message);
        for (const block of codeBlocks) {
          if (block.filename) {
            const filePath = path.join(workspacePath, block.filename);
            await fs.mkdir(path.dirname(filePath), { recursive: true });
            await fs.writeFile(filePath, block.code);

            if (initialFiles.has(block.filename)) {
              filesModified.push(block.filename);
            } else {
              filesCreated.push(block.filename);
            }
          }
        }
      }

      if (event.type === 'error') {
        return {
          success: false,
          output: event.message,
          files: { created: [], modified: [], deleted: [] },
          metrics: {
            totalTokens: 0,
            inputTokens: 0,
            outputTokens: 0,
            cost: 0,
            filesRead: 0,
            filesChanged: 0,
            duration: Date.now() - startTime,
            steps
          }
        };
      }
    }

    const duration = Date.now() - startTime;

    // Run tests if Docker is enabled
    let testOutput = '';
    let testsPassed = false;

    if (this.options.useDocker !== false) {
      const testResult = await this.runTests(workspacePath, task);
      testOutput = testResult.output;
      testsPassed = testResult.passed;
    }

    // Get token counts from agent events (real API usage) or estimate
    const doneEvent = events.find(e => e.type === 'done');
    let inputTokens = 0;
    let outputTokens = 0;

    if (doneEvent?.data?.inputTokens && doneEvent?.data?.outputTokens) {
      // Use real token counts from API
      inputTokens = doneEvent.data.inputTokens as number;
      outputTokens = doneEvent.data.outputTokens as number;
      totalTokens = doneEvent.data.tokens as number || (inputTokens + outputTokens);
    } else if (doneEvent?.data?.tokens) {
      // Use total tokens from API
      totalTokens = doneEvent.data.tokens as number;
      inputTokens = Math.floor(totalTokens * 0.3);
      outputTokens = totalTokens - inputTokens;
    } else {
      // Fallback: estimate from text length
      inputTokens = Math.ceil(prompt.length / 4);
      outputTokens = Math.ceil(agentOutput.join('').length / 4);
      totalTokens = inputTokens + outputTokens;
    }

    const cost = this.calculateCost(agent.name, inputTokens, outputTokens);

    return {
      success: testsPassed || !this.options.useDocker,
      output: agentOutput.join('\n') + (testOutput ? `\n\n--- Test Results ---\n${testOutput}` : ''),
      files: {
        created: filesCreated,
        modified: filesModified,
        deleted: []
      },
      metrics: {
        totalTokens,
        inputTokens,
        outputTokens,
        cost,
        filesRead: initialFiles.size,
        filesChanged: filesCreated.length + filesModified.length,
        duration,
        steps
      }
    };
  }

  private async runTests(workspacePath: string, task: Task): Promise<{ passed: boolean; output: string }> {
    const composeFile = path.join(workspacePath, 'docker-compose.yaml');

    try {
      await fs.access(composeFile);
    } catch {
      return { passed: true, output: 'No docker-compose.yaml found, skipping tests' };
    }

    try {
      // Start containers
      await execAsync(`docker compose -f "${composeFile}" up -d`, {
        cwd: workspacePath,
        timeout: 60000
      });

      // Wait for services to be ready
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Run tests based on task configuration
      let testCmd = '';
      if (task.tests?.functional) {
        const testFile = path.join(workspacePath, task.tests.functional);
        const ext = path.extname(testFile);

        if (ext === '.ts' || ext === '.js') {
          testCmd = `docker compose -f "${composeFile}" exec -T app npm test 2>&1 || npx vitest run ${testFile} 2>&1`;
        } else if (ext === '.py') {
          testCmd = `docker compose -f "${composeFile}" exec -T app pytest ${task.tests.functional} 2>&1 || python -m pytest ${testFile} 2>&1`;
        }
      }

      if (!testCmd) {
        testCmd = `docker compose -f "${composeFile}" exec -T test npm test 2>&1 || echo "No test command configured"`;
      }

      const { stdout, stderr } = await execAsync(testCmd, {
        cwd: workspacePath,
        timeout: this.options.timeout
      });

      const output = stdout + stderr;
      const passed = !output.toLowerCase().includes('fail') &&
                     !output.toLowerCase().includes('error') &&
                     output.toLowerCase().includes('pass');

      return { passed, output };

    } catch (error) {
      const errMsg = error instanceof Error ? error.message : String(error);
      return { passed: false, output: `Test execution error: ${errMsg}` };

    } finally {
      // Cleanup containers
      try {
        await execAsync(`docker compose -f "${composeFile}" down -v --remove-orphans`, {
          cwd: workspacePath,
          timeout: 30000
        });
      } catch {
        // Ignore cleanup errors
      }
    }
  }

  async cleanup(workspaceId: string): Promise<void> {
    const workspacePath = this.workspaces.get(workspaceId);
    if (workspacePath) {
      // Stop any running containers
      const composeFile = path.join(workspacePath, 'docker-compose.yaml');
      try {
        await execAsync(`docker compose -f "${composeFile}" down -v --remove-orphans 2>/dev/null`, {
          cwd: workspacePath,
          timeout: 30000
        });
      } catch {
        // Ignore
      }

      await fs.rm(workspacePath, { recursive: true, force: true });
      this.workspaces.delete(workspaceId);
    }
  }

  private parseCodeBlocks(text: string): Array<{ filename?: string; code: string; language?: string }> {
    const blocks: Array<{ filename?: string; code: string; language?: string }> = [];
    const regex = /```(\w+)?(?:\s+(\S+))?\n([\s\S]*?)```/g;

    let match;
    while ((match = regex.exec(text)) !== null) {
      const [, language, filename, code] = match;
      // Validate filename: skip if it's empty, ends with /, or is clearly not a file
      let validFilename = filename || this.inferFilename(language, code);
      if (validFilename) {
        // Skip directory paths (end with /) or paths without file extensions
        if (validFilename.endsWith('/') || (!validFilename.includes('.') && !validFilename.includes('/'))) {
          validFilename = undefined;
        }
      }
      blocks.push({
        language,
        filename: validFilename,
        code: code.trim()
      });
    }

    return blocks;
  }

  private inferFilename(language?: string, code?: string): string | undefined {
    if (!language) return undefined;

    // Try to infer from common patterns in code
    if (code) {
      // Look for file path comments like "// src/index.ts" or "# app/main.py"
      const pathMatch = code.match(/^(?:\/\/|#|\/\*)\s*(\S+\.\w+)/m);
      if (pathMatch) return pathMatch[1];
    }

    // Default filenames by language
    const defaults: Record<string, string> = {
      typescript: 'index.ts',
      javascript: 'index.js',
      python: 'main.py',
      go: 'main.go',
      rust: 'src/main.rs',
      tsx: 'App.tsx',
      jsx: 'App.jsx'
    };

    return defaults[language];
  }

  private async listFiles(dir: string, prefix = ''): Promise<Set<string>> {
    const files = new Set<string>();

    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(prefix, entry.name);

        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          const subFiles = await this.listFiles(path.join(dir, entry.name), fullPath);
          subFiles.forEach(f => files.add(f));
        } else if (entry.isFile()) {
          files.add(fullPath);
        }
      }
    } catch {
      // Ignore errors
    }

    return files;
  }

  private calculateCost(agent: string, input: number, output: number): number {
    // Pricing per 1M tokens (exact API costs)
    const pricing: Record<string, { input: number; output: number }> = {
      claude: { input: 1.0, output: 5.0 },     // Claude Haiku 4.5
      'claude-opus': { input: 5.0, output: 25.0 }, // Claude Opus 4.5
      openai: { input: 1.75, output: 14.0 },   // GPT-5.2
      glm: { input: 0.6, output: 2.2 },        // GLM-4.7
      minimax: { input: 0.3, output: 1.2 },    // MiniMax-M2.1
      gemini: { input: 0.5, output: 3.0 },     // Gemini-3-flash-preview
      deepseek: { input: 0.4, output: 1.6 },   // DeepSeek Chat-v3
      mock: { input: 0, output: 0 }
    };

    const p = pricing[agent] || pricing.mock;
    return (input / 1_000_000) * p.input + (output / 1_000_000) * p.output;
  }

  private async copyDir(src: string, dest: string): Promise<void> {
    try {
      const entries = await fs.readdir(src, { withFileTypes: true });
      await fs.mkdir(dest, { recursive: true });

      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.name === 'node_modules' || entry.name.startsWith('.')) {
          continue;
        }

        if (entry.isDirectory()) {
          await this.copyDir(srcPath, destPath);
        } else {
          await fs.copyFile(srcPath, destPath);
        }
      }
    } catch {
      // Source doesn't exist
    }
  }
}
