import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "65px",
          height: "65px",
          border: "7px solid #dbeafe",
          borderTop: "7px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <h3
        style={{
          color: "#2563eb",
          fontWeight: "600",
          letterSpacing: "1px",
        }}
      >
        Loading...
      </h3>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;