import * as fs from 'fs/promises';
import * as path from 'path';
import { watch } from 'fs';
import { parse as parseYaml } from 'yaml';
import Ajv from 'ajv';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const taskSchema = require('./schema/task.schema.json');
import { EventEmitter } from 'events';

export interface Task {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  stack?: string;
  timeout: number;
  tokenLimit: number;
  template?: string;
  promptFile: string;
  tests: {
    functional?: string;
    visual?: string;
    security?: string;
  };
  docker?: {
    compose?: string;
    image?: string;
  };
  weight: number;
  tags: string[];
}

const ajv = new Ajv();
const validateTask = ajv.compile(taskSchema);

const TASKS_DIR = path.resolve(process.cwd(), 'tasks');

/**
 * Load a single task by ID (e.g., "saas-core/auth/supabase-oauth")
 */
export async function loadTask(taskId: string): Promise<Task | null> {
  const taskPath = path.join(TASKS_DIR, taskId, 'task.yaml');

  try {
    const content = await fs.readFile(taskPath, 'utf-8');
    const raw = parseYaml(content);

    if (!validateTask(raw)) {
      console.error(`Invalid task.yaml at ${taskPath}:`, validateTask.errors);
      return null;
    }

    const taskData = raw as Record<string, unknown>;
    return {
      id: taskId,
      name: taskData.name as string,
      category: taskData.category as string,
      subcategory: taskData.subcategory as string | undefined,
      description: taskData.description as string,
      difficulty: taskData.difficulty as 'easy' | 'medium' | 'hard',
      stack: taskData.stack as string | undefined,
      timeout: (taskData.timeout as number) || 300,
      tokenLimit: (taskData.tokenLimit as number) || 100000,
      template: taskData.template as string | undefined,
      promptFile: path.join(TASKS_DIR, taskId, (taskData.promptFile as string) || 'PROMPT.md'),
      tests: {
        functional: (taskData.tests as Record<string, string>)?.functional
          ? path.join(TASKS_DIR, taskId, (taskData.tests as Record<string, string>).functional)
          : undefined,
        visual: (taskData.tests as Record<string, string>)?.visual
          ? path.join(TASKS_DIR, taskId, (taskData.tests as Record<string, string>).visual)
          : undefined,
        security: (taskData.tests as Record<string, string>)?.security
          ? path.join(TASKS_DIR, taskId, (taskData.tests as Record<string, string>).security)
          : undefined,
      },
      docker: taskData.docker as { compose?: string; image?: string } | undefined,
      weight: (taskData.weight as number) || 1.0,
      tags: (taskData.tags as string[]) || []
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

/**
 * Discover and load all tasks from the tasks directory.
 * Tasks are modular - just add a new folder with task.yaml to register.
 */
export async function loadAllTasks(): Promise<Task[]> {
  const tasks: Task[] = [];

  async function scanDirectory(dir: string, prefix: string = ''): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;

      const fullPath = path.join(dir, entry.name);
      const taskId = prefix ? `${prefix}/${entry.name}` : entry.name;
      const taskYaml = path.join(fullPath, 'task.yaml');

      try {
        await fs.access(taskYaml);
        const task = await loadTask(taskId);
        if (task) tasks.push(task);
      } catch {
        // No task.yaml, recurse into subdirectory
        await scanDirectory(fullPath, taskId);
      }
    }
  }

  try {
    await fs.access(TASKS_DIR);
    await scanDirectory(TASKS_DIR);
  } catch {
    // tasks directory doesn't exist yet
  }

  return tasks.sort((a, b) => {
    // Sort by category, then by difficulty
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    const diffOrder = { easy: 0, medium: 1, hard: 2 };
    return diffOrder[a.difficulty] - diffOrder[b.difficulty];
  });
}

/**
 * Get all unique categories from loaded tasks
 */
export async function getCategories(): Promise<string[]> {
  const tasks = await loadAllTasks();
  return [...new Set(tasks.map(t => t.category))].sort();
}

/**
 * Load tasks filtered by options (for composable benchmark subsets)
 */
export async function loadTasksFiltered(options: {
  categories?: string[];
  difficulties?: ('easy' | 'medium' | 'hard')[];
  tags?: string[];
  limit?: number;
}): Promise<Task[]> {
  let tasks = await loadAllTasks();

  if (options.categories?.length) {
    tasks = tasks.filter(t => options.categories!.includes(t.category));
  }

  if (options.difficulties?.length) {
    tasks = tasks.filter(t => options.difficulties!.includes(t.difficulty));
  }

  if (options.tags?.length) {
    tasks = tasks.filter(t => options.tags!.some(tag => t.tags.includes(tag)));
  }

  if (options.limit) {
    tasks = tasks.slice(0, options.limit);
  }

  return tasks;
}

/**
 * Hot-reload task watcher for development.
 * Watches the tasks directory and emits events when tasks change.
 */
export class TaskWatcher extends EventEmitter {
  private watchers: ReturnType<typeof watch>[] = [];
  private taskCache = new Map<string, Task>();
  private debounceTimers = new Map<string, NodeJS.Timeout>();

  async start(): Promise<void> {
    try {
      await fs.access(TASKS_DIR);
    } catch {
      await fs.mkdir(TASKS_DIR, { recursive: true });
    }

    // Initial load
    const tasks = await loadAllTasks();
    for (const task of tasks) {
      this.taskCache.set(task.id, task);
    }

    // Watch for changes
    this.watchDirectory(TASKS_DIR);
    this.emit('ready', { taskCount: tasks.length });
  }

  private watchDirectory(dir: string): void {
    const watcher = watch(dir, { recursive: true }, async (eventType, filename) => {
      if (!filename) return;

      // Debounce rapid changes
      const key = filename;
      const existing = this.debounceTimers.get(key);
      if (existing) clearTimeout(existing);

      this.debounceTimers.set(key, setTimeout(async () => {
        await this.handleChange(filename);
        this.debounceTimers.delete(key);
      }, 100));
    });

    this.watchers.push(watcher);
  }

  private async handleChange(filename: string): Promise<void> {
    // Extract task ID from path
    const parts = filename.split(path.sep);
    if (!parts.includes('task.yaml') && !filename.endsWith('task.yaml')) {
      return;
    }

    const taskId = parts.slice(0, -1).join('/');

    try {
      const task = await loadTask(taskId);
      if (task) {
        const isNew = !this.taskCache.has(taskId);
        this.taskCache.set(taskId, task);
        this.emit(isNew ? 'added' : 'changed', task);
      }
    } catch {
      if (this.taskCache.has(taskId)) {
        const task = this.taskCache.get(taskId);
        this.taskCache.delete(taskId);
        this.emit('removed', task);
      }
    }
  }

  getTasks(): Task[] {
    return [...this.taskCache.values()];
  }

  getTask(id: string): Task | undefined {
    return this.taskCache.get(id);
  }

  stop(): void {
    for (const watcher of this.watchers) {
      watcher.close();
    }
    this.watchers = [];
    this.debounceTimers.forEach(timer => clearTimeout(timer));
    this.debounceTimers.clear();
  }
}
