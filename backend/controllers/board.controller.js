import Board from '../models/board.model.js';
import Tasks from '../models/task.model.js';
const boardController = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }
        const newBoard = await Board.create({
            title, description, dueDate,
            createdBy: req.user._id,
            members: [req.user._id]
        })
        // newBoard.createdBy = req.user._id;
        // newBoard.members = [req.user._id];
        // await newBoard.save();
        res.status(201).json({
            message: "Board Created successfully",
            board: newBoard
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// get all tasks of the board
const getBoardTasks = async (req, res) => {
    try {
        const { boardId } = req.params;
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(404).json({
                message: "Borad doesn't exist"
            })
        }
        // const isMember = await User.findById(req.user._id);
        const isMember = board.members.some(
       member => member.toString() === req.user._id.toString()
        ) 
        
        if (!isMember) {
            return res.status(403).json({
                message: "Not member of board"
            })
        }
        const tasks = await Tasks.find({
            board: boardId
        })
        .populate("assignedTo","name email")
        .populate("createdBy","name email")
        res.status(200).json({
            tasks
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export default {boardController, getBoardTasks};