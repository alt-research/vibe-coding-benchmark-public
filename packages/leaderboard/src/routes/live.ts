import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';

const liveRoutes = new Hono();

// Store for active runs (in production, use Redis pub/sub)
interface LiveRun {
  id: string;
  agentName: string;
  taskId: string;
  status: 'initializing' | 'running' | 'evaluating' | 'completed' | 'failed';
  progress: number;
  currentStep: string;
  metrics: {
    tokensUsed: number;
    filesRead: number;
    filesWritten: number;
    testsPass: number;
    testsFail: number;
    elapsedMs: number;
  };
  startedAt: string;
  logs: Array<{ timestamp: string; message: string }>;
}

const activeRuns = new Map<string, LiveRun>();

// Get all active runs
liveRoutes.get('/runs', async (c) => {
  const runs = Array.from(activeRuns.values());
  return c.json({
    runs,
    totalActive: runs.length,
  });
});

// Get specific run status
liveRoutes.get('/runs/:id', async (c) => {
  const id = c.req.param('id');
  const run = activeRuns.get(id);

  if (!run) {
    return c.json({ error: 'Run not found' }, 404);
  }

  return c.json(run);
});

// Start a new live run
liveRoutes.post('/runs', async (c) => {
  const body = await c.req.json<{ agentName: string; taskId: string }>();

  const run: LiveRun = {
    id: crypto.randomUUID(),
    agentName: body.agentName,
    taskId: body.taskId,
    status: 'initializing',
    progress: 0,
    currentStep: 'Setting up environment',
    metrics: {
      tokensUsed: 0,
      filesRead: 0,
      filesWritten: 0,
      testsPass: 0,
      testsFail: 0,
      elapsedMs: 0,
    },
    startedAt: new Date().toISOString(),
    logs: [],
  };

  activeRuns.set(run.id, run);

  return c.json(run, 201);
});

// Update run status (called by CLI)
liveRoutes.patch('/runs/:id', async (c) => {
  const id = c.req.param('id');
  const run = activeRuns.get(id);

  if (!run) {
    return c.json({ error: 'Run not found' }, 404);
  }

  const body = await c.req.json<Partial<LiveRun>>();

  if (body.status) run.status = body.status;
  if (body.progress !== undefined) run.progress = body.progress;
  if (body.currentStep) run.currentStep = body.currentStep;
  if (body.metrics) run.metrics = { ...run.metrics, ...body.metrics };
  if (body.logs) {
    run.logs.push(...body.logs);
    // Keep only last 100 logs
    if (run.logs.length > 100) {
      run.logs = run.logs.slice(-100);
    }
  }

  activeRuns.set(id, run);

  return c.json(run);
});

// End run
liveRoutes.delete('/runs/:id', async (c) => {
  const id = c.req.param('id');

  if (!activeRuns.has(id)) {
    return c.json({ error: 'Run not found' }, 404);
  }

  activeRuns.delete(id);

  return c.json({ status: 'removed' });
});

// SSE endpoint for real-time updates
liveRoutes.get('/stream/:id', async (c) => {
  const id = c.req.param('id');

  return streamSSE(c, async (stream) => {
    let lastUpdate = '';

    while (true) {
      const run = activeRuns.get(id);

      if (!run) {
        await stream.writeSSE({
          event: 'end',
          data: JSON.stringify({ reason: 'Run not found or completed' }),
        });
        break;
      }

      const currentUpdate = JSON.stringify(run);

      if (currentUpdate !== lastUpdate) {
        await stream.writeSSE({
          event: 'update',
          data: currentUpdate,
        });
        lastUpdate = currentUpdate;
      }

      if (run.status === 'completed' || run.status === 'failed') {
        await stream.writeSSE({
          event: 'end',
          data: currentUpdate,
        });
        break;
      }

      await stream.sleep(1000);
    }
  });
});

// SSE endpoint for all active runs
liveRoutes.get('/stream', async (c) => {
  return streamSSE(c, async (stream) => {
    while (true) {
      const runs = Array.from(activeRuns.values());

      await stream.writeSSE({
        event: 'update',
        data: JSON.stringify({ runs, totalActive: runs.length }),
      });

      await stream.sleep(2000);
    }
  });
});

export { liveRoutes };
