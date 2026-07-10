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
        onSubmit={updateTask}
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
          Edit Task
        </h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
          required
        />

        <textarea
          rows={4}
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            ...inputStyle,
            resize: "none",
            height: "100px",
            paddingTop: "12px",
          }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={inputStyle}
        >
          <option value="" disabled>
            Select Priority
          </option>

          <option value="high">🔴 High</option>
          <option value="medium">🟡 Medium</option>
          <option value="low">🟢 Low</option>
        </select>

        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
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

        <div>
          <label
            style={{
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Replace Attachments-
          </label>

          <input
            type="file"
            multiple
            onChange={(e) => setAttachment([...e.target.files])}
            style={{
              marginTop: "10px",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "15px",
          }}
        >
          <button
            type="button"
            onClick={() => setShowEditTask(false)}
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
              e.target.style.background = "#ea4646";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ef0606";
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
              e.target.style.transform = "scale(1.03)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2563eb";
              e.target.style.transform = "scale(1)";
            }}
          >
            Update Task
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

export default EditTaskModal;