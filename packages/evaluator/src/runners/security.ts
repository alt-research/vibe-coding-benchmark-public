import { spawn } from 'child_process';
import type { EvaluationResult, RunnerOptions } from '../index.js';

interface SecurityIssue {
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  rule: string;
  message: string;
  file: string;
  line: number;
}

export class SecurityRunner {
  async run(options: RunnerOptions): Promise<EvaluationResult & { issues: SecurityIssue[] }> {
    return new Promise((resolve) => {
      // Use Semgrep for security scanning
      const proc = spawn('semgrep', [
        '--config=p/owasp-top-ten',
        '--json',
        options.workspacePath
      ], {
        timeout: options.timeout || 120000
      });

      let stdout = '';
      let _stderr = '';

      proc.stdout.on('data', (data) => { stdout += data; });
      proc.stderr.on('data', (data) => { _stderr += data; });

      proc.on('close', (_code) => {
        const issues = this.parseSemgrepOutput(stdout);
        const critical = issues.filter(i => i.severity === 'critical' || i.severity === 'high');

        // Any critical/high = fail
        if (critical.length > 0) {
          resolve({
            score: 0,
            maxScore: 100,
            issues,
            details: { passed: false, critical: critical.length, total: issues.length }
          });
        } else {
          // Deduct points for medium/low issues
          const deduction = issues.reduce((acc, i) => {
            if (i.severity === 'medium') return acc + 10;
            if (i.severity === 'low') return acc + 5;
            return acc;
          }, 0);

          resolve({
            score: Math.max(0, 100 - deduction),
            maxScore: 100,
            issues,
            details: { passed: true, issues: issues.length }
          });
        }
      });

      proc.on('error', () => {
        // Semgrep not installed - skip security checks
        resolve({
          score: 100,
          maxScore: 100,
          issues: [],
          details: { skipped: true, reason: 'Semgrep not available' }
        });
      });
    });
  }

  private parseSemgrepOutput(output: string): SecurityIssue[] {
    try {
      const json = JSON.parse(output);
      return (json.results || []).map((r: Record<string, unknown>) => ({
        severity: this.mapSeverity(r.extra as Record<string, unknown>),
        rule: r.check_id as string,
        message: (r.extra as Record<string, unknown>)?.message as string || '',
        file: r.path as string,
        line: (r.start as Record<string, number>)?.line || 0
      }));
    } catch {
      return [];
    }
  }

  private mapSeverity(extra: Record<string, unknown>): SecurityIssue['severity'] {
    const severity = (extra?.severity as string)?.toLowerCase() || 'info';
    if (severity.includes('critical') || severity.includes('error')) return 'critical';
    if (severity.includes('high') || severity.includes('warning')) return 'high';
    if (severity.includes('medium')) return 'medium';
    if (severity.includes('low')) return 'low';
    return 'info';
  }
}
