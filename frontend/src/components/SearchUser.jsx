import React from "react";

const SearchUser = ({ user, setUser, searchUser,showUser,setShowUser }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "25px 0",
      }}
    >
      <form
        onSubmit={searchUser}
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
          background: "white",
          padding: "20px",
          borderRadius: "18px",
          boxShadow: "0 12px 30px rgba(0,0,0,.12)",
          transition: ".3s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 18px 40px rgba(0,0,0,.18)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 12px 30px rgba(0,0,0,.12)";
        }}
      >
        <input
          type="text"
          value={user}
          placeholder="Search user by name or email..."
          onChange={(e) => setUser(e.target.value)}
          style={{
            width: "320px",
            height: "45px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            paddingLeft: "15px",
            fontSize: "15px",
            outline: "none",
            transition: ".25s",
          }}
          onFocus={(e) => {
            e.target.style.border = "1px solid #2563eb";
            e.target.style.boxShadow =
              "0 0 8px rgba(37,99,235,.25)";
          }}
          onBlur={(e) => {
            e.target.style.border = "1px solid #cbd5e1";
            e.target.style.boxShadow = "none";
          }}
        />
        {showUser? (<button
          type="button"
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
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
          onClick={()=>[setShowUser(false), setUser("")]}
        >
         ❌    
        </button>): null}

        <button
          type="submit"
          style={{
            padding: "12px 24px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
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
          🔍
        </button>
      </form>
    </div>
  );
};

export default SearchUser;