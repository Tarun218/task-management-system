import React from 'react'
import TaskCard from './TaskCard'
const TaskColumn = ({ title, tasks }) => {
  return (
    
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2px solid gray",
        width: "32%",
        minHeight: "8rem",
        borderRadius: "8px",
        padding: "10px"
      }}>
        <h3>{title}</h3>
        {tasks.length === 0 ?( <p>No Tasks</p> ): ( tasks.map(task => (<TaskCard key={task._id} task={task} />)) )}

      </div>
  )
}

export default TaskColumn
