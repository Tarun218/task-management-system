import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        backgroundImage:
          "linear-gradient(rgba(15,23,42,.55),rgba(15,23,42,.55)), url('https://png.pngtree.com/thumb_back/fh260/background/20240209/pngtree-task-management-business-planning-app-illustration-vector-image_15623958.jpg')",

        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        style={{
          marginTop: "40px",
          color: "white",
          fontSize: "42px",
          fontWeight: "700",
          letterSpacing: "2px",
          fontFamily: 'cursive',
          transition: "all .4s"
        }}
        onMouseEnter={(e) => {
          e.target.style.color="#090c37"
        }}

        onMouseLeave={(e) => {
          e.target.style.color="#f8f8f8";
        }}
      >
        Task Management System
      </h1>

      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "120px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: "360px",
            padding: "35px",
            borderRadius: "18px",
            background: "rgba(255,255,255,.14)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,.25)",
            boxShadow: "0 15px 35px rgba(0,0,0,.35)",
            color: "white",

            transition: "all .35s ease",
          }}

          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,.45)";
          }}

          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0px)";
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,.35)";
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "30px",
              fontSize: "32px",
              fontFamily: 'cursive'
            }}
          >
            Register
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%",
                height: "45px",
                marginBottom: "18px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,.3)",
                background: "rgba(255,255,255,.15)",
                color: "white",
                paddingLeft: "15px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all .3s ease",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid white";
                e.target.style.background = "rgba(255,255,255,.25)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,.3)";
                e.target.style.background = "rgba(255,255,255,.15)";
              }}
            />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                height: "45px",
                marginBottom: "18px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,.3)",
                background: "rgba(255,255,255,.15)",
                color: "white",
                paddingLeft: "15px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all .3s ease",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid white";
                e.target.style.background = "rgba(255,255,255,.25)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,.3)";
                e.target.style.background = "rgba(255,255,255,.15)";
              }}
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                height: "45px",
                marginBottom: "20px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,.3)",
                background: "rgba(255,255,255,.15)",
                color: "white",
                paddingLeft: "15px",
                fontSize: "15px",
                outline: "none",
                boxSizing: "border-box",
                transition: "all .3s ease",
              }}
              onFocus={(e) => {
                e.target.style.border = "1px solid white";
                e.target.style.background = "rgba(255,255,255,.25)";
              }}
              onBlur={(e) => {
                e.target.style.border = "1px solid rgba(255,255,255,.3)";
                e.target.style.background = "rgba(255,255,255,.15)";
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                height: "45px",
                border: "none",
                borderRadius: "8px",
                background: "#2563eb",
                color: "white",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",

                transition: "all .3s ease",
              }}

              onMouseEnter={(e) => {
                e.target.style.background = "#1d4ed8";
                e.target.style.transform = "scale(1.03)";
              }}

              onMouseLeave={(e) => {
                e.target.style.background = "#2563eb";
                e.target.style.transform = "scale(1)";
              }}
            >
              Register
            </button>
          </form>

          {error && (
            <p
              style={{
                color: "#ffb4b4",
                textAlign: "center",
                marginTop: "15px",
                fontWeight: "500",
              }}
            >
              {error}
            </p>
          )}

          <p
            style={{
              textAlign: "center",
              marginTop: "22px",
              fontSize: "15px",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/"
              style={{
                color: "#60a5fa",
                textDecoration: "none",
                fontWeight: "600",
                transition: "all .3s"
              }}

              onMouseEnter={(e) => {
                e.target.style.color = "white";
              }}

              onMouseLeave={(e) => {
                e.target.style.color = "#60a5fa";
              }}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;