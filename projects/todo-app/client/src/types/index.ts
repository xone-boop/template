export interface User {
  id: number;
  email: string;
}

export interface Todo {
  id: number;
  userId: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export type TodoFilter = 'all' | 'active' | 'completed';
