import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../api/axios.js'
const Register = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    // .then((res)=>{
    //   console.log(res.data)
    //   localStorage.setItem("token", res.data.token);
    //   navigate("/dashboard")
    // }
    // )
    try {
      const res = await api.post("/auth/register", { name, email, password })
      navigate("/")
    }
    catch (error) {
      setError(error.response?.data?.message || "Registration failed")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <br/>
        <br/>
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
        <br/>
        <br/>
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <br/>
        <br/>
        <button
          type="submit"
        >
          Register
        </button>
        <br/>
        <br/>
        <p>
          Already have an account?
          <Link to="/">Login</Link>
        </p>
      </form>
        <br/>
        <br/>
      <p style={{ color: "red" }}>
        {error}
      </p>
    </div>
  )
}

export default Register