import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const submissionsRoutes = new Hono();

// In-memory store for demo (replace with database in production)
const submissions: Submission[] = [];

interface Submission {
  id: string;
  agentName: string;
  agentVersion: string;
  taskId: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  scores: {
    functional: number;
    visual: number;
    quality: number;
    security: number;
    cost: number;
    speed: number;
    overall: number;
  } | null;
  metrics: {
    tokensUsed: number;
    filesRead: number;
    filesWritten: number;
    executionTimeMs: number;
  } | null;
  createdAt: string;
  completedAt: string | null;
}

const createSubmissionSchema = z.object({
  agentName: z.string().min(1),
  agentVersion: z.string().min(1),
  taskId: z.string().min(1),
});

const updateSubmissionSchema = z.object({
  status: z.enum(['pending', 'running', 'completed', 'failed']).optional(),
  scores: z.object({
    functional: z.number().min(0).max(100),
    visual: z.number().min(0).max(100),
    quality: z.number().min(0).max(100),
    security: z.number().min(0).max(100),
    cost: z.number().min(0).max(100),
    speed: z.number().min(0).max(100),
    overall: z.number().min(0).max(100),
  }).optional(),
  metrics: z.object({
    tokensUsed: z.number(),
    filesRead: z.number(),
    filesWritten: z.number(),
    executionTimeMs: z.number(),
  }).optional(),
});

// Create submission
submissionsRoutes.post(
  '/',
  zValidator('json', createSubmissionSchema),
  async (c) => {
    const body = c.req.valid('json');

    const submission: Submission = {
      id: crypto.randomUUID(),
      agentName: body.agentName,
      agentVersion: body.agentVersion,
      taskId: body.taskId,
      status: 'pending',
      scores: null,
      metrics: null,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    submissions.push(submission);

    return c.json(submission, 201);
  }
);

// List submissions
submissionsRoutes.get('/', async (c) => {
  const agentName = c.req.query('agent');
  const taskId = c.req.query('task');
  const status = c.req.query('status');

  let filtered = submissions;

  if (agentName) {
    filtered = filtered.filter((s) => s.agentName === agentName);
  }
  if (taskId) {
    filtered = filtered.filter((s) => s.taskId === taskId);
  }
  if (status) {
    filtered = filtered.filter((s) => s.status === status);
  }

  return c.json({
    submissions: filtered,
    total: filtered.length,
  });
});

// Get submission by ID
submissionsRoutes.get('/:id', async (c) => {
  const id = c.req.param('id');
  const submission = submissions.find((s) => s.id === id);

  if (!submission) {
    return c.json({ error: 'Submission not found' }, 404);
  }

  return c.json(submission);
});

// Update submission
submissionsRoutes.patch(
  '/:id',
  zValidator('json', updateSubmissionSchema),
  async (c) => {
    const id = c.req.param('id');
    const body = c.req.valid('json');

    const index = submissions.findIndex((s) => s.id === id);

    if (index === -1) {
      return c.json({ error: 'Submission not found' }, 404);
    }

    const submission = submissions[index];

    if (body.status) {
      submission.status = body.status;
      if (body.status === 'completed' || body.status === 'failed') {
        submission.completedAt = new Date().toISOString();
      }
    }
    if (body.scores) {
      submission.scores = {
        functional: body.scores.functional,
        visual: body.scores.visual,
        quality: body.scores.quality,
        security: body.scores.security,
        cost: body.scores.cost,
        speed: body.scores.speed,
        overall: body.scores.overall,
      };
    }
    if (body.metrics) {
      submission.metrics = {
        tokensUsed: body.metrics.tokensUsed,
        filesRead: body.metrics.filesRead,
        filesWritten: body.metrics.filesWritten,
        executionTimeMs: body.metrics.executionTimeMs,
      };
    }

    submissions[index] = submission;

    return c.json(submission);
  }
);

// Delete submission
submissionsRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const index = submissions.findIndex((s) => s.id === id);

  if (index === -1) {
    return c.json({ error: 'Submission not found' }, 404);
  }

  submissions.splice(index, 1);

  return c.json({ status: 'deleted' });
});

export { submissionsRoutes };
