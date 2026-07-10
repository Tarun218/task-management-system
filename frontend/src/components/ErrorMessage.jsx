import React from "react";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div
      style={{
        width: "100%",
        margin: "20px 0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fee2e2",
          color: "#b91c1c",
          border: "1px solid #fca5a5",
          borderLeft: "6px solid #dc2626",
          borderRadius: "12px",
          padding: "14px 20px",
          minWidth: "320px",
          maxWidth: "600px",
          boxShadow: "0 10px 25px rgba(220,38,38,.15)",
          fontWeight: "500",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          animation: "fadeIn .3s ease",
        }}
      >
        <span
          style={{
            fontSize: "22px",
          }}
        >
          ⚠️
        </span>

        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;