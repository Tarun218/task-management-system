import React from 'react'

const AddMemberModal = ({email, setEmail, addMember, setShowForm}) => {
  return (
    <div>
      <form onSubmit={addMember}>
        <input
          type='email'
          value={email}
          placeholder='Email'
          onChange={(e) => { setEmail(e.target.value) }}
        />
        <button
          type='button'
          onClick={()=>{setShowForm(false);setEmail("")}}>Cancel
        </button>
        <button
          type='submit' >
          Add Member</button>

      </form>

    </div>
  )
}

export default AddMemberModal