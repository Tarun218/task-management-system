import React from "react";

const UserCard = ({ user }) => {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "22px",
        marginTop: "20px",
        boxShadow: "0 12px 30px rgba(0,0,0,.12)",
        border: "1px solid #e2e8f0",
        transition: ".35s ease",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 18px 40px rgba(37,99,235,.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0,0,0,.12)";
      }}
    >
      <div>
        <h2
          style={{
            margin: 0,
            color: "#1e3a8a",
            fontSize: "22px",
          }}
        >
          👤 {user.name}
        </h2>

        <p
          style={{
            marginTop: "10px",
            color: "#64748b",
            fontSize: "15px",
          }}
        >
          📧 {user.email}
        </p>
      </div>

      <div
        style={{
          background: "#2563eb",
          color: "white",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
          fontWeight: "bold",
        }}
      >
        {user?.name?.charAt(0).toUpperCase()}
      </div>
    </div>
  );
};

export default UserCard; 