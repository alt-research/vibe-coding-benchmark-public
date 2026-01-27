import { spawn } from 'child_process';
import * as path from 'path';
import type { EvaluationResult, RunnerOptions } from '../index.js';

export class FunctionalRunner {
  async run(testPath: string, options: RunnerOptions): Promise<EvaluationResult> {
    const ext = path.extname(testPath);

    let command: string;
    let args: string[];

    switch (ext) {
      case '.ts':
      case '.js':
        command = 'npx';
        args = ['vitest', 'run', testPath, '--reporter=json'];
        break;
      case '.py':
        command = 'python';
        args = ['-m', 'pytest', testPath, '--json-report', '--json-report-file=-'];
        break;
      case '.go':
        command = 'go';
        args = ['test', '-json', testPath];
        break;
      default:
        return { score: 0, maxScore: 100, details: { error: `Unsupported test type: ${ext}` } };
    }

    return new Promise((resolve) => {
      const proc = spawn(command, args, {
        cwd: options.workspacePath,
        timeout: options.timeout || 60000
      });

      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (data) => { stdout += data; });
      proc.stderr.on('data', (data) => { stderr += data; });

      proc.on('close', (code) => {
        if (code === 0) {
          resolve({ score: 100, maxScore: 100, details: { passed: true, output: stdout } });
        } else {
          // Try to parse test output for partial credit
          const passed = this.parseTestOutput(stdout, ext);
          resolve({
            score: passed.passed / passed.total * 100,
            maxScore: 100,
            details: { passed: passed.passed, total: passed.total, output: stdout, error: stderr }
          });
        }
      });

      proc.on('error', (err) => {
        resolve({ score: 0, maxScore: 100, details: { error: err.message } });
      });
    });
  }

  private parseTestOutput(output: string, ext: string): { passed: number; total: number } {
    try {
      if (ext === '.ts' || ext === '.js') {
        const json = JSON.parse(output);
        return {
          passed: json.numPassedTests || 0,
          total: json.numTotalTests || 1
        };
      }
      if (ext === '.py') {
        const json = JSON.parse(output);
        return {
          passed: json.summary?.passed || 0,
          total: json.summary?.total || 1
        };
      }
    } catch {
      // Fall back to regex parsing
      const passMatch = output.match(/(\d+) passed/);
      const failMatch = output.match(/(\d+) failed/);
      const passed = passMatch ? parseInt(passMatch[1]) : 0;
      const failed = failMatch ? parseInt(failMatch[1]) : 0;
      return { passed, total: passed + failed || 1 };
    }
    return { passed: 0, total: 1 };
  }
}
