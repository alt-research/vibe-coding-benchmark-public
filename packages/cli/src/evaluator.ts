import type { Task } from './loader.js';

export interface ExecutionResult {
  success: boolean;
  output: string;
  files: {
    created: string[];
    modified: string[];
    deleted: string[];
  };
  metrics: {
    totalTokens: number;
    inputTokens: number;
    outputTokens: number;
    cost: number;
    filesRead: number;
    filesChanged: number;
    duration: number;
    steps: number;
  };
}

export interface EvaluationScores {
  functional: number;      // 0-100
  visual: number;          // 0-100
  quality: number;         // 0-100
  security: {
    passed: boolean;
    issues: string[];
  };
  cost: number;            // 0-100 (higher = more efficient)
  speed: number;           // 0-100 (higher = faster)
  final: number;           // Weighted average
}

export class Evaluator {
  private weights = {
    functional: 0.40,
    visual: 0.20,
    quality: 0.20,
    cost: 0.10,
    speed: 0.10
  };

  async evaluate(task: Task, result: ExecutionResult): Promise<EvaluationScores> {
    const functional = await this.evaluateFunctional(task, result);
    const visual = await this.evaluateVisual(task, result);
    const quality = await this.evaluateQuality(task, result);
    const security = await this.evaluateSecurity(task, result);
    const cost = this.evaluateCost(result);
    const speed = this.evaluateSpeed(task, result);

    // Security failure = automatic fail
    if (!security.passed) {
      return {
        functional,
        visual,
        quality,
        security,
        cost,
        speed,
        final: 0
      };
    }

    const final =
      functional * this.weights.functional +
      visual * this.weights.visual +
      quality * this.weights.quality +
      cost * this.weights.cost +
      speed * this.weights.speed;

    return {
      functional,
      visual,
      quality,
      security,
      cost,
      speed,
      final: Math.round(final * 10) / 10
    };
  }

  private async evaluateFunctional(task: Task, result: ExecutionResult): Promise<number> {
    if (!task.tests.functional || !result.success) return 0;
    // Run functional tests and compute pass rate
    // For now, return mock score
    return result.success ? 85 : 0;
  }

  private async evaluateVisual(task: Task, _result: ExecutionResult): Promise<number> {
    if (!task.tests.visual) return 100; // No visual tests = skip
    // Run visual diff and compute match percentage
    return 90;
  }

  private async evaluateQuality(_task: Task, _result: ExecutionResult): Promise<number> {
    // Run linters, compute complexity
    // Deduct points for lint errors, high complexity
    return 80;
  }

  private async evaluateSecurity(_task: Task, _result: ExecutionResult): Promise<{ passed: boolean; issues: string[] }> {
    // Run Semgrep/security scanner
    // Any critical/high = fail
    return { passed: true, issues: [] };
  }

  private evaluateCost(result: ExecutionResult): number {
    // Lower cost = higher score
    // Baseline: $0.50 per task = 50 points
    // $0 = 100, $1+ = 0
    const maxCost = 1.0;
    const score = Math.max(0, 100 - (result.metrics.cost / maxCost) * 100);
    return Math.round(score);
  }

  private evaluateSpeed(task: Task, result: ExecutionResult): number {
    // Compare to timeout
    const ratio = result.metrics.duration / (task.timeout * 1000);
    // Under 25% of timeout = 100, at timeout = 0
    const score = Math.max(0, 100 - (ratio * 100));
    return Math.round(score);
  }
}
