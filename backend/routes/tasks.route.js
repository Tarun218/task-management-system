import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();
import tasks from '../controllers/tasks.controller.js';
import updateStatus from '../controllers/updateStatus.controller.js';
router.post('/tasks',authMiddleware,tasks);
router.patch('/tasks/:taskId/status', authMiddleware,updateStatus);
export default router;