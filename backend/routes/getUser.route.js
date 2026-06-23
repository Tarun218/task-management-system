import express from "express"
import authMiddleware from "../middleware/auth.middleware.js"
import getUser from "../controllers/getUser.controller.js"
const router = express.Router()
router.get('/users/search',authMiddleware,getUser)
export default router