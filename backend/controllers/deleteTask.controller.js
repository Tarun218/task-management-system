import Tasks from '../models/task.model.js'
const deleteTask = async(req,res)=>{
try{
const {boardId, taskId} = req.params
const task = await Tasks.findOne({
    _id: taskId,
    board:boardId
})
if(!task){
    return res.status(404).json({
        message:"Task not found"
    })
}
await task.deleteOne();
res.status(200).json({
    message:"Task deleted successfully"
})

}
catch(error){
    res.status(500).json({
        message:error.message
    })
}

}
export default deleteTask;