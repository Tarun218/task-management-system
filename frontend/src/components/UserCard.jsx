import React from 'react'

const UserCard = ({user}) => {
  return (
    <div 
    style={{border:'1px solid black'}}>
      <h2>{user.name}</h2>
      <h3> {user.email} </h3>
    </div>
  )
}

export default UserCard
