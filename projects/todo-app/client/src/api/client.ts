import type { User, Todo, AuthResponse } from '../types/index';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getAuthHeader = (): HeadersInit => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Request failed');
  }
  return response.json();
};

export const authApi = {
  register: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(response);
  },

  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(response);
  },
};

export const todoApi = {
  getTodos: async (filter?: string): Promise<Todo[]> => {
    const url = filter
      ? `${API_BASE_URL}/api/todos?filter=${filter}`
      : `${API_BASE_URL}/api/todos`;
    const response = await fetch(url, {
      headers: getAuthHeader(),
    });
    return handleResponse<Todo[]>(response);
  },

  createTodo: async (text: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify({ text }),
    });
    return handleResponse<Todo>(response);
  },

  updateTodo: async (
    id: number,
    data: { text?: string; completed?: boolean }
  ): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse<Todo>(response);
  },

  deleteTodo: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/todos/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    await handleResponse<{ message: string }>(response);
  },
};
