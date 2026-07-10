import React from "react";

const RemoveMember = ({
  board,
  noMember,
  setNoMember,
  removeMember,
  setShowRemoveMember
}) => {
  const removableMembers =
    board.members?.filter(
      (member) => member._id !== board.createdBy._id
    ) || [];

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
        onSubmit={removeMember}
        style={{
          width: "420px",
          background: "white",
          borderRadius: "20px",
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "22px",
          boxShadow: "0 20px 45px rgba(0,0,0,.25)",
        }}
      >
        <h2
          style={{
            margin: 0,
            textAlign: "center",
            color: "#dc2626",
          }}
        >
          Remove Member
        </h2>

        <select
          value={noMember}
          onChange={(e) => setNoMember(e.target.value)}
          disabled={removableMembers.length === 0}
          style={{
            width: "100%",
            height: "45px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            paddingLeft: "12px",
            fontSize: "15px",
            outline: "none",
            transition: ".25s",
            cursor: "pointer",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid #2563eb";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #cbd5e1";
          }}
        >
          <option value="">
            {removableMembers.length === 0
              ? "No members to remove"
              : "Select Member"}
          </option>

          {removableMembers.map((member) => (
            <option
              key={member._id}
              value={member._id}
            >
              {member.name} ({member.email})
            </option>
          ))}
        </select>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button
            type="button"
            onClick={() => setShowRemoveMember(false)}
            style={{
              padding: "12px 28px",
              border: "none",
              borderRadius: "10px",
              background: "#64748b",
              color: "white",
              cursor: "pointer",
              fontWeight: "600",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#475569";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#64748b";
              e.target.style.transform = "scale(1)";
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={removableMembers.length === 0}
            style={{
              padding: "12px 28px",
              border: "none",
              borderRadius: "10px",
              background:
                removableMembers.length === 0
                  ? "#cbd5e1"
                  : "#dc2626",
              color: "white",
              cursor:
                removableMembers.length === 0
                  ? "not-allowed"
                  : "pointer",
              fontWeight: "600",
              transition: ".3s",
            }}
            onMouseEnter={(e) => {
              if (removableMembers.length === 0) return;
              e.target.style.background = "#b91c1c";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              if (removableMembers.length === 0) return;
              e.target.style.background = "#dc2626";
              e.target.style.transform = "scale(1)";
            }}
          >
            Remove Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default RemoveMember;