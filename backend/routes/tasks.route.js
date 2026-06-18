import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();
import tasks from ('../controllers/tasks.controller.js');
router.post('/tasks',authMiddleware,tasks);
export default router;