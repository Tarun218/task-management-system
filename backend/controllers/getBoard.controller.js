import Board from '../models/board.model.js'
const getBoard = async (req, res) => {
    try {
        const { boardId } = req.params
        const board = await Board.findById(boardId)
        .populate("createdBy","name email")
        .populate("members","name email")
        if (!board) {
            return res.status(404).json({
                message: "Borad not found"
            })
        }
        const isMember = board.members.some(
            member => member._id.toString() === req.user._id.toString()
        )
      if(!isMember) {
            return res.status(403).json({
                message: "Not allowed to access the board"
            })
        }
        res.status(200).json({
            message: "The board is: ",
            board
        })

    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }

}
export default getBoard;