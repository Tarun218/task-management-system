import Task from '../models/task.model.js'
import User from '../models/user.model.js'
const updateTask = async (req,res)=>{
    try{
const {taskId}=req.params
const {
    title,
    description,
    dueDate,
    priority,
    assignedTo
} = req.body;
const task = await Task.findById(taskId)
if(!task){
    return res.status(404).json({
        message:"Task not found"
    })
}
const isAssigned =  task.assignedTo && task.assignedTo.toString() === req.user._id.toString();
const isCreator =  task.createdBy.toString() === req.user._id.toString()
if(!isCreator && !isAssigned ){
    return res.status(403).json({
        message:"User not allowed to update the task"
    })
}
if(
    !title &&
    !description &&
    !dueDate &&
    !priority &&
    !assignedTo &&
    (!req.files || req.files.length===0)
){
    return res.status(400).json({
        message:"No fields provided to update"
    })
}
if(title)task.title = title;
if(description)task.description= description;
if(dueDate)task.dueDate=dueDate;
if(priority)task.priority=priority;
if (assignedTo) {
    const user = await User.findOne({
        email: {
            $regex: assignedTo,
            $options: "i"
        }
    });

    if (!user) {
        return res.status(404).json({
            message: "Assigned user not found"
        });
    }

    task.assignedTo = user._id;
}
if (req.files && req.files.length > 0) {
    task.attachments = req.files.map(file => file.path);
}
await task.save()
res.status(200).json({
    message:"Task updated successfully",
    task
})

    }
    catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
export default updateTask;