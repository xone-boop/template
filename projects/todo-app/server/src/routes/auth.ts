import { Router } from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController';
import { handleValidationErrors } from '../middleware/validation';
import rateLimit from 'express-rate-limit';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: 'Too many authentication attempts, please try again later',
});

const registerValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

router.post(
  '/register',
  authLimiter,
  registerValidation,
  handleValidationErrors,
  register
);

router.post(
  '/login',
  authLimiter,
  loginValidation,
  handleValidationErrors,
  login
);

export default router;
