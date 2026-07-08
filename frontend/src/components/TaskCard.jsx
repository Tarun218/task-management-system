import React, { useContext } from 'react'
import BoardContext from '../context/BoardContext'
import { Draggable } from '@hello-pangea/dnd'

const TaskCard = ({ task, index }) => {
    const { deleteTask, editTask } = useContext(BoardContext)

    return (
        <Draggable
            draggableId={task._id}
            index={index}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                        ...provided.draggableProps.style,
                        border: "1px solid white",
                        borderRadius: "8px",
                        marginBottom: "15px",
                        width: "98%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h3>{task.title}</h3>

                    <p>{task.description}</p>

                    <p>
                        Due Date:{" "}
                        {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString()
                            : "Not set"}
                    </p>

                    <p>
                        Assigned To:{" "}
                        {task.assignedTo?.name} ({task.assignedTo?.email})
                    </p>

                    {task.attachments?.map((file, i) => (
                        <div key={i}>
                            <a
                                href={`http://localhost:5000/${file}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Attachment {i + 1}
                            </a>
                        </div>
                    ))}

                    <button onClick={() => deleteTask(task._id)}>
                        Delete
                    </button>

                    <button onClick={() => editTask(task)}>
                        Edit
                    </button>
                </div>
            )}
        </Draggable>
    )
}

export default TaskCard