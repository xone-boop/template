import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../controllers/todoController';
import { authenticate } from '../middleware/auth';
import { handleValidationErrors } from '../middleware/validation';

const router = Router();

router.use(authenticate);

const createTodoValidation = [
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Todo text is required')
    .isLength({ max: 500 })
    .withMessage('Todo text must not exceed 500 characters'),
];

const updateTodoValidation = [
  param('id').isInt().withMessage('Invalid todo ID'),
  body('text')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Todo text cannot be empty')
    .isLength({ max: 500 })
    .withMessage('Todo text must not exceed 500 characters'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
];

const deleteTodoValidation = [
  param('id').isInt().withMessage('Invalid todo ID'),
];

router.get('/', getTodos);
router.post('/', createTodoValidation, handleValidationErrors, createTodo);
router.patch('/:id', updateTodoValidation, handleValidationErrors, updateTodo);
router.delete('/:id', deleteTodoValidation, handleValidationErrors, deleteTodo);

export default router;
