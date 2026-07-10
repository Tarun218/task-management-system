import React, { useContext } from "react";
import TaskCard from "./TaskCard";
import BoardContext from "../context/BoardContext";
import { Droppable } from "@hello-pangea/dnd";

const TaskColumn = ({ title, status }) => {
  const { tasks } = useContext(BoardContext);

  const filteredTasks = tasks.filter(
    (task) => task.status === status
  );

  const colors = {
    todo: {
      bg: "#dbeafe",
      text: "#1e40af",
    },
    inprogress: {
      bg: "#ffedd5",
      text: "#c2410c",
    },
    done: {
      bg: "#dcfce7",
      text: "#15803d",
    },
  };

  return (
    <Droppable droppableId={status}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            minHeight: "650px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "18px",
            background: snapshot.isDraggingOver
              ? "#e0f2fe"
              : "white",
            transition: ".3s",
            padding: "18px",
            boxShadow: "0 8px 25px rgba(0,0,0,.08)",
          }}
        >
          {/* Header */}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: colors[status].text,
                fontSize: "24px",
              }}
            >
              {title}
            </h2>

            <div
              style={{
                background: colors[status].bg,
                color: colors[status].text,
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
              }}
            >
              {filteredTasks.length}
            </div>
          </div>

          {/* Tasks */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              flexGrow: 1,
            }}
          >
            {filteredTasks.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "2px dashed #cbd5e1",
                  borderRadius: "15px",
                  color: "#64748b",
                  minHeight: "180px",
                  fontSize: "16px",
                }}
              >
                📥 Drop Tasks Here
              </div>
            ) : (
              filteredTasks.map((task, index) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  index={index}
                />
              ))
            )}

            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TaskColumn;