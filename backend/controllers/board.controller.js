import board from '../models/board.model.js';
const boardController = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }
        const newBoard = await board.create({
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