import express from 'express';
import boardController from '../controllers/board.controller.js';
import addMember from '../controllers/addMember.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
const router  = express.Router();
router.post('/board',authMiddleware,boardController.boardController)


//add members
router.post('/boards/:boardId/member',authMiddleware,addMember);
export default router;