import React from "react";

const CreateBoardModal = ({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  setDueDate,
  show,
  setShow,
  createBoard,
}) => {
  if (!show) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.55)",
        backdropFilter: "blur(5px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={createBoard}
        style={{
          width: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
          boxShadow: "0 20px 45px rgba(0,0,0,.25)",
          transition: ".3s",
        }}
      >
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            color: "#2563eb",
          }}
        >
          Create New Board
        </h2>

        <input
          type="text"
          placeholder="Board Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.border = "1px solid #2563eb";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #cbd5e1";
          }}
        />

        <textarea
          rows={5}
          placeholder="Board Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{
            ...inputStyle,
            height: "120px",
            resize: "none",
            paddingTop: "12px",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid #2563eb";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #cbd5e1";
          }}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={inputStyle}
          onFocus={(e) => {
            e.target.style.border = "1px solid #2563eb";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #cbd5e1";
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <button
            type="button"
            onClick={() => {
              setShow(false);
              setTitle("");
              setDescription("");
              setDueDate("");
            }}
            style={{
              padding: "12px 28px",
              background: "#ef4444",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#dc2626";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#ef4444";
              e.target.style.transform = "scale(1)";
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={{
              padding: "12px 28px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "600",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1d4ed8";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#2563eb";
              e.target.style.transform = "scale(1)";
            }}
          >
            Create Board
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
  transition: ".25s",
};

export default CreateBoardModal;