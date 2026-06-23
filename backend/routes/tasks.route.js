import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();
import tasks from '../controllers/tasks.controller.js';
import updateStatus from '../controllers/updateStatus.controller.js';
import deleteTask from '../controllers/deleteTask.controller.js';
import updateTask from '../controllers/updateTask.controller.js';
router.post('/tasks',authMiddleware,tasks);
router.patch('/tasks/:taskId/status', authMiddleware,updateStatus);
router.delete('/:boardId/tasks/:taskId',authMiddleware,deleteTask);
router.patch('/tasks/:taskId/update',authMiddleware,updateTask)
export default router;