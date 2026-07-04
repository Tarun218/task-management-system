import React from 'react'

const CreateBoardModal = ({title, setTitle, description, setDescription, dueDate, setDueDate, show, setShow, createBoard}) => {
    if (!show) return null;
    return (
        <div>
            <form onSubmit={createBoard}>
                <h2>Create New Board</h2>
                <input
                    type="text"
                    placeholder="Board Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <br />
                <br />

                <textarea
                    placeholder="Board Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <br />
                <br />

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />

                <br />
                <br />
                <button type="button" onClick={() => {
                    setShow(false);
                    setTitle("");
                    setDescription("");
                    setDueDate("")
                }} >Cancel</button>
                {"  "}
                <button type="submit">
                    Create Board
                </button>
            </form>
        </div>
    )
}

export default CreateBoardModal