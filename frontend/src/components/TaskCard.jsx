import React from 'react'

const TaskCard = ({ task }) => {
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
            {task.attachment && (
                <a
                    href={`http://localhost:5000/${task.attachment}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    View Attachment
                </a>
            )}
        </div>
    )
}

export default TaskCard