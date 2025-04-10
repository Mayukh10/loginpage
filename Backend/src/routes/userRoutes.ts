import { Router } from 'express';
import { register, login, getMe } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);

export { router as userRouter }; 