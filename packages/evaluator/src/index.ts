export { FunctionalRunner } from './runners/functional.js';
export { SecurityRunner } from './runners/security.js';
export { QualityRunner } from './runners/quality.js';
export { VisualRunner } from './runners/visual.js';

export interface EvaluationResult {
  score: number;
  maxScore: number;
  details: Record<string, unknown>;
}

export interface RunnerOptions {
  workspacePath: string;
  timeout?: number;
}
