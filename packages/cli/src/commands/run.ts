import { Command } from 'commander';
import { loadTask } from '../loader.js';
import { createAgent } from '../agents/index.js';
import { DockerRuntime } from '../runtime/docker.js';
import { Evaluator } from '../evaluator.js';
import { createReporter } from '../reporter.js';
import ora from 'ora';
import chalk from 'chalk';

export const runCommand = new Command('run')
  .description('Run a benchmark task with an AI agent')
  .argument('<task-id>', 'Task ID to run (e.g., saas-core/auth/supabase-oauth)')
  .requiredOption('-a, --agent <agent>', 'Agent to use (claude, glm, minimax, openai)')
  .option('-t, --timeout <seconds>', 'Timeout in seconds', '300')
  .option('--token-limit <tokens>', 'Max tokens', '100000')
  .option('--live', 'Stream output in real-time and report to leaderboard service')
  .option('--live-url <url>', 'Leaderboard API URL for live reporting', 'http://localhost:3001/api/live')
  .option('--record', 'Record session for replay')
  .option('--no-docker', 'Run without Docker isolation (for debugging)')
  .action(async (taskId, options) => {
    const spinner = ora('Loading task...').start();

    // Initialize live reporter if enabled
    const reporter = createReporter({
      apiUrl: options.liveUrl,
      enabled: options.live,
    });

    try {
      const task = await loadTask(taskId);
      if (!task) {
        spinner.fail(`Task not found: ${taskId}`);
        process.exit(1);
      }
      spinner.succeed(`Loaded task: ${task.name}`);

      spinner.start(`Initializing ${options.agent} agent...`);
      const agent = createAgent(options.agent);
      spinner.succeed(`Agent ready: ${options.agent}`);

      // Start live reporting
      if (options.live) {
        const runId = await reporter.start(options.agent, taskId);
        if (runId) {
          console.log(chalk.blue(`Live reporting: ${options.liveUrl.replace('/api/live', '')}/live/${runId}`));
        }
        await reporter.setStatus('initializing', 0, 'Setting up environment');
      }

      const runtime = new DockerRuntime({
        timeout: parseInt(options.timeout) * 1000,
        tokenLimit: parseInt(options.tokenLimit),
        useDocker: options.docker !== false
      });

      spinner.start('Setting up environment...');
      const workspaceId = await runtime.createWorkspace(task);
      spinner.succeed('Environment ready');

      if (options.live) {
        await reporter.setStatus('running', 10, 'Agent executing task');
      }

      console.log(chalk.cyan('\n--- Agent Execution ---\n'));

      const startTime = Date.now();
      const result = await runtime.execute({
        task,
        agent,
        workspaceId,
        live: options.live,
        record: options.record,
        onProgress: (event) => {
          if (options.live) {
            console.log(chalk.gray(`[${event.type}] ${event.message}`));
            reporter.log(`[${event.type}] ${event.message}`);

            // Update metrics based on event type
            if (event.type === 'tool_use') {
              // Track file operations from tool use events
              if (event.message?.includes('read')) {
                reporter.incrementFilesRead();
              } else if (event.message?.includes('write') || event.message?.includes('edit')) {
                reporter.incrementFilesWritten();
              }
            }
          }
        }
      });

      const duration = (Date.now() - startTime) / 1000;

      if (options.live) {
        await reporter.setStatus('evaluating', 80, 'Running evaluation');
      }

      console.log(chalk.cyan('\n--- Evaluation ---\n'));

      const evaluator = new Evaluator();
      const scores = await evaluator.evaluate(task, result);

      // Report test results
      if (options.live) {
        reporter.setTestResults(
          scores.functional >= 70 ? 1 : 0,
          scores.functional < 70 ? 1 : 0
        );
      }

      console.log(chalk.bold('\nResults:'));
      console.log(`  ${chalk.gray('Duration:')} ${duration.toFixed(1)}s`);
      console.log(`  ${chalk.gray('Tokens:')} ${result.metrics.totalTokens.toLocaleString()}`);
      console.log(`  ${chalk.gray('Cost:')} $${result.metrics.cost.toFixed(4)}`);
      console.log(`  ${chalk.gray('Files Changed:')} ${result.metrics.filesChanged}`);

      console.log(chalk.bold('\nScores:'));
      console.log(`  ${chalk.gray('Functional:')} ${colorScore(scores.functional)}%`);
      console.log(`  ${chalk.gray('Quality:')} ${colorScore(scores.quality)}%`);
      console.log(`  ${chalk.gray('Security:')} ${scores.security.passed ? chalk.green('PASS') : chalk.red('FAIL')}`);
      console.log(`  ${chalk.bold('Final:')} ${colorScore(scores.final)}%`);

      // Complete live reporting
      if (options.live) {
        await reporter.complete({
          tokensUsed: result.metrics.totalTokens,
          filesRead: result.metrics.filesRead || 0,
          filesWritten: result.metrics.filesChanged,
          elapsedMs: duration * 1000,
        });
      }

      await runtime.cleanup(workspaceId);

    } catch (error) {
      if (options.live) {
        await reporter.fail(String(error));
      }
      spinner.fail(`Error: ${error}`);
      process.exit(1);
    }
  });

function colorScore(score: number): string {
  if (score >= 90) return chalk.green(score.toFixed(1));
  if (score >= 70) return chalk.yellow(score.toFixed(1));
  return chalk.red(score.toFixed(1));
}
