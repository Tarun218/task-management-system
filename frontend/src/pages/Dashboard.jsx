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
    <div style={{
      minHeight: "100vh",
      padding: "35px",
      background:
        "linear-gradient(135deg,#dbeafe,#f8fafc,#e0f2fe)",
      fontFamily: "Segoe UI, sans-serif",
    }}>
      {/* Navbar */}
      <Navbar user={user} greeting={getGreeting()} handleLogout={handleLogout} />

      <button
        type="button"
        onClick={() => {
          setShow(true);
          setError("")
        }}
        style={{
          padding: "14px 30px",
          border: "none",
          borderRadius: "12px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "600",
          color: "white",
          background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
          boxShadow: "0 10px 25px rgba(37,99,235,.35)",
          transition: "all .3s",
          marginTop: "10px"
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "translateY(-3px)";
          e.target.style.boxShadow = "0 18px 35px rgba(37,99,235,.45)";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 10px 25px rgba(37,99,235,.35)";
        }}
      >
        ＋ Create New Board
      </button>

      {/* CreateBoardModal */}
      <CreateBoardModal title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        show={show}
        setShow={setShow}
        createBoard={createBoard}
      />
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px"
        }}
      >
        <ErrorMessage message={error} />
      </div>
      <h2
        style={{
          marginTop: "40px",
          marginBottom: "25px",
          fontSize: "30px",
          color: "#1e293b",
          fontFamily: "cursive"
        }}
      >
        Your Boards
      </h2>
      {loading ? (
        <Loader />
      ) : boards.length === 0 ? (
        <div
          style={{
            marginTop: "40px",
            padding: "40px",
            textAlign: "center",
            background: "rgba(255,255,255,.55)",
            borderRadius: "20px",
            boxShadow: "0 12px 30px rgba(0,0,0,.08)"
          }}
        >
          <h2>📁</h2>

          <h3>No Boards Yet</h3>

          <p>Create your first board to get started.</p>

        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
            gap: "25px"
          }}
        >
          {
            boards.map((board) => (
              <BoardCard
                key={board._id}
                board={board}
              />
            ))
          }
        </div>
      )}
    </div>
  );
};

export default Dashboard;