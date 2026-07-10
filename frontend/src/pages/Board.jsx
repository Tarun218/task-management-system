import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'
import ErrorMessage from '../components/ErrorMessage'
import Loader from '../components/Loader'
import AddMemberModal from '../components/AddMemberModal'
import TaskColumn from '../components/TaskColumn'
import AddTaskModal from '../components/AddTaskModal'
import BoardContext from '../context/BoardContext'
import EditTaskModal from '../components/EditTaskModal'
import RemoveMember from '../components/RemoveMember'
import { DragDropContext } from '@hello-pangea/dnd'
import SearchUser from '../components/SearchUser'
import UserCard from '../components/UserCard'

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
  const [showEditTask, setShowEditTask] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [showRemoveMember, setShowRemoveMember] = useState(false)
  const [noMember, setNoMember] = useState("")
  const [user, setUser] = useState("")
  const [showUser, setShowUser] = useState(false)
  const[found, setFound] =useState([])
  const getBoard = async () => {
    try {
      const res = await api.get(`/boards/${boardId}`)
      setBoard(res.data.board)

    }
    catch (error) {
      setError(error.response?.data?.message || "Unable to load Board")
    }

  }

  const deleteBoard = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the board?"
    );
    if (!confirmDelete) return;
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
        attachment.forEach((file) => {
          formData.append("attachments", file)
        })
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

  const deleteTask = async (taskId) => {
    const confirmDeleteTask = window.confirm("Are you sure you want to delete the Task?");
    if (!confirmDeleteTask) return;
    setError("")
    try {
      await api.delete(`/${boardId}/tasks/${taskId}`)
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId))
    }
    catch (error) {
      setError(error.response?.data?.message || "Couldn't delete Task")
    }
  }

  const editTask = (task) => {
    setSelectedTask(task);

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "medium");
    setAssignedTo(task.assignedTo?.email || "");
    setDueDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
    setAttachment([]);

    setShowEditTask(true);
  };
  const updateTask = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const formData = new FormData();
      formData.append("title", title)
      formData.append("description", description)
      formData.append("priority", priority)
      formData.append("dueDate", dueDate)
      formData.append("assignedTo", assignedTo)
      if (attachment) {
        attachment.forEach((file) => {
          formData.append("attachments", file)
        })
      }
      const res = await api.patch(
        `/tasks/${selectedTask._id}`,
        formData,

      )
      setTasks(prev => prev.map(task => task._id === res.data.task._id ? res.data.task : task));
      setSelectedTask(null)
      setShowEditTask(false)
      setTitle("");
      setDescription("");
      setPriority("");
      setAssignedTo("");
      setDueDate("");
      setAttachment([]);
    }
    catch (error) {
      setError(error.response?.data?.message || "Can't update Task")
    }
  }
  const removeMember = async (e) => {
    setError("")
    e.preventDefault()
    if (!noMember) {
      setShowRemoveMember(false)
      return
    }
    const confirmRemove = window.confirm("Do you want to remove the user?")
    if (!confirmRemove) return;
    try {
      const res = await api.delete(`/boards/${boardId}/remove_member`, {
        data: {
          member: noMember
        }
      });
      setBoard(res.data.board)
      setNoMember("")
      setShowRemoveMember(false)

    }
    catch (error) {
      setError(error.response?.data?.message || "Can't remove the member")
    }
  }
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const updatedTasks = tasks.map((task) =>
      task._id === draggableId
        ? { ...task, status: destination.droppableId }
        : task
    );

    setTasks(updatedTasks);

    try {
      await api.patch(`/tasks/${draggableId}/status`, {
        status: destination.droppableId,
      });
    } catch (error) {
      setError(error.response?.data?.message || "Couldn't update status");
      getTasks();
    }
  };


  const searchUser = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await api.get('/users/search', {
        params: {
          search: user
        }
      })
      setFound(res.data.users)
      setShowUser(true)
    }
    catch (error) {
      setError(error.response?.data?.message || "Can't find the User")
    }
  }



  useEffect(() => {
    const loadBoard = async () => {
      await Promise.all([
        getBoard(),
        getTasks()
      ]);
      setLoading(false)
    };
    loadBoard();
  }, [boardId]);

  if (loading) {
    return <Loader />;
  }
  return (

    <BoardContext.Provider
      value={{
        board,
        tasks,
        setTasks,
        deleteTask,
        addMember,
        newTask,
        updateTask,
        editTask,
        setError
      }}>

      <div>
        {error && (<ErrorMessage message={error} />)}
        <button type='button' onClick={backButton} >Back to Dashboard</button>


        <SearchUser user={user} setUser={setUser} searchUser={searchUser}  />
        {showUser?(<button
        type='button'
        onClick={()=> setShowUser(false)}>X</button>): null}
        {showUser && (
    found.length === 0 ? (
        <p>No users found</p>
    ) : (
        found.map((user) => (
            <UserCard
                key={user._id}
                user={user}
            />
        ))
    )
)}


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
          <button
            type='button'
            onClick={() => setShowRemoveMember(true)}
          >Remove Member</button>
          {showRemoveMember && <RemoveMember board={board} noMember={noMember} removeMember={removeMember} setNoMember={setNoMember} />}
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
        {showEditTask && selectedTask && (
          <EditTaskModal
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            priority={priority}
            setPriority={setPriority}
            assignedTo={assignedTo}
            setAssignedTo={setAssignedTo}
            dueDate={dueDate}
            setDueDate={setDueDate}
            attachment={attachment}
            setAttachment={setAttachment}
            updateTask={updateTask}
            setShowEditTask={setShowEditTask}
            board={board}

          />
        )}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div
            style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '25px', gap: '15px' }}>
            <TaskColumn title="To Do" status="todo" />
            <TaskColumn title="In Progress" status="inprogress" />
            <TaskColumn title="Done" status="done" />
          </div>
        </DragDropContext>



      </div>
    </BoardContext.Provider>
  )
}

export default Board