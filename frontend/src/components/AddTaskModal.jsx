import React from 'react'

const AddTaskModal = ({ title, setTitle, newTask, description, setDescription, priority, setPriority, attachment, setAttachment, assignedTo, setAssignedTo, dueDate, setDueDate, setAddTask, setAddTaskForm, board }) => {
    return (
        <div>
            <form onSubmit={newTask}
                style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                    type='text'
                    value={title}
                    placeholder='Title'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type='text'
                    value={description}
                    placeholder='Description'
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input

                    type='date'
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <select value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>

                </select>
                <input
                    type='file'
                    placeholder='Attachments'
                    onChange={(e) => setAttachment(e.target.files[0])}
                />
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}>
                    <option value=" ">Assign Member</option>
                    {board.members?.map((member) => (
                        <option
                            key={member._id}
                            value={member.email}>
                            {member.name}({member.email})
                        </option>
                    ))}
                </select>
                <button type="button" onClick={() => {
                    setAddTask(false);
                    setAddTaskForm(false);
                    setTitle("");
                    setDescription("");
                    setDueDate("")
                    setPriority("")
                    setAttachment(null)
                    setAssignedTo("")
                }} >Cancel</button>
                <button type='submit' >Create Task</button>
            </form>

        </div>
    )
}

export default AddTaskModal
