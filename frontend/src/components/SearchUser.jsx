import React from 'react'

const SearchUser = ({ user, setUser, searchUser }) => {
    return (
        <div>

            <form onSubmit={searchUser}>
                <input
                    type='text'
                    value={user}
                    placeholder='Search User'
                    onChange={(e)=> setUser(e.target.value)}

                />
                <button
                    type='submit'
                >Search</button>
                
            </form>


        </div>
    )
}

export default SearchUser