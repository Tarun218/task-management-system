import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import api from '../api/axios';

const Login = () => {
  const [email,setEmail] = useState("");
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const handleSubmit=async(e)=>{
  e.preventDefault();
setError("")
try{
    const res = await api.post('/login',{email, password});
    console.log(res.data)
    localStorage.setItem("token", res.data.token);
    navigate("/dashboard")


}
catch(error){
setError(error.response?.data?.message||"Login failed")
}
  }
  
  return (
    <div>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input 
      type='email'
      value={email}
      placeholder='Enter Email'
      onChange = {
        (e) => setEmail(e.target.value)
      }
    />
    <br/>
    <br/>
    <input
    type='password'
      value={password}
      placeholder='Enter Password'
      onChange={
        (e)=>setPassword(e.target.value)
      }
    />
    <br/>
    <br/>

    <button
   type='submit'>
      Login
    </button>

    </form>
    {error && (<p style={{color:"red"}}>{error}</p>)}
    <p>Don't have an account?{" "}</p>
    <Link to={"/register"} >Register</Link>
    </div>
  )
}

export default Login