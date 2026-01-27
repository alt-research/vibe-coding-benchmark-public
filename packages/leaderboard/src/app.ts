import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { submissionsRoutes } from './routes/submissions.js';
import { leaderboardRoutes } from './routes/leaderboard.js';
import { liveRoutes } from './routes/live.js';
import { tasksRoutes } from './routes/tasks.js';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: ['https://vibecoding.llmbench.xyz', 'http://localhost:9011', 'http://localhost:5173'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use('*', logger());

// Health check
app.get('/health', (c) => c.json({ status: 'healthy' }));

// API routes
app.route('/api/submissions', submissionsRoutes);
app.route('/api/leaderboard', leaderboardRoutes);
app.route('/api/live', liveRoutes);
app.route('/api/tasks', tasksRoutes);

export { app };
