import Board from '../models/board.model.js'
import Task from '../models/task.model.js'
const deleteBoard = async(req , res)=>{
    try{
        const {boardId} = req.params;
        const board = await Board.findById(boardId)
        if(!board){
            return res.status(404).json({
                message:"Board not found"
            })
        }
        if(board.createdBy.toString() !== req.user._id.toString()){
            return res.status(403).json({
                message:"User not allowed to delete the board"
            })
        }
        await Task.deleteMany({
            board:boardId
        })
     await   board.deleteOne()
       res.status(200).json({
        message:"Board deleted successfully"
       })

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
export default deleteBoard