import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div style={{backgroundColor:'black', color:'pink'}}>
      <h1>Dashboard</h1>
<Link to='/boards/123' >Open Baord</Link>
    </div>
  )
}

export default Dashboard
