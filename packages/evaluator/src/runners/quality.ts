import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import type { EvaluationResult, RunnerOptions } from '../index.js';

interface QualityMetrics {
  lintErrors: number;
  lintWarnings: number;
  complexity: number;
  duplications: number;
}

export class QualityRunner {
  async run(options: RunnerOptions): Promise<EvaluationResult & { metrics: QualityMetrics }> {
    const files = await this.findSourceFiles(options.workspacePath);

    let lintErrors = 0;
    let lintWarnings = 0;

    // Run appropriate linter based on file types
    const hasTs = files.some(f => f.endsWith('.ts') || f.endsWith('.tsx'));
    const hasPy = files.some(f => f.endsWith('.py'));
    const hasGo = files.some(f => f.endsWith('.go'));

    if (hasTs) {
      const result = await this.runEslint(options.workspacePath);
      lintErrors += result.errors;
      lintWarnings += result.warnings;
    }

    if (hasPy) {
      const result = await this.runRuff(options.workspacePath);
      lintErrors += result.errors;
      lintWarnings += result.warnings;
    }

    if (hasGo) {
      const result = await this.runGolangci(options.workspacePath);
      lintErrors += result.errors;
      lintWarnings += result.warnings;
    }

    const metrics: QualityMetrics = {
      lintErrors,
      lintWarnings,
      complexity: 0, // TODO: Calculate cyclomatic complexity
      duplications: 0 // TODO: Detect code duplication
    };

    // Scoring: start at 100, deduct for issues
    let score = 100;
    score -= lintErrors * 5; // 5 points per error
    score -= lintWarnings * 1; // 1 point per warning
    score = Math.max(0, score);

    return {
      score,
      maxScore: 100,
      metrics,
      details: { files: files.length, lintErrors, lintWarnings }
    };
  }

  private async findSourceFiles(dir: string): Promise<string[]> {
    const files: string[] = [];
    const extensions = ['.ts', '.tsx', '.js', '.jsx', '.py', '.go', '.rs'];

    async function scan(d: string) {
      try {
        const entries = await fs.readdir(d, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
          const full = path.join(d, entry.name);
          if (entry.isDirectory()) {
            await scan(full);
          } else if (extensions.some(ext => entry.name.endsWith(ext))) {
            files.push(full);
          }
        }
      } catch {
        // Skip inaccessible directories
      }
    }

    await scan(dir);
    return files;
  }

  private runEslint(cwd: string): Promise<{ errors: number; warnings: number }> {
    return this.runLinter('npx', ['eslint', '.', '--format=json'], cwd, (output) => {
      try {
        const json = JSON.parse(output);
        return {
          errors: json.reduce((a: number, f: { errorCount: number }) => a + f.errorCount, 0),
          warnings: json.reduce((a: number, f: { warningCount: number }) => a + f.warningCount, 0)
        };
      } catch {
        return { errors: 0, warnings: 0 };
      }
    });
  }

  private runRuff(cwd: string): Promise<{ errors: number; warnings: number }> {
    return this.runLinter('ruff', ['check', '.', '--output-format=json'], cwd, (output) => {
      try {
        const json = JSON.parse(output);
        return { errors: json.length, warnings: 0 };
      } catch {
        return { errors: 0, warnings: 0 };
      }
    });
  }

  private runGolangci(cwd: string): Promise<{ errors: number; warnings: number }> {
    return this.runLinter('golangci-lint', ['run', '--out-format=json'], cwd, (output) => {
      try {
        const json = JSON.parse(output);
        return { errors: json.Issues?.length || 0, warnings: 0 };
      } catch {
        return { errors: 0, warnings: 0 };
      }
    });
  }

  private runLinter(
    cmd: string,
    args: string[],
    cwd: string,
    parser: (output: string) => { errors: number; warnings: number }
  ): Promise<{ errors: number; warnings: number }> {
    return new Promise((resolve) => {
      const proc = spawn(cmd, args, { cwd, timeout: 60000 });
      let stdout = '';

      proc.stdout.on('data', (data) => { stdout += data; });
      proc.on('close', () => resolve(parser(stdout)));
      proc.on('error', () => resolve({ errors: 0, warnings: 0 }));
    });
  }
}
