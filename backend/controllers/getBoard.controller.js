import Board from '../models/board.model.js'
const getBoard = async (req, res) => {
    try {
        const { boardId } = req.params
        const board = await Board.findById(boardId)
        if (!board) {
            return res.status(404).json({
                message: "Borad not found"
            })
        }
        if (req.user._id.toString() !== board.members.toString()) {
            return res.status(403).json({
                message: "Not allowed to acess the board"
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