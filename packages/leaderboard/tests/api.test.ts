import { describe, it, expect, beforeEach } from 'vitest';
import { app } from '../src/app.js';

describe('Leaderboard API', () => {
  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await app.request('/health');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toEqual({ status: 'healthy' });
    });
  });

  describe('Submissions API', () => {
    let submissionId: string;

    it('should create a submission', async () => {
      const response = await app.request('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: 'TestAgent',
          agentVersion: '1.0.0',
          taskId: 'saas-core/auth/supabase-oauth',
        }),
      });

      expect(response.status).toBe(201);

      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body.agentName).toBe('TestAgent');
      expect(body.status).toBe('pending');

      submissionId = body.id;
    });

    it('should list submissions', async () => {
      const response = await app.request('/api/submissions');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('submissions');
      expect(Array.isArray(body.submissions)).toBe(true);
    });

    it('should get submission by id', async () => {
      // First create a submission
      const createResponse = await app.request('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: 'GetTest',
          agentVersion: '1.0.0',
          taskId: 'test-task',
        }),
      });

      const created = await createResponse.json();

      const response = await app.request(`/api/submissions/${created.id}`);
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.id).toBe(created.id);
    });

    it('should return 404 for non-existent submission', async () => {
      const response = await app.request('/api/submissions/non-existent-id');
      expect(response.status).toBe(404);
    });

    it('should update submission scores', async () => {
      // Create a submission first
      const createResponse = await app.request('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: 'UpdateTest',
          agentVersion: '1.0.0',
          taskId: 'test-task',
        }),
      });

      const created = await createResponse.json();

      const response = await app.request(`/api/submissions/${created.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'completed',
          scores: {
            functional: 90,
            visual: 85,
            quality: 88,
            security: 92,
            cost: 75,
            speed: 80,
            overall: 85,
          },
        }),
      });

      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.status).toBe('completed');
      expect(body.scores?.functional).toBe(90);
    });
  });

  describe('Leaderboard API', () => {
    it('should get overall leaderboard', async () => {
      const response = await app.request('/api/leaderboard');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('leaderboard');
      expect(Array.isArray(body.leaderboard)).toBe(true);
      expect(body.leaderboard[0]).toHaveProperty('rank');
      expect(body.leaderboard[0]).toHaveProperty('avgScore');
    });

    it('should sort leaderboard by different metrics', async () => {
      const response = await app.request('/api/leaderboard?sort=avgCost&order=asc');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.leaderboard.length).toBeGreaterThan(0);
    });

    it('should get leaderboard by category', async () => {
      const response = await app.request('/api/leaderboard/category/saas-core');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.category).toBe('saas-core');
      expect(body).toHaveProperty('leaderboard');
    });

    it('should get task-specific leaderboard', async () => {
      const response = await app.request(
        '/api/leaderboard/task/saas-core/auth/supabase-oauth'
      );
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.taskId).toBe('saas-core/auth/supabase-oauth');
      expect(body).toHaveProperty('leaderboard');
    });

    it('should get agent stats', async () => {
      const response = await app.request('/api/leaderboard/agent/Claude');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.agent).toHaveProperty('agentName');
      expect(body).toHaveProperty('taskBreakdown');
    });
  });

  describe('Live API', () => {
    it('should list active runs', async () => {
      const response = await app.request('/api/live/runs');
      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty('runs');
      expect(body).toHaveProperty('totalActive');
    });

    it('should create a live run', async () => {
      const response = await app.request('/api/live/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: 'TestAgent',
          taskId: 'test-task',
        }),
      });

      expect(response.status).toBe(201);

      const body = await response.json();
      expect(body).toHaveProperty('id');
      expect(body.status).toBe('initializing');
    });

    it('should update a live run', async () => {
      // Create a run
      const createResponse = await app.request('/api/live/runs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentName: 'UpdateTest',
          taskId: 'test-task',
        }),
      });

      const created = await createResponse.json();

      const response = await app.request(`/api/live/runs/${created.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'running',
          progress: 50,
          currentStep: 'Implementing feature',
          metrics: {
            tokensUsed: 5000,
            filesRead: 10,
            filesWritten: 3,
            testsPass: 5,
            testsFail: 0,
            elapsedMs: 30000,
          },
        }),
      });

      expect(response.status).toBe(200);

      const body = await response.json();
      expect(body.status).toBe('running');
      expect(body.progress).toBe(50);
    });
  });
});
