import Board from '../models/board.model.js'
const removeMember = async (req , res)=>{
   try{
     const {member} = req.body
    const{boardId} = req.params
    const board = await Board.findById(boardId)
    if(!board){
        return res.status(404).json({
            message:"Board not found"
        })
    }

    if(board.createdBy.toString() !== req.user._id.toString()){
        return res.status(403).json({
            message:"User not allowed to remove member"
        })
    }
    if(member === board.createdBy.toString() ){
        return res.status(400).json({
            message:"Board creator can't be removed"
        })
    }
   const isMember =  board.members.some(
    person=>person.toString() === member
   )
   if(!isMember){
    return res.status(404).json({
        message:"Not an existing member"
    })
   }
    board.members = board.members.filter(person =>person.toString() !== member )
    await board.save()
    await board.populate("members", "name email")
    res.status(200).json({
        message:"Member removed successfully",
        board
    })
   }
   catch(error){
    res.status(500).json({
        message:error.message
    })
   }
}
export default removeMember