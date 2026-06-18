import express from 'express';
const router = express.Router();
 import profile from '../controllers/profile.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
router.get('/profile', authMiddleware, profile);
export default router;