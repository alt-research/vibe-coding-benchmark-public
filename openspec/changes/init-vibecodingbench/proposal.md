# Change: Initialize VibeCodingBench

## Why
Existing coding benchmarks (HumanEval, SWE-bench) focus on algorithmic puzzles or isolated bug fixes. Real developers spend 40% of time on SaaS boilerplate, integrations, and glue code. We need a benchmark that measures what coding agents actually do in production.

## What Changes
- Create monorepo structure with task runner CLI
- Define task specification format (YAML + Docker)
- Implement multi-dimensional evaluation (functional, quality, security, efficiency)
- Build leaderboard service for hosted evaluation
- Add 200+ tasks across 5 categories: SaaS, Glue Code, AI Integration, Frontend, API

## Impact
- Affected specs: task-runner, task-definition, evaluation, leaderboard (all new)
- Affected code: Greenfield project
