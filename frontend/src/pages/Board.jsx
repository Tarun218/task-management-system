import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import AddMemberModal from '../components/AddMemberModal'
import TaskColumn from '../components/TaskColumn'
const Board = () => {
  const { boardId } = useParams()
  const [board, setBoard] = useState({})
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState("")
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

  const deleteBoard = async () => {
    setError("")
    try {
      await api.delete(`/boards/${boardId}`)
      navigate('/dashboard')

    }
    catch (error) {
      setError(error.response?.data?.message || "Couldn't delete board");
    }
  }

  const backButton =()=>{
    navigate('/dashboard')
  }

  const addMember = async (e) => {
    e.preventDefault();
    setError("")
    try {
      const res = await api.post(`/boards/${boardId}/member`, {email})
       setBoard(res.data.board)
      setEmail("")
      setShowForm(false)
    }
    catch (error){
      setError(error.response?.data?.message || "Can't add the member")
    }
  }

  useEffect(() => {
    getBoard()
  }, [])
 if(loading){
        return <Loader/>; 
      }
      console.log(board);
  return (
    <div>
      {error && (<ErrorMessage message={error} />)}
     
      <button type='button' onClick={backButton} >Back to Dashboard</button>
      <h1>{board.title}</h1>
      <p>{board.description}</p>
      <p>
        Due Date :
        {board.dueDate ? new Date(board.dueDate).toLocaleDateString() : "NA"}
      </p>
      Members:
      <div style={{ display: 'flex', justifyContent: 'left', gap: '15px' }}>
        {board.members?.map((member) => (<p key={member._id}>{member.name}</p>))}
      </div>
      <div style={{display:'flex'  ,gap:'15px'}}>
      <button type='button' onClick={deleteBoard}>Delete Board</button>
        <button type='button' onClick={()=>{setShowForm(true) ;
      setError("")}}>Add Member</button>
      {showForm && (<AddMemberModal email={email}
        setEmail={setEmail}
        addMember={addMember}
        setShowForm={setShowForm} />) }
      </div>
<div style={{display:'flex', justifyContent:'space-around' ,marginTop:'25px' }}>
 <div style={{display:'flex', justifyContent:'space-around' , border:'2px solid black' , width:'32%', minHeight:'8rem'}}>
   <TaskColumn/>
 </div><div style={{display:'flex', justifyContent:'space-around' , border:'2px solid black' , width:'32%', minHeight:'8rem'}}>
   <TaskColumn/>
 </div><div style={{display:'flex', justifyContent:'space-around' , border:'2px solid black' , width:'32%', minHeight:'8rem'}}>
   <TaskColumn/>
 </div>
</div>




    </div>
  )
}

export default Board