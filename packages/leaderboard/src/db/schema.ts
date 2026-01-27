import { pgTable, uuid, varchar, integer, real, timestamp, jsonb, text } from 'drizzle-orm/pg-core';

// Agents table - stores registered agents
export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  version: varchar('version', { length: 50 }).notNull(),
  provider: varchar('provider', { length: 100 }), // anthropic, openai, glm, minimax
  config: jsonb('config'), // API configuration (not secrets)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tasks table - stores benchmark tasks
export const tasks = pgTable('tasks', {
  id: varchar('id', { length: 255 }).primaryKey(), // e.g., saas-core/auth/supabase-oauth
  name: varchar('name', { length: 255 }).notNull(),
  category: varchar('category', { length: 100 }).notNull(),
  subcategory: varchar('subcategory', { length: 100 }),
  difficulty: varchar('difficulty', { length: 20 }).notNull(), // easy, medium, hard
  stack: varchar('stack', { length: 100 }),
  tags: jsonb('tags').$type<string[]>(),
  weights: jsonb('weights').$type<{
    functional: number;
    visual: number;
    quality: number;
    cost: number;
    speed: number;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Benchmark runs table - stores each benchmark execution
export const benchmarkRuns = pgTable('benchmark_runs', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').references(() => agents.id),
  agentName: varchar('agent_name', { length: 255 }).notNull(),
  agentVersion: varchar('agent_version', { length: 50 }).notNull(),
  seed: integer('seed'), // For reproducibility with task variations
  status: varchar('status', { length: 20 }).notNull().default('pending'), // pending, running, completed, failed
  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
  totalTasks: integer('total_tasks').notNull().default(0),
  passedTasks: integer('passed_tasks').notNull().default(0),
  failedTasks: integer('failed_tasks').notNull().default(0),
  avgScore: real('avg_score'),
  totalCost: real('total_cost').default(0),
  totalTokens: integer('total_tokens').default(0),
  totalDurationMs: integer('total_duration_ms'),
  metadata: jsonb('metadata'), // Additional run metadata
});

// Task results table - stores individual task results within a run
export const taskResults = pgTable('task_results', {
  id: uuid('id').primaryKey().defaultRandom(),
  runId: uuid('run_id').references(() => benchmarkRuns.id).notNull(),
  taskId: varchar('task_id', { length: 255 }).references(() => tasks.id).notNull(),
  status: varchar('status', { length: 20 }).notNull(), // passed, failed, error, skipped

  // Scores (0-100)
  functionalScore: real('functional_score'),
  visualScore: real('visual_score'),
  qualityScore: real('quality_score'),
  securityScore: real('security_score'),
  costScore: real('cost_score'),
  speedScore: real('speed_score'),
  overallScore: real('overall_score'),

  // Metrics
  tokensUsed: integer('tokens_used').default(0),
  inputTokens: integer('input_tokens').default(0),
  outputTokens: integer('output_tokens').default(0),
  cost: real('cost').default(0),
  durationMs: integer('duration_ms'),

  // Code metrics
  filesCreated: integer('files_created').default(0),
  filesModified: integer('files_modified').default(0),
  linesAdded: integer('lines_added').default(0),
  linesRemoved: integer('lines_removed').default(0),

  // Test results
  testsPassed: integer('tests_passed').default(0),
  testsFailed: integer('tests_failed').default(0),
  testsSkipped: integer('tests_skipped').default(0),

  // Error info
  errorMessage: text('error_message'),
  errorStack: text('error_stack'),

  // Full output (for debugging)
  agentOutput: text('agent_output'),

  startedAt: timestamp('started_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
});

// Leaderboard snapshot table - periodic snapshots for historical tracking
export const leaderboardSnapshots = pgTable('leaderboard_snapshots', {
  id: uuid('id').primaryKey().defaultRandom(),
  snapshotDate: timestamp('snapshot_date').defaultNow().notNull(),
  agentName: varchar('agent_name', { length: 255 }).notNull(),
  agentVersion: varchar('agent_version', { length: 50 }).notNull(),
  rank: integer('rank').notNull(),
  totalRuns: integer('total_runs').notNull(),
  avgScore: real('avg_score').notNull(),
  avgFunctional: real('avg_functional'),
  avgVisual: real('avg_visual'),
  avgQuality: real('avg_quality'),
  avgCost: real('avg_cost'),
  avgSpeed: real('avg_speed'),
  passRate: real('pass_rate'),
  totalCost: real('total_cost'),
});

// Type exports for use in application code
export type Agent = typeof agents.$inferSelect;
export type NewAgent = typeof agents.$inferInsert;
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type BenchmarkRun = typeof benchmarkRuns.$inferSelect;
export type NewBenchmarkRun = typeof benchmarkRuns.$inferInsert;
export type TaskResult = typeof taskResults.$inferSelect;
export type NewTaskResult = typeof taskResults.$inferInsert;
export type LeaderboardSnapshot = typeof leaderboardSnapshots.$inferSelect;
