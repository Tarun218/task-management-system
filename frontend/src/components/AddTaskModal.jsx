import React from "react";

const AddTaskModal = ({
  title,
  setTitle,
  newTask,
  description,
  setDescription,
  priority,
  setPriority,
  attachment,
  setAttachment,
  assignedTo,
  setAssignedTo,
  dueDate,
  setDueDate,
  setAddTask,
  setAddTaskForm,
  board,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={newTask}
        style={{
          width: "500px",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          boxShadow: "0 20px 45px rgba(0,0,0,.25)",
          animation: "fadeIn .3s ease",
        }}
      >
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            color: "#2563eb",
          }}
        >
          Create New Task
        </h2>

        {/* Title */}

        <input
          type="text"
          value={title}
          placeholder="Task Title"
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />

        {/* Description */}

        <textarea
          value={description}
          placeholder="Task Description"
          rows={4}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            ...inputStyle,
            resize: "none",
            paddingTop: "12px",
          }}
        />

        {/* Due Date */}

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
        />

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Select Priority
          </option>

          <option value="high">🔴 High</option>

          <option value="medium">🟡 Medium</option>

          <option value="low">🟢 Low</option>
        </select>

        {/* Assign */}

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="" disabled>
            Assign Member
          </option>

          {board.members?.map((member) => (
            <option
              key={member._id}
              value={member.email}
            >
              {member.name} ({member.email})
            </option>
          ))}
        </select>

        {/* Attachment */}

        <div>
          <label
            style={{
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Attach Files- 
          </label>

          <input
            type="file"
            multiple
            onChange={(e) =>
              setAttachment([...e.target.files])
            }
            style={{
              marginTop: "10px",
            }}
          />
        </div>

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setAddTask(false);
              setAddTaskForm(false);
              setTitle("");
              setDescription("");
              setDueDate("");
              setPriority("");
              setAttachment(null);
              setAssignedTo("");
            }}
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#eb6060";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ef4444";
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1d4ed8";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2563eb";
            }}
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  height: "45px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  paddingLeft: "14px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default AddTaskModal;