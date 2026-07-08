import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    try {
      const res = await api.post('/auth/login', { email, password });
      console.log(res.data)
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard")


    }
    catch (error) {
      setError(error.response?.data?.message || "Login failed")
    }
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: "50px",
        gap: "70px",

        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.2)), url('https://png.pngtree.com/thumb_back/fh260/background/20240209/pngtree-task-management-business-planning-app-illustration-vector-image_15623958.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <label
        style={{ fontSize: '40px', fontFamily: 'cursive', color: 'white', fontWeight: 'bolder' }}>Task Management System</label>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          paddingLeft: "100px",
        }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: '80px',
            width: "300px",
            padding: "20px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
            color: "white",
            fontFamily: 'cursive'
          }}>
          <h1 >Login</h1>
          <form onSubmit={handleSubmit}>
            <input
              style={{ border: '1px solid gray', borderRadius: '5px', height: '25px', width: '200px' }}
              type='email'
              value={email}
              placeholder='Enter Email'
              onChange={
                (e) => setEmail(e.target.value)
              }
            />
            <br />
            <br />
            <input
              style={{ border: '1px solid gray', borderRadius: '5px', height: '25px', width: '200px' }}

              type='password'
              value={password}
              placeholder='Enter Password'
              onChange={
                (e) => setPassword(e.target.value)
              }
            />
            <br />
            <br />

            <button
              style={{
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(18px)",
                border: '1px solid gray',
                borderRadius: '5px',
                height: '25px',
                width: '200px'
              }}
              type='submit'>
              Login
            </button>

          </form>
          {error && (<p style={{ color: "red" }}>{error}</p>)}
          <p>Don't have an account?{" "}
            <Link to={"/register"} >Register</Link>
          </p>
        </div>
      </div>
    </div>

  )
}

export default Login