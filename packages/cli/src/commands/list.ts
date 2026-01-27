import { Command } from 'commander';
import { loadAllTasks } from '../loader.js';
import { table } from 'table';
import chalk from 'chalk';

export const listCommand = new Command('list')
  .description('List all available benchmark tasks')
  .option('-c, --category <category>', 'Filter by category')
  .option('-d, --difficulty <level>', 'Filter by difficulty (easy, medium, hard)')
  .option('--json', 'Output as JSON')
  .action(async (options) => {
    const tasks = await loadAllTasks();

    let filtered = tasks;
    if (options.category) {
      filtered = filtered.filter(t => t.category === options.category);
    }
    if (options.difficulty) {
      filtered = filtered.filter(t => t.difficulty === options.difficulty);
    }

    if (options.json) {
      console.log(JSON.stringify(filtered, null, 2));
      return;
    }

    if (filtered.length === 0) {
      console.log(chalk.yellow('No tasks found matching criteria.'));
      return;
    }

    const categories = [...new Set(filtered.map(t => t.category))];

    for (const category of categories) {
      console.log(chalk.bold.cyan(`\n${category.toUpperCase()}`));

      const categoryTasks = filtered.filter(t => t.category === category);
      const data = [
        [chalk.gray('ID'), chalk.gray('Name'), chalk.gray('Difficulty'), chalk.gray('Stack')],
        ...categoryTasks.map(t => [
          t.id,
          t.name,
          colorDifficulty(t.difficulty),
          t.stack || '-'
        ])
      ];

      console.log(table(data, {
        border: { bodyLeft: '  ' }
      }));
    }

    console.log(chalk.gray(`\nTotal: ${filtered.length} tasks`));
  });

function colorDifficulty(d: string): string {
  switch (d) {
    case 'easy': return chalk.green(d);
    case 'medium': return chalk.yellow(d);
    case 'hard': return chalk.red(d);
    default: return d;
  }
}
