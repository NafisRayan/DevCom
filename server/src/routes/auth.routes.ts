import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth';
import { validateRequest } from '../middleware/validateRequest';
import { registerSchema, loginSchema, updateProfileSchema } from '../validators/auth.validator';

const router = Router();

// Public routes
router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);

// Protected routes
router.get('/profile', protect, getProfile);
router.patch('/profile', protect, validateRequest(updateProfileSchema), updateProfile);

export default router; 