import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { app } from '../base-code/src/app.js';

describe('API Tests', () => {
  describe('Health Check', () => {
    it('should return healthy status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'healthy' });
    });
  });

  describe('Users API', () => {
    it('should create a user', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', name: 'Test User' });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.email).toBe('test@example.com');
    });

    it('should validate user input', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({ email: 'invalid-email' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    });
  });

  describe('Items API (Protected)', () => {
    let authToken: string;

    beforeAll(async () => {
      const loginResponse = await request(app)
        .post('/api/users/login')
        .send({ email: 'test@example.com', password: 'password123' });

      authToken = loginResponse.body.token;
    });

    it('should reject requests without auth', async () => {
      const response = await request(app).get('/api/items');
      expect(response.status).toBe(401);
    });

    it('should list items with auth', async () => {
      const response = await request(app)
        .get('/api/items')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should create item with auth', async () => {
      const response = await request(app)
        .post('/api/items')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ name: 'Test Item', description: 'A test item' });

      expect(response.status).toBe(201);
      expect(response.body.name).toBe('Test Item');
    });
  });
});
