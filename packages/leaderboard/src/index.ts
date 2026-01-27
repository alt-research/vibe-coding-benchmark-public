import { serve } from '@hono/node-server';
import { app } from './app.js';

const port = parseInt(process.env.PORT || '3001', 10);

console.log(`Leaderboard service starting on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

console.log(`Leaderboard service running at http://localhost:${port}`);
