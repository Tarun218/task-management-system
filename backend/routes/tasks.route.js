import express from 'express';
import upload from '../middleware/upload.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router = express.Router();
import tasks from '../controllers/tasks.controller.js';
import updateStatus from '../controllers/updateStatus.controller.js';
import deleteTask from '../controllers/deleteTask.controller.js';
import updateTask from '../controllers/updateTask.controller.js';
import assignTask from '../controllers/assignTask.controller.js';
router.post('/:boardId/tasks/add',authMiddleware,upload.array("attachments",10), tasks);
router.patch('/tasks/:taskId/status', authMiddleware,updateStatus);
router.delete('/:boardId/tasks/:taskId',authMiddleware,deleteTask);
router.patch('/tasks/:taskId',authMiddleware,upload.array("attachments"),updateTask)
router.patch('/boards/:boardId/tasks/:taskId/assignTask',authMiddleware,assignTask)
export default router;