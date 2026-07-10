import React from "react";

const Navbar = ({ user, greeting, handleLogout }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 35px",
        borderRadius: "18px",
        background: "rgba(255,255,255,.12)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: "1px solid rgba(255,255,255,.18)",
        boxShadow: "0 12px 30px rgba(0,0,0,.25)",
        marginBottom: "30px",
        color: "black",
        transition: ".35s",
        boxSizing: "border-box",
        cursor:"default"
      }}
      onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-3px)";
    e.currentTarget.style.boxShadow="0 20px 40px rgba(0,0,0,.30)";
}}
      onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0)";
    e.currentTarget.style.boxShadow="0 12px 30px rgba(0,0,0,.25)";
}}
    >
      <div>
        <h2
          style={{
            margin: 0,
            fontSize: "28px",
            fontFamily: "cursive",
          }}
        >
          {greeting}, {user?.name}
        </h2>

        <p
          style={{
            marginTop: "10px",
            marginBottom: 0,
            opacity: .75,
            fontSize: "15px"
          }}
        >
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          padding: "12px 28px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          background:"linear-gradient(135deg,#ef4444,#b91c1c)",
          color: "white",
          fontWeight: "600",
          fontSize: "15px",
          transition: ".3s",
          boxShadow: "0 8px 18px rgba(220,38,38,.4)",
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#b91c1c";
          e.target.style.transform = "translateY(-2px) scale(1.05)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#dc2626";
          e.target.style.transform = "translateY(0px) scale(1)";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;