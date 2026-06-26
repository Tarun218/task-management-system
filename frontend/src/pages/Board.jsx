import React from 'react'
import {useParams} from 'react-router-dom'
const Board = () => {
    const {boardId} = useParams()
  return (
    <div>
        <h1> Board</h1>
        <p> BoardId: {boardId}</p>
    </div>
  )
}

export default Board