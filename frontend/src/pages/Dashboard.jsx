import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import CreateBoardModal from "../components/CreateBoardModal";
import BoardCard from "../components/BoardCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const Dashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [boards, setBoards] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    if (hour < 21) return "Good Evening";
    return "Good Night";
  };

  const getProfile = async () => {
    try {
      const res = await api.get("/profile");
      setUser(res.data.user);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load profile");
    }
  };

  const getBoards = async () => {
    try {
      const res = await api.get("/dashboard");
      setBoards(res.data.boards);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to load boards");
    } finally {
      setLoading(false);
    }
  };

  const createBoard = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/boards", {
        title,
        description,
        dueDate,
      });

      setBoards((prev) => [...prev, res.data.board]);

      setTitle("");
      setDescription("");
      setDueDate("");
      setShow(false)
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create board");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getProfile();
    getBoards();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
    {/* Navbar */}
      <Navbar user={user} greeting={getGreeting()} handleLogout={handleLogout} />
      <hr />

    <button type="button" onClick={()=>{
      setShow(true);
      setError("")
    }}>Create New Board</button>
    
    {/* CreateBoardModal */}
    <CreateBoardModal title = {title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      dueDate={dueDate}
      setDueDate={setDueDate}
      show={show}
      setShow={setShow}
      createBoard={createBoard}
    />
    

      <br />

      {error && (
        <ErrorMessage
          message={error}
        />
      )}

      <hr />

      <h2>Your Boards</h2>

      {loading ? (
       <Loader/>
      ) : boards.length === 0 ? (
        <p>No boards found.</p>
      ) : (
        boards.map((board) => (
           <BoardCard board= {board} />
        ))
      )}
    </div>
  );
};

export default Dashboard;