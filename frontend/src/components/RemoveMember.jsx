const RemoveMember = ({
    board,
    noMember,
    setNoMember,
    removeMember
}) => {
const removableMembers = board.members?.filter((member)=> member._id !== board.createdBy._id)||[]
    return (
        <form onSubmit={removeMember}>

            <select
                value={noMember}
                onChange={(e) => setNoMember(e.target.value)}
            >

                <option value="">
                    Select Member
                </option>

                {removableMembers.length === 0 ? (<option disabled value=""  >No members to remove</option>) :( 
                removableMembers.map((member)=>
                (<option 
                key={member._id}
                value={member._id}>{member.name} ({member.email}) </option>)))}

            </select>

            <button type="submit">
                Remove
            </button>

        </form>
    )
}

export default RemoveMember;