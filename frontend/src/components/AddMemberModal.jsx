import React from "react";

const AddMemberModal = ({
  email,
  setEmail,
  addMember,
  setShowForm,
  setShowAddMember,
}) => {
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
        onSubmit={addMember}
        style={{
          width: "420px",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
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
          Add Member
        </h2>

        <input
          type="email"
          placeholder="Enter member's email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            height: "45px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            paddingLeft: "14px",
            fontSize: "15px",
            outline: "none",
            transition: ".25s",
            boxSizing: "border-box",
          }}
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
              setShowForm(false);
              setShowAddMember(false);
              setEmail("");
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
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMemberModal;