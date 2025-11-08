import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/config/database';

describe('Todo API Integration Tests', () => {
  let authToken: string;
  let userId: number;
  let todoId: number;

  const testUser = {
    email: 'todotest@example.com',
    password: 'TestPassword123',
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });

    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    authToken = registerResponse.body.token;
    userId = registerResponse.body.user.id;
  });

  describe('POST /api/todos', () => {
    it('should create a new todo', async () => {
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: 'Test todo item' })
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.text).toBe('Test todo item');
      expect(response.body.completed).toBe(false);
      expect(response.body.userId).toBe(userId);

      todoId = response.body.id;
    });

    it('should reject todo without authentication', async () => {
      await request(app)
        .post('/api/todos')
        .send({ text: 'Test todo' })
        .expect(401);
    });

    it('should reject empty todo text', async () => {
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: '' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/todos', () => {
    it('should get all todos', async () => {
      const response = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('should filter active todos', async () => {
      const response = await request(app)
        .get('/api/todos?filter=active')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((todo: any) => {
        expect(todo.completed).toBe(false);
      });
    });

    it('should reject without authentication', async () => {
      await request(app).get('/api/todos').expect(401);
    });
  });

  describe('PATCH /api/todos/:id', () => {
    it('should update todo text', async () => {
      const response = await request(app)
        .patch(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: 'Updated todo text' })
        .expect(200);

      expect(response.body.text).toBe('Updated todo text');
    });

    it('should toggle todo completion', async () => {
      const response = await request(app)
        .patch(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({ completed: true })
        .expect(200);

      expect(response.body.completed).toBe(true);
    });

    it('should reject updating non-existent todo', async () => {
      await request(app)
        .patch('/api/todos/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: 'Updated text' })
        .expect(404);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo', async () => {
      await request(app)
        .delete(`/api/todos/${todoId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      const response = await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${authToken}`);

      const deletedTodo = response.body.find((t: any) => t.id === todoId);
      expect(deletedTodo).toBeUndefined();
    });

    it('should reject deleting non-existent todo', async () => {
      await request(app)
        .delete('/api/todos/99999')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(404);
    });
  });
});
