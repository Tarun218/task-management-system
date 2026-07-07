import task from '../models/task.model.js';
import Board from '../models/board.model.js'
import User from '../models/user.model.js'
const taskController = async(req,res)=>{
    try{
const {title,description,priority,boardId,assignedTo,dueDate} = req.body;
const attachment = req.files? req.files.map((file)=> file.path) :[];
if(!title || !boardId || !assignedTo){
    return res.status(400).json({
        message:"Fill all required fields"
    })
}
const board = await Board.findById(boardId);
if(!board) {
    return res.status(400).json({
        message:"Board doesn't exist"
    })
}
const user = await User.findOne({
    email:{
        $regex: assignedTo,
        $options:"i"
    }
})
if(!user){
    return res.status(404).json({
        message:"User not found"
    })
}

const currentUserIsMember =  board.members.some(
    member => member.toString() === req.user._id.toString()
)
if(!currentUserIsMember){
    return res.status(400).json({
        message:"LoggedIn user is not a member of the board"
    })
}
const assignedIsBoardMember =  board.members.some(
    member => member.toString() === user._id.toString()
);
if(!assignedIsBoardMember){
    return res.status(400).json({
message:"Assigned user not member a of the board"
    });
}


const newTask  = await task.create({
    title,
    description,
    priority,
    dueDate,
    attachment,
    assignedTo:user._id,
    board:boardId,
    createdBy:req.user._id
});
return res.status(201).json({
    success:true,
    message:"Task created successfully",
    task:newTask
})

    }
    catch(error){
    res.status(500).json({
        message:error.message
    })
    }
}

export default taskController;