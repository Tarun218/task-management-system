import { Link } from 'react-router-dom'
const BoardCard = ({ board }) => {
    return (
        <div 
        style={{
    border: "1px solid white",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "15px",
  }}
>

            <h3>{board.title}</h3>

            <p>{board.description}</p>
            <p>
                Due Date:{" "}
                {board.dueDate
                    ? new Date(board.dueDate).toLocaleDateString()
                    : "Not Set"}
            </p>

            <Link to={`/boards/${board._id}`}>
                Open Board
            </Link>
        </div>
    )
}

export default BoardCard
