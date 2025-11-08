import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

router.get('/', async (req, res) => {
    try {
        const todos = await prisma.todo.findMany({
            where: { userId: req.userId },
            orderBy: { createdAt: 'desc' }
        });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({ error: 'Todo text required' });
        }

        const todo = await prisma.todo.create({
            data: {
                text: text.trim(),
                userId: req.userId
            }
        });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text, completed } = req.body;

        const todo = await prisma.todo.findFirst({
            where: { id: parseInt(id), userId: req.userId }
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const updated = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: {
                ...(text !== undefined && { text: text.trim() }),
                ...(completed !== undefined && { completed })
            }
        });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const todo = await prisma.todo.findFirst({
            where: { id: parseInt(id), userId: req.userId }
        });

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        await prisma.todo.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

export default router;