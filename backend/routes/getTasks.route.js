import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import getBoardTasks from '../controllers/board.controller.js'
const router = express.Router();
router.get('/boards/:boardId/tasks',authMiddleware,getBoardTasks.getBoardTasks)
export default router;