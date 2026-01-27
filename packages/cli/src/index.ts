#!/usr/bin/env node
import { Command } from 'commander';
import { config } from 'dotenv';
import { listCommand } from './commands/list.js';
import { runCommand } from './commands/run.js';
import { evalCommand } from './commands/eval.js';

config();

const program = new Command();

program
  .name('vibecodingbench')
  .description('Benchmark for evaluating AI coding agents on real-world developer tasks')
  .version('0.1.0');

program.addCommand(listCommand);
program.addCommand(runCommand);
program.addCommand(evalCommand);

program.parse();
