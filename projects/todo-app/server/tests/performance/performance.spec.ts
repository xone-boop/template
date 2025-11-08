import { test, expect } from '@playwright/test';

test.describe('Performance Tests', () => {
  test('page load time should be under 2 seconds', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    expect(loadTime).toBeLessThan(2000);
  });

  test('API response time should be under 300ms', async ({ request }) => {
    const testUser = {
      email: `perf${Date.now()}@example.com`,
      password: 'TestPassword123',
    };

    const registerResponse = await request.post('http://localhost:3000/api/auth/register', {
      data: testUser,
    });

    expect(registerResponse.ok()).toBeTruthy();
    const { token } = await registerResponse.json();

    const startTime = Date.now();
    
    const response = await request.get('http://localhost:3000/api/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    const responseTime = Date.now() - startTime;
    
    expect(response.ok()).toBeTruthy();
    expect(responseTime).toBeLessThan(300);
  });

  test('should handle multiple todos efficiently', async ({ request }) => {
    const testUser = {
      email: `bulk${Date.now()}@example.com`,
      password: 'TestPassword123',
    };

    const registerResponse = await request.post('http://localhost:3000/api/auth/register', {
      data: testUser,
    });

    const { token } = await registerResponse.json();

    const createPromises = [];
    for (let i = 0; i < 10; i++) {
      createPromises.push(
        request.post('http://localhost:3000/api/todos', {
          data: { text: `Todo item ${i}` },
          headers: { Authorization: `Bearer ${token}` },
        })
      );
    }

    const startTime = Date.now();
    await Promise.all(createPromises);
    const createTime = Date.now() - startTime;

    expect(createTime).toBeLessThan(3000);

    const getTodosStart = Date.now();
    const response = await request.get('http://localhost:3000/api/todos', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const getTodosTime = Date.now() - getTodosStart;

    const todos = await response.json();
    expect(todos.length).toBeGreaterThanOrEqual(10);
    expect(getTodosTime).toBeLessThan(300);
  });

  test('concurrent requests should be handled', async ({ request }) => {
    const users = [];
    
    for (let i = 0; i < 5; i++) {
      const registerResponse = await request.post('http://localhost:3000/api/auth/register', {
        data: {
          email: `concurrent${i}${Date.now()}@example.com`,
          password: 'TestPassword123',
        },
      });
      
      const { token } = await registerResponse.json();
      users.push(token);
    }

    const startTime = Date.now();
    
    const requests = users.map((token) =>
      request.get('http://localhost:3000/api/todos', {
        headers: { Authorization: `Bearer ${token}` },
      })
    );

    const responses = await Promise.all(requests);
    const totalTime = Date.now() - startTime;

    responses.forEach((response) => {
      expect(response.ok()).toBeTruthy();
    });

    expect(totalTime).toBeLessThan(2000);
  });
});
