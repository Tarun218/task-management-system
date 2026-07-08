import React, { useContext } from 'react'
import TaskCard from './TaskCard'
import BoardContext from '../context/BoardContext'
import { Droppable } from '@hello-pangea/dnd'
const TaskColumn = ({ title, status }) => {
  const { tasks } = useContext(BoardContext)
  const filteredTasks = tasks.filter((task) => task.status === status);
  return (

   <Droppable droppableId={status}>
   {(provided)=>(
     <div
     ref={provided.innerRef}
     {...provided.droppableProps}
      style={{
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
      {filteredTasks.length === 0 ? (<p>No Tasks</p>) : (filteredTasks.map((task,index) => (<TaskCard key={task._id} task={task} index={index}/>)))}
{provided.placeholder}
    </div>
   )}

   </Droppable>
  )
}

export default TaskColumn
