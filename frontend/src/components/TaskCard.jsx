import React, { useContext } from 'react'
import BoardContext from '../context/BoardContext'

const TaskCard = ({ task }) => {
    const { deleteTask, editTask } = useContext(BoardContext)
    return (
        <div
            style={{
                border: "1px solid white",
                borderRadius: "8px",
                marginBottom: "15px",
                width: '98%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <h3>{task.title}</h3>
            <p>
                {task.description}
            </p>
            <p>
                Due Date: {task.dueDate ? (new Date(task.dueDate).toLocaleDateString()) : "Not set"}
            </p>
            <p>
                Assigned To:
                {task.assignedTo?.name}({task.assignedTo?.email})
            </p>
            {task.attachments?.map((file, index) => (
                <div key={index}>
                    <a
                        href={`http://localhost:5000/${file}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Attachment {index + 1}
                    </a>

                </div>
            ))}
            <button type='button' onClick={() => deleteTask(task._id)} >Delete</button>
            <button type='button' onClick={() => editTask(task)} >Edit</button>

        </div>
    )
}

export default TaskCard