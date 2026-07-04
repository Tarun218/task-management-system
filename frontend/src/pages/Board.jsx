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
  const [showAddMember, setShowAddMember] = useState(false)
  const [tasks, setTasks] = useState([])
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

  const backButton = () => {
    navigate('/dashboard')
  }

  const addMember = async (e) => {
    e.preventDefault();
    setError("")
    try {
      const res = await api.post(`/boards/${boardId}/member`, { email })
      setBoard(res.data.board)
      setEmail("")
      setShowForm(false)
      setShowAddMember(false)
    }
    catch (error) {
      setError(error.response?.data?.message || "Can't add the member")
    }
  }


  const getTasks = async () => {
    try {
      const res = await api.get(`/boards/${boardId}/tasks`)
      setTasks(res.data.tasks)
    }
    catch (error) {
      setError(error.response?.data?.message || "Can't load tasks ")
    }
  }


  useEffect(() => {
    getBoard();
      getTasks();
  }, [boardId]);
  if (loading) {
    return <Loader />;
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
      <div style={{ display: 'flex', gap: '15px' }}>
        <button type='button' onClick={deleteBoard}>Delete Board</button>
        {!showAddMember ? (<button type='button' onClick={() => {
          setShowAddMember(true); setShowForm(true);
          setError("")
        }}>Add Member</button>) :
          (showForm && (<AddMemberModal email={email}
            setEmail={setEmail}
            addMember={addMember}
            setShowForm={setShowForm}
            setShowAddMember={setShowAddMember} />))}
      </div>
     <div
     style={{display:'flex', flexDirection:'row',justifyContent:'space-around' , marginTop:'25px',gap:'15px'}}>
      <TaskColumn title= "To Do" tasks ={tasks.filter(task =>task.status === "todo")}  />
     <TaskColumn title= "In Progress" tasks ={tasks.filter(task =>task.status === "inprogress")}  />
     <TaskColumn title= "Done" tasks ={tasks.filter(task =>task.status === "done")}  />
     </div>
    </div>
  )
}

export default Board