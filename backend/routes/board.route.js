import express from 'express';
import boardController from '../controllers/board.controller.js';
import addMember from '../controllers/addMember.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';
import removeMember from '../controllers/removeMember.controller.js';
import deleteBoard from '../controllers/deleteBoard.controller.js';
import getBoard from '../controllers/getBoard.controller.js';
import getAllBoards from '../controllers/getAllBoards.controller.js';
const router  = express.Router();
//make baord
router.post('/boards',authMiddleware,boardController.boardController)
//get board
router.get('/boards/:boardId',authMiddleware,getBoard)
//add members
router.post('/boards/:boardId/member',authMiddleware,addMember);

//remove member
router.delete('/boards/:boardId/remove_member',authMiddleware,removeMember)

//delete board
router.delete('/boards/:boardId', authMiddleware, deleteBoard)

//get all boards for dashboard
router.get('/dashboard',authMiddleware,getAllBoards)
export default router;