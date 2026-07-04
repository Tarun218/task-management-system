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
            <pre style={{ whiteSpace: 'pre-wrap' }}>
                {task.description}

                {task.dueDate}
                {task.assignedTo}
            </pre>



        </div>
    )
}

export default TaskCard