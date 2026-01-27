import { Command } from 'commander';
import { loadAllTasks } from '../loader.js';
import { createAgent } from '../agents/index.js';
import { DockerRuntime } from '../runtime/docker.js';
import { Evaluator } from '../evaluator.js';
import _ora from 'ora';
import chalk from 'chalk';
import { table } from 'table';
import * as fs from 'fs/promises';
import * as path from 'path';

interface AgentResult {
  agent: string;
  taskId: string;
  scores: {
    functional: number;
    quality: number;
    security: { passed: boolean; issues: string[] };
    cost: number;
    speed: number;
    final: number;
  };
  metrics: {
    duration: number;
    tokens: number;
    inputTokens: number;
    outputTokens: number;
    cost: number;
  };
}

export const evalCommand = new Command('eval')
  .description('Run full benchmark evaluation across multiple agents')
  .option('-a, --agents <agents>', 'Comma-separated agents (default: all)', 'claude,glm,minimax')
  .option('-c, --category <category>', 'Only run tasks in category')
  .option('-n, --limit <n>', 'Limit number of tasks per category')
  .option('-o, --output <file>', 'Output results to JSON file', 'results.json')
  .option('--parallel <n>', 'Run n tasks in parallel', '1')
  .option('--skip <n>', 'Skip first n tasks (for resuming)')
  .action(async (options) => {
    const agents = options.agents.split(',').map((a: string) => a.trim());
    const tasks = await loadAllTasks();

    let filtered = tasks;
    if (options.category) {
      filtered = filtered.filter(t => t.category === options.category);
    }
    if (options.limit) {
      const limit = parseInt(options.limit);
      const byCategory = new Map<string, typeof tasks>();
      for (const t of filtered) {
        const cat = byCategory.get(t.category) || [];
        if (cat.length < limit) {
          cat.push(t);
          byCategory.set(t.category, cat);
        }
      }
      filtered = [...byCategory.values()].flat();
    }

    // Skip first N tasks if specified (for resuming runs)
    if (options.skip) {
      const skipCount = parseInt(options.skip);
      filtered = filtered.slice(skipCount);
      console.log(chalk.yellow(`Skipping first ${skipCount} tasks\n`));
    }

    console.log(chalk.bold.cyan('\n🚀 VibeCodingBench Evaluation\n'));
    console.log(`  Tasks: ${filtered.length}`);
    console.log(`  Agents: ${agents.join(', ')}`);
    console.log('');

    const results: AgentResult[] = [];
    const evaluator = new Evaluator();
    const _runtime = new DockerRuntime({ timeout: 300000, tokenLimit: 100000 });

    const parallelism = parseInt(options.parallel) || 1;

    for (const agentName of agents) {
      console.log(chalk.bold(`\n📊 Evaluating ${agentName.toUpperCase()} (parallel: ${parallelism})\n`));

      const agent = createAgent(agentName);
      const agentResults: AgentResult[] = [];

      // Process tasks in batches for parallel execution
      for (let i = 0; i < filtered.length; i += parallelism) {
        const batch = filtered.slice(i, i + parallelism);

        const batchPromises = batch.map(async (task) => {
          const taskRuntime = new DockerRuntime({ timeout: 300000, tokenLimit: 100000 });
          console.log(`- [${agentName}] ${task.id}`);

          try {
            const workspaceId = await taskRuntime.createWorkspace(task);
            const startTime = Date.now();

            const result = await taskRuntime.execute({ task, agent, workspaceId });
            const duration = (Date.now() - startTime) / 1000;

            const scores = await evaluator.evaluate(task, result);

            const agentResult: AgentResult = {
              agent: agentName,
              taskId: task.id,
              scores: {
                functional: scores.functional,
                quality: scores.quality,
                security: scores.security,
                cost: scores.cost,
                speed: scores.speed,
                final: scores.final
              },
              metrics: {
                duration,
                tokens: result.metrics.totalTokens,
                inputTokens: result.metrics.inputTokens,
                outputTokens: result.metrics.outputTokens,
                cost: result.metrics.cost
              }
            };

            await taskRuntime.cleanup(workspaceId);

            console.log(`✔ [${agentName}] ${task.id}: ${scores.final.toFixed(1)}%`);
            return agentResult;
          } catch (error) {
            console.log(`✖ [${agentName}] ${task.id}: ERROR - ${error}`);
            return {
              agent: agentName,
              taskId: task.id,
              scores: { functional: 0, quality: 0, security: { passed: false, issues: [] }, cost: 0, speed: 0, final: 0 },
              metrics: { duration: 0, tokens: 0, inputTokens: 0, outputTokens: 0, cost: 0 }
            } as AgentResult;
          }
        });

        const batchResults = await Promise.all(batchPromises);
        agentResults.push(...batchResults);
        results.push(...batchResults);
      }

      const avgScore = agentResults.reduce((a, r) => a + r.scores.final, 0) / agentResults.length;
      const avgCost = agentResults.reduce((a, r) => a + r.metrics.cost, 0) / agentResults.length;
      console.log(chalk.gray(`\n  ${agentName} Average: ${avgScore.toFixed(1)}% | Avg Cost: $${avgCost.toFixed(4)}`));
    }

    // Summary table
    console.log(chalk.bold.cyan('\n\n📈 LEADERBOARD\n'));

    const leaderboard = agents.map((agentName: string) => {
      const agentResults = results.filter(r => r.agent === agentName);
      const avgFunctional = avg(agentResults.map(r => r.scores.functional));
      const avgQuality = avg(agentResults.map(r => r.scores.quality));
      const avgFinal = avg(agentResults.map(r => r.scores.final));
      const totalCost = agentResults.reduce((acc, r) => acc + r.metrics.cost, 0);
      const passRate = agentResults.filter(r => r.scores.functional >= 80).length / agentResults.length * 100;

      return {
        agent: agentName,
        functional: avgFunctional,
        quality: avgQuality,
        final: avgFinal,
        cost: totalCost,
        passRate
      };
    }).sort((a: { final: number }, b: { final: number }) => b.final - a.final);

    const tableData = [
      ['Rank', 'Agent', 'Pass Rate', 'Functional', 'Quality', 'Final', 'Total Cost'].map(h => chalk.bold(h)),
      ...leaderboard.map((r: { agent: string; passRate: number; functional: number; quality: number; final: number; cost: number }, i: number) => [
        `#${i + 1}`,
        r.agent.toUpperCase(),
        `${r.passRate.toFixed(0)}%`,
        `${r.functional.toFixed(1)}%`,
        `${r.quality.toFixed(1)}%`,
        chalk.bold(`${r.final.toFixed(1)}%`),
        `$${r.cost.toFixed(2)}`
      ])
    ];

    console.log(table(tableData));

    // Save results
    const outputPath = path.resolve(options.output);
    await fs.writeFile(outputPath, JSON.stringify({
      timestamp: new Date().toISOString(),
      tasks: filtered.length,
      results,
      leaderboard
    }, null, 2));

    console.log(chalk.gray(`\nResults saved to: ${outputPath}`));
  });

function avg(nums: number[]): number {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}
