import Tasks from '../models/task.model.js'
const updateStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const {status} = req.body;
      
        const task = await Tasks.findById(taskId);
        if (!task) {
            return res.status(404).json({
                message: "Task doesn't exist"
            })
        }
        const isAssigned = task.assignedTo === req.user.email
        const isCreator = task.createdBy.toString() === req.user._id.toString()
        if(!isAssigned && !isCreator){
            return res.status(403).json({
                message:"Not allowed "
            })
        }
        const validStatus = ["todo", "inprogress", "done"]
        if (!validStatus.includes(status)) {
            return res.status(400).json({
                message: "Not a valid Status"
            })
        }
        task.status = status;
        await task.save();
        res.status(200).json({
            message: "Status updated",
            task
        })
    }
     catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export default updateStatus;