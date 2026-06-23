import Task from '../models/task.model.js'
import Board from '../models/board.model.js'
const assignTask = async (req, res) => {
    try {
        const { boardId, taskId } = req.params
        const { user } = req.body
        const board = await Board.findById(boardId)
        if (!board) {
            return res.status(404).json({
                message: "Board not found"
            })
        }
        // const task = await Task.findOne({boardId : boardId,taskId :taskId})
        const task = await Task.findOne({
            _id: taskId,
            board: boardId
        })
        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            })
        }
        const isMember = board.members.some(
            member => member.toString() === user
        );

        if (!isMember) {
            return res.status(403).json({
                message: "User can't be assigned the task"
            });
        }
        if (req.user._id.toString() !== board.createdBy.toString()) {
            return res.status(403).json({
                message: "Only board admin can assign the tasks"
            })
        }
        task.assignedTo = user
        await task.save()
        res.status(200).json({
            message: `Task assigned to ${user}`
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message

        })
    }
}
export default assignTask