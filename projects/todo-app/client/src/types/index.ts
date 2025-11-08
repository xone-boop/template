export type User = {
  id: number;
  email: string;
}

export type Todo = {
  id: number;
  userId: number;
  text: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
}

export type TodoFilter = 'all' | 'active' | 'completed';
