import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import BoardContext from '../context/BoardContext'
const TaskColumn = ({ title, status }) => {
  const { tasks } = useContext(BoardContext)
  const filteredTasks = tasks.filter((task) => task.status === status);
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
      {filteredTasks.length === 0 ? (<p>No Tasks</p>) : (filteredTasks.map((task) => (<TaskCard key={task._id} task={task} />)))}

    </div>
  )
}

export default TaskColumn
