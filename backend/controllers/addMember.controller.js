import Board from '../models/board.model.js'
import User from '../models/user.model.js'
const addMember = async (req, res) => {
    try {
        const { boardId } = req.params;
        const {email} = req.body;
        const board = await Board.findById(boardId);
        if (!board) {
            return res.status(400).json({
                message: "Board doesn't exist"
            })
        }
        if (board.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "Only creator can add members"
            })
        }
        const user = await User.findOne({email:{$regex:email , $options:"i"}});
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        const alreadyMember = await board.members.some(
            member => member.toString() === user._id.toString()
        )
        if (alreadyMember) {
            return res.status(400).json({
                message: "User is already a member"
            })
        }
        board.members.push(user._id);
        await board.save();
        await board.populate("members","name email")
        res.status(200).json({
            message: "Member added successfully",
            board
        });


    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
export default addMember;