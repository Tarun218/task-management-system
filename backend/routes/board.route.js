import express from 'express';
import boardController from '../controllers/board.controller.js';
import addMember from '../controllers/addMember.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import removeMember from '../controllers/removeMember.controller.js';
import deleteBoard from '../controllers/deleteBoard.controller.js';
import getBoard from '../controllers/getBoard.controller.js';
const router  = express.Router();
//make baord
router.post('/board',authMiddleware,boardController.boardController)
//get board
router.get('/boards/:boardId',authMiddleware,getBoard)
//add members
router.post('/boards/:boardId/member',authMiddleware,addMember);

//remove member
router.delete('/boards/:boardId/remove_member',authMiddleware,removeMember)

//delete board
router.delete('/boards/:boardId/delete', authMiddleware, deleteBoard)
export default router;