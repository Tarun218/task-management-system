import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import AddMemberModal from '../components/AddMemberModal'
import TaskColumn from '../components/TaskColumn'
import AddTaskModal from '../components/AddTaskModal'
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
  const [addTask, setAddTask] = useState(false)
  const [addTaskForm, setAddTaskForm] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [priority, setPriority] = useState("")
  const [attachment, setAttachment] = useState("")
  const [assignedTo, setAssignedTo] = useState("")
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


  const newTask = async (e) => {
    e.preventDefault()
    setError("")
    try {
      // const res = await api.post(`/${boardId}/tasks/add`, { title, assignedTo, boardId })
      // setTasks((prev) => [...prev, res.data.task])
      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("priority", priority);
      formData.append("assignedTo", assignedTo);
      formData.append("boardId", boardId);
      formData.append("dueDate", dueDate);

      if (attachment) {
    formData.append("attachment", attachment);
}

      const res = await api.post(
        `/${boardId}/tasks/add`,
        formData
      );
      setTasks((prev) => [...prev, res.data.task])
      setTitle("");
      setDescription("");
      setPriority("medium");
      setAssignedTo("");
      setDueDate("");
      setAttachment(null);

      setAddTask(false);
      setAddTaskForm(false);

    }
    catch (error) {
      setError(error.response?.data?.message || "Can't Create Task")
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
      <div>
        {!addTask ? (<button type='button' onClick={() => {
          setAddTask(true); setError(""); setAddTaskForm(true)
        }} >Add Task</button>) : (addTaskForm && (<AddTaskModal title={title} setTitle={setTitle} newTask={newTask}
          description={description}
          setDescription={setDescription}
          priority={priority}
          setPriority={setPriority}
          dueDate={dueDate}
          setDueDate={setDueDate}
          attachment={attachment}
          setAttachment={setAttachment}
          assignedTo={assignedTo}
          setAssignedTo={setAssignedTo}
          setAddTaskForm={setAddTaskForm}
          setAddTask={setAddTask}
          board={board}
        />))}
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '25px', gap: '15px' }}>
        <TaskColumn title="To Do" tasks={tasks.filter(task => task.status === "todo")} />
        <TaskColumn title="In Progress" tasks={tasks.filter(task => task.status === "inprogress")} />
        <TaskColumn title="Done" tasks={tasks.filter(task => task.status === "done")} />
      </div>

      {error && (<ErrorMessage message={error} />)}
    </div>
  )
}

export default Board