import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';

export const getTodos = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { filter } = req.query;

    let where: any = { userId };

    if (filter === 'active') {
      where.completed = false;
    } else if (filter === 'completed') {
      where.completed = true;
    }

    const todos = await prisma.todo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    res.json(todos);
  } catch (error) {
    console.error('Get todos error:', error);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const createTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { text } = req.body;

    const todo = await prisma.todo.create({
      data: {
        text,
        userId,
      },
    });

    res.status(201).json(todo);
  } catch (error) {
    console.error('Create todo error:', error);
    res.status(500).json({ error: 'Failed to create todo' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;
    const { text, completed } = req.body;

    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    const todo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: {
        ...(text !== undefined && { text }),
        ...(completed !== undefined && { completed }),
      },
    });

    res.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const existingTodo = await prisma.todo.findFirst({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (!existingTodo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    await prisma.todo.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
};
