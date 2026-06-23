import Board from '../models/board.model.js'
const getAllBoards = async (req, res) => {
    try {
        const boards = await Board.find({
            members: req.user._id
        })
        .populate("createdBy","name email")
        .populate("members","name email")
        res.status(200).json({
            boards
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export default getAllBoards;