import React, { useContext } from "react";
import BoardContext from "../context/BoardContext";
import { Draggable } from "@hello-pangea/dnd";

const TaskCard = ({ task, index }) => {
  const { deleteTask, editTask } = useContext(BoardContext);

  const priorityColor = {
    high: "#ef4444",
    medium: "#f59e0b",
    low: "#22c55e",
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,

            background: "white",
            borderRadius: "18px",
            padding: "18px",
            marginBottom: "18px",

            display: "flex",
            flexDirection: "column",
            gap: "12px",

            boxShadow: "0 8px 20px rgba(0,0,0,.08)",

            transition: "all .3s ease",

            cursor: "grab",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow =
              "0 18px 35px rgba(0,0,0,.18)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow =
              "0 8px 20px rgba(0,0,0,.08)";
          }}
        >
          {/* Title */}

          <h3
            style={{
              margin: 0,
              color: "#1e3a8a",
              fontSize: "22px",
            }}
          >
            {task.title}
          </h3>

          {/* Description */}

          <p
            style={{
              margin: 0,
              color: "#64748b",
              lineHeight: "24px",
            }}
          >
            {task.description || "No description"}
          </p>

          {/* Priority */}

          <div>
            <span
              style={{
                background:
                  priorityColor[task.priority] || "#94a3b8",
                color: "white",
                padding: "6px 14px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {task.priority}
            </span>
          </div>

          {/* Due Date */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            📅

            <span
              style={{
                color: "#334155",
              }}
            >
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Due Date"}
            </span>
          </div>

          {/* Assigned */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#2563eb",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "18px",
              }}
            >
              {task.assignedTo?.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div
                style={{
                  fontWeight: "600",
                }}
              >
                {task.assignedTo?.name}
              </div>

              <div
                style={{
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                {task.assignedTo?.email}
              </div>
            </div>
          </div>

          {/* Attachments */}

          {task.attachments?.length > 0 && (
            <div>
              <h4
                style={{
                  marginBottom: "10px",
                  color: "#1e293b",
                }}
              >
                Attachments
              </h4>

              {task.attachments.map((file, i) => (
                <a
                  key={i}
                  href={`http://localhost:5000/${file}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    marginBottom: "8px",
                    marginRight: "10px",
                    textDecoration: "none",
                    color: "#2563eb",
                    fontWeight: "600",
                  }}
                >
                    📎 Attachment {i + 1}
                </a>
              ))}
            </div>
          )}

          {/* Buttons */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => editTask(task)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                cursor: "pointer",
                transition: ".3s",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#1d4ed8";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#2563eb";
              }}
            >
                ✏ Edit
            </button>

            <button
              onClick={() => deleteTask(task._id)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px 20px",
                cursor: "pointer",
                transition: ".3s",
                fontWeight: "bold",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#dc2626";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#ef4444";
              }}
            >
                🗑 Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;