/**
 * Reporter module for sending live updates to the leaderboard service.
 * Streams progress metrics during task execution.
 */

export interface ReporterConfig {
  apiUrl: string;
  enabled: boolean;
  updateInterval?: number;
}

export interface RunMetrics {
  tokensUsed: number;
  filesRead: number;
  filesWritten: number;
  testsPass: number;
  testsFail: number;
  elapsedMs: number;
}

export interface RunUpdate {
  status?: 'initializing' | 'running' | 'evaluating' | 'completed' | 'failed';
  progress?: number;
  currentStep?: string;
  metrics?: Partial<RunMetrics>;
  logs?: Array<{ timestamp: string; message: string }>;
}

export class LiveReporter {
  private runId: string | null = null;
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private metrics: RunMetrics = {
    tokensUsed: 0,
    filesRead: 0,
    filesWritten: 0,
    testsPass: 0,
    testsFail: 0,
    elapsedMs: 0,
  };
  private startTime: number = 0;
  private logs: Array<{ timestamp: string; message: string }> = [];

  constructor(private config: ReporterConfig) {
    if (!config.updateInterval) {
      this.config.updateInterval = 5000; // Default 5 seconds
    }
  }

  async start(agentName: string, taskId: string): Promise<string | null> {
    if (!this.config.enabled) {
      return null;
    }

    try {
      const response = await fetch(`${this.config.apiUrl}/runs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentName, taskId }),
      });

      if (!response.ok) {
        console.error('Failed to start live reporting');
        return null;
      }

      const data = await response.json() as { id: string };
      this.runId = data.id;
      this.startTime = Date.now();
      this.metrics = {
        tokensUsed: 0,
        filesRead: 0,
        filesWritten: 0,
        testsPass: 0,
        testsFail: 0,
        elapsedMs: 0,
      };

      // Start periodic updates
      this.intervalId = setInterval(() => {
        this.sendUpdate({
          metrics: {
            ...this.metrics,
            elapsedMs: Date.now() - this.startTime,
          },
        });
      }, this.config.updateInterval);

      return this.runId;
    } catch (error) {
      console.error('Error starting live reporter:', error);
      return null;
    }
  }

  async sendUpdate(update: RunUpdate): Promise<void> {
    if (!this.config.enabled || !this.runId) {
      return;
    }

    try {
      // Send any pending logs
      if (this.logs.length > 0) {
        update.logs = [...this.logs];
        this.logs = [];
      }

      await fetch(`${this.config.apiUrl}/runs/${this.runId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(update),
      });
    } catch (error) {
      // Silently fail - don't interrupt task execution
      console.error('Error sending update:', error);
    }
  }

  log(message: string): void {
    this.logs.push({
      timestamp: new Date().toISOString(),
      message,
    });
  }

  updateMetrics(updates: Partial<RunMetrics>): void {
    this.metrics = { ...this.metrics, ...updates };
  }

  incrementTokens(count: number): void {
    this.metrics.tokensUsed += count;
  }

  incrementFilesRead(): void {
    this.metrics.filesRead++;
  }

  incrementFilesWritten(): void {
    this.metrics.filesWritten++;
  }

  setTestResults(pass: number, fail: number): void {
    this.metrics.testsPass = pass;
    this.metrics.testsFail = fail;
  }

  async setStatus(
    status: 'initializing' | 'running' | 'evaluating' | 'completed' | 'failed',
    progress?: number,
    currentStep?: string
  ): Promise<void> {
    await this.sendUpdate({ status, progress, currentStep });
  }

  async complete(finalMetrics?: Partial<RunMetrics>): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (finalMetrics) {
      this.metrics = { ...this.metrics, ...finalMetrics };
    }

    await this.sendUpdate({
      status: 'completed',
      progress: 100,
      currentStep: 'Complete',
      metrics: {
        ...this.metrics,
        elapsedMs: Date.now() - this.startTime,
      },
    });
  }

  async fail(error: string): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.log(`Error: ${error}`);

    await this.sendUpdate({
      status: 'failed',
      currentStep: 'Failed',
      metrics: {
        ...this.metrics,
        elapsedMs: Date.now() - this.startTime,
      },
    });
  }

  async cleanup(): Promise<void> {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    if (this.runId && this.config.enabled) {
      try {
        await fetch(`${this.config.apiUrl}/runs/${this.runId}`, {
          method: 'DELETE',
        });
      } catch {
        // Ignore cleanup errors
      }
    }

    this.runId = null;
  }
}

// Factory function for creating reporter
export function createReporter(options?: {
  apiUrl?: string;
  enabled?: boolean;
}): LiveReporter {
  return new LiveReporter({
    apiUrl: options?.apiUrl || process.env.LEADERBOARD_API_URL || 'http://localhost:3001/api/live',
    enabled: options?.enabled ?? (process.env.LIVE_REPORTING === 'true'),
  });
}
