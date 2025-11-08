import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import app from '../../src/index';
import { prisma } from '../../src/config/database';

describe('Security Tests', () => {
  let authToken: string;

  const testUser = {
    email: 'security@example.com',
    password: 'SecurePassword123',
  };

  beforeAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });

    const response = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    authToken = response.body.token;
  });

  describe('SQL Injection Prevention', () => {
    it('should prevent SQL injection in login', async () => {
      const sqlInjection = "' OR '1'='1";
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: sqlInjection,
          password: sqlInjection,
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should prevent SQL injection in todo creation', async () => {
      const sqlInjection = "'; DROP TABLE Todo; --";
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: sqlInjection });

      expect(response.status).toBeOneOf([201, 400]);
      if (response.status === 201) {
        expect(response.body.text).toBe(sqlInjection);
      }

      const todos = await prisma.todo.findMany();
      expect(Array.isArray(todos)).toBe(true);
    });
  });

  describe('XSS Prevention', () => {
    it('should handle XSS payload in todo text', async () => {
      const xssPayload = '<script>alert("XSS")</script>';
      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: xssPayload })
        .expect(201);

      expect(response.body.text).toBe(xssPayload);
    });

    it('should handle XSS in registration', async () => {
      const xssEmail = '<script>alert("XSS")</script>@example.com';
      await request(app)
        .post('/api/auth/register')
        .send({
          email: xssEmail,
          password: 'TestPassword123',
        })
        .expect(400);
    });
  });

  describe('Authentication Bypass Attempts', () => {
    it('should reject access without token', async () => {
      await request(app).get('/api/todos').expect(401);
    });

    it('should reject invalid token', async () => {
      await request(app)
        .get('/api/todos')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });

    it('should reject malformed authorization header', async () => {
      await request(app)
        .get('/api/todos')
        .set('Authorization', 'invalid-format')
        .expect(401);
    });

    it('should reject expired token', async () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxNjAwMDAwMDAxfQ.abc';
      await request(app)
        .get('/api/todos')
        .set('Authorization', `Bearer ${expiredToken}`)
        .expect(401);
    });
  });

  describe('Authorization Tests', () => {
    it('should not allow accessing other users todos', async () => {
      const otherUser = {
        email: 'other@example.com',
        password: 'OtherPassword123',
      };

      await prisma.user.deleteMany({ where: { email: otherUser.email } });

      const registerResponse = await request(app)
        .post('/api/auth/register')
        .send(otherUser);

      const otherToken = registerResponse.body.token;

      const createResponse = await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: 'Private todo' });

      const privateTodoId = createResponse.body.id;

      await request(app)
        .delete(`/api/todos/${privateTodoId}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(404);
    });
  });

  describe('Rate Limiting', () => {
    it('should rate limit authentication attempts', async () => {
      const requests = [];
      
      for (let i = 0; i < 6; i++) {
        requests.push(
          request(app)
            .post('/api/auth/login')
            .send({
              email: 'ratelimit@example.com',
              password: 'WrongPassword',
            })
        );
      }

      const responses = await Promise.all(requests);
      const rateLimited = responses.some((r) => r.status === 429);

      expect(rateLimited).toBe(true);
    });
  });

  describe('Input Validation', () => {
    it('should reject todo text over 500 characters', async () => {
      const longText = 'a'.repeat(501);
      await request(app)
        .post('/api/todos')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ text: longText })
        .expect(400);
    });

    it('should reject invalid email format', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'not-an-email',
          password: 'TestPassword123',
        });

      expect(response.status).toBeOneOf([400, 429]);
    });

    it('should reject password without uppercase', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'newuser@example.com',
          password: 'testpassword123',
        });

      expect(response.status).toBeOneOf([400, 429]);
    });
  });
});
