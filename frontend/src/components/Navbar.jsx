import React from 'react'

const Navbar = ({ user, greeting, handleLogout }) => {
  return (
    <div 
     style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <div>
      <h1>{greeting}, {user?.name}</h1>
      <p>{user?.email}</p>
    </div>
      <button type='button' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar