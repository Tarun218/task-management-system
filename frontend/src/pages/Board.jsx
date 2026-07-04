import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
const Board = () => {
  const { boardId } = useParams()
  const [board, setBoard] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const getBoard = async () => {
    try {
      const res = await api.get(`/boards/${boardId}`)
      setBoard(res.data.board)

    }
    catch (error) {
      setError(error.response?.data?.message || "Unable to load Board")
    }
    finally {
      setLoading(false)
    }
  }

const deleteBoard = async()=>{
  setError("")
  try{
const res = await api.delete(`/boards/${boardId}`)
navigate('/dashboard')

  }
  catch(error){
    setError(error.response?.data?.message || "Couldn't delete board");
  }
}

const addMember =async()=>{
  setError("")
  try{
const res = api.post('/boards/:boardId/member',{memberId})
  }
  catch{
    setError(error.response?.data?.message || "Can't add the member")
  }
}

  useEffect(() => {
    getBoard()
  }, [])

  return (
    <div>
    {error && (<ErrorMessage message = {error}/>)}
    {
      loading ? <Loader/> : null
    }
    <h1>{board.title}</h1>
    <p>{board.description}</p>
    <p>
      Due Date :
      {board.dueDate ? new Date (board.dueDate).toLocaleDateString(): "NA"}
    </p>
  Members:
<div style={{display:'flex', justifyContent:'left', gap:'15px'}}>
   { board.members?.map((member) => (<p key={member._id}>{member.name}</p>))}
</div>
<button type='button' onClick={deleteBoard}>Delete Board</button>
<button type='button' onClick={addMember}>Add Member</button>
    </div>
  )
}

export default Board