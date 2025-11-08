import { test, expect } from '@playwright/test';

test.describe('Security Tests', () => {
    const API_URL = 'http://localhost:3001';

    test('prevents SQL injection in login', async ({ request }) => {
        const maliciousPayloads = [
            "' OR '1'='1",
            "admin'--",
            "' OR 1=1--",
            "admin' OR '1'='1"
        ];

        for (const payload of maliciousPayloads) {
            const response = await request.post(`${API_URL}/api/auth/login`, {
                data: {
                    email: payload,
                    password: payload
                }
            });

            expect(response.status()).toBe(401);
        }
    });

    test('prevents XSS in todo text', async ({ request }) => {
        const registerRes = await request.post(`${API_URL}/api/auth/register`, {
            data: {
                email: `test-xss-${Date.now()}@example.com`,
                password: 'password123'
            }
        });
        const { token } = await registerRes.json();

        const xssPayloads = [
            '<script>alert("XSS")</script>',
            '<img src=x onerror=alert("XSS")>',
            'javascript:alert("XSS")',
            '<svg onload=alert("XSS")>'
        ];

        for (const payload of xssPayloads) {
            const response = await request.post(`${API_URL}/api/todos`, {
                headers: { Authorization: `Bearer ${token}` },
                data: { text: payload }
            });

            expect(response.ok()).toBeTruthy();
            const todo = await response.json();
            expect(todo.text).not.toContain('<script>');
            expect(todo.text).not.toContain('javascript:');
        }
    });

    test('requires authentication for protected routes', async ({ request }) => {
        const endpoints = [
            { method: 'GET', path: '/api/todos' },
            { method: 'POST', path: '/api/todos', data: { text: 'test' } },
            { method: 'PATCH', path: '/api/todos/1', data: { completed: true } },
            { method: 'DELETE', path: '/api/todos/1' }
        ];

        for (const endpoint of endpoints) {
            const response = await request[endpoint.method.toLowerCase()](`${API_URL}${endpoint.path}`, {
                data: endpoint.data
            });
            expect(response.status()).toBe(401);
        }
    });

    test('prevents access to other users todos', async ({ request }) => {
        const user1 = await request.post(`${API_URL}/api/auth/register`, {
            data: {
                email: `user1-${Date.now()}@example.com`,
                password: 'password123'
            }
        });
        const user1Data = await user1.json();

        const user2 = await request.post(`${API_URL}/api/auth/register`, {
            data: {
                email: `user2-${Date.now()}@example.com`,
                password: 'password123'
            }
        });
        const user2Data = await user2.json();

        const todoRes = await request.post(`${API_URL}/api/todos`, {
            headers: { Authorization: `Bearer ${user1Data.token}` },
            data: { text: 'User 1 private todo' }
        });
        const todo = await todoRes.json();

        const user2Todos = await request.get(`${API_URL}/api/todos`, {
            headers: { Authorization: `Bearer ${user2Data.token}` }
        });
        const user2TodosList = await user2Todos.json();

        expect(user2TodosList.find(t => t.id === todo.id)).toBeUndefined();
    });

    test('validates input lengths', async ({ request }) => {
        const registerRes = await request.post(`${API_URL}/api/auth/register`, {
            data: {
                email: `test-${Date.now()}@example.com`,
                password: 'password123'
            }
        });
        const { token } = await registerRes.json();

        const emptyTodo = await request.post(`${API_URL}/api/todos`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { text: '' }
        });
        expect(emptyTodo.status()).toBe(400);

        const whitespaceTodo = await request.post(`${API_URL}/api/todos`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { text: '   ' }
        });
        expect(whitespaceTodo.status()).toBe(400);
    });

    test('enforces password requirements', async ({ request }) => {
        const weakPasswords = ['', '123', 'abc', '12345'];

        for (const password of weakPasswords) {
            const response = await request.post(`${API_URL}/api/auth/register`, {
                data: {
                    email: `test-${Date.now()}@example.com`,
                    password
                }
            });
            expect(response.status()).toBe(400);
        }
    });
});