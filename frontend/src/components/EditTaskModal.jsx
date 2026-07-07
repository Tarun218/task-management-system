import React from "react";

const EditTaskModal = ({
  title,
  setTitle,
  description,
  setDescription,
  priority,
  setPriority,
  assignedTo,
  setAssignedTo,
  dueDate,
  setDueDate,
  attachment,
  setAttachment,
  updateTask,
  setShowEditTask,
  board
}) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(88, 18, 18, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={updateTask}
        style={{
          padding: "20px",
          borderRadius: "10px",
          width: "450px",
        }}
      >
        <h2>Edit Task</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <br />
        <br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br />
        <br />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="" disabled>Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <br />
        <br />

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}>
          <option value="" disabled> Assign To</option>
          {board.members?.map((member) =>
            <option key={member._id} value={member.email}>{member.name}({member.email})</option>)}

        </select>

        <br />
        <br />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <br />
        <br />
<label>Attachments</label>
<br/>
        <input
          type="file"
          multiple
          onChange={(e) => setAttachment([...e.target.files])}
        />

        <br />
        <br />

        <button
          type="button"
          onClick={() => setShowEditTask(false)}
        >
          Cancel
        </button>

        {" "}

        <button type="submit">
          Update Task
        </button>
      </form>
    </div>
  );
};

export default EditTaskModal;