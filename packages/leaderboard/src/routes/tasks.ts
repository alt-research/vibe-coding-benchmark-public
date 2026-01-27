import { Hono } from 'hono';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as yaml from 'yaml';

const tasksRoutes = new Hono();

interface TaskTests {
  functional?: string;
  visual?: string;
  security?: string;
}

interface TaskLinks {
  prompt: string;
  tests: { [key: string]: string };
  taskYaml: string;
  directory: string;
}

interface Task {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  stack: string;
  timeout: number;
  tokenLimit: number;
  tags: string[];
  weight: number;
  tests: TaskTests;
  promptFile: string;
  links: TaskLinks;
}

const GITHUB_BASE_URL = 'https://github.com/alt-research/vibe-coding-benchmark-public/blob/master/tasks';

interface TasksByCategory {
  [category: string]: Task[];
}

// Cache for tasks
let tasksCache: Task[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 60000; // 1 minute

// Find tasks directory (relative to package)
function getTasksDir(): string {
  // Try common locations relative to cwd
  const candidates = [
    path.join(process.cwd(), '../../tasks'),
    path.join(process.cwd(), '../../../tasks'),
    path.join(process.cwd(), 'tasks'),
  ];
  return candidates[0]; // Default to relative path
}

async function loadAllTasks(): Promise<Task[]> {
  const now = Date.now();
  if (tasksCache && now - lastCacheTime < CACHE_TTL_MS) {
    return tasksCache;
  }

  const tasks: Task[] = [];
  const tasksDir = getTasksDir();

  async function scanDirectory(dir: string, prefix: string = ''): Promise<void> {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory()) continue;
        const fullPath = path.join(dir, entry.name);
        const taskId = prefix ? `${prefix}/${entry.name}` : entry.name;
        const taskYaml = path.join(fullPath, 'task.yaml');

        try {
          await fs.access(taskYaml);
          const content = await fs.readFile(taskYaml, 'utf-8');
          const parsed = yaml.parse(content);

          // Build test links (only for files that exist)
          const tests: TaskTests = parsed.tests || {};
          const testLinks: { [key: string]: string } = {};
          for (const [testType, testPath] of Object.entries(tests)) {
            if (testPath) {
              const testFilePath = path.join(fullPath, testPath as string);
              try {
                await fs.access(testFilePath);
                testLinks[testType] = `${GITHUB_BASE_URL}/${taskId}/${testPath}`;
              } catch {
                // Test file doesn't exist, skip link
              }
            }
          }

          // Build all links
          const promptFile = parsed.promptFile || 'PROMPT.md';
          const links: TaskLinks = {
            prompt: `${GITHUB_BASE_URL}/${taskId}/${promptFile}`,
            tests: testLinks,
            taskYaml: `${GITHUB_BASE_URL}/${taskId}/task.yaml`,
            directory: `${GITHUB_BASE_URL}/${taskId}`,
          };

          tasks.push({
            id: taskId,
            name: parsed.name || taskId,
            category: parsed.category || taskId.split('/')[0],
            subcategory: parsed.subcategory || taskId.split('/')[1] || '',
            description: parsed.description || '',
            difficulty: parsed.difficulty || 'medium',
            stack: parsed.stack || 'unknown',
            timeout: parsed.timeout || 300,
            tokenLimit: parsed.tokenLimit || 100000,
            tags: parsed.tags || [],
            weight: parsed.weight || 1.0,
            tests,
            promptFile,
            links,
          });
        } catch {
          // Not a task directory, recurse
          await scanDirectory(fullPath, taskId);
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error);
    }
  }

  try {
    await scanDirectory(tasksDir);
    tasks.sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      if (a.subcategory !== b.subcategory) return a.subcategory.localeCompare(b.subcategory);
      return a.name.localeCompare(b.name);
    });
    tasksCache = tasks;
    lastCacheTime = now;
  } catch (error) {
    console.error('Failed to load tasks:', error);
  }

  return tasks;
}

// Get all tasks
tasksRoutes.get('/', async (c) => {
  const tasks = await loadAllTasks();
  const category = c.req.query('category');
  const difficulty = c.req.query('difficulty');

  let filtered = tasks;

  if (category) {
    filtered = filtered.filter(t => t.category === category);
  }
  if (difficulty) {
    filtered = filtered.filter(t => t.difficulty === difficulty);
  }

  return c.json({
    tasks: filtered,
    total: filtered.length,
    categories: [...new Set(tasks.map(t => t.category))],
  });
});

// Get tasks grouped by category
tasksRoutes.get('/by-category', async (c) => {
  const tasks = await loadAllTasks();
  const byCategory: TasksByCategory = {};

  for (const task of tasks) {
    if (!byCategory[task.category]) {
      byCategory[task.category] = [];
    }
    byCategory[task.category].push(task);
  }

  const summary = Object.entries(byCategory).map(([category, tasks]) => ({
    category,
    count: tasks.length,
    difficulties: {
      easy: tasks.filter(t => t.difficulty === 'easy').length,
      medium: tasks.filter(t => t.difficulty === 'medium').length,
      hard: tasks.filter(t => t.difficulty === 'hard').length,
    },
    subcategories: [...new Set(tasks.map(t => t.subcategory))].filter(Boolean),
  }));

  return c.json({
    categories: byCategory,
    summary,
    totalTasks: tasks.length,
    totalCategories: Object.keys(byCategory).length,
  });
});

// Get single task by ID
tasksRoutes.get('/:taskId{.+}', async (c) => {
  const taskId = c.req.param('taskId');
  const tasks = await loadAllTasks();
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return c.json({ error: 'Task not found' }, 404);
  }

  return c.json(task);
});

export { tasksRoutes };
