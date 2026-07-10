import React from "react";
import { Link } from "react-router-dom";

const BoardCard = ({ board }) => {
    return (
        <div
            style={{
                background: "rgba(255,255,255,.75)",
                backdropFilter: "blur(12px)",
                borderRadius: "18px",
                padding: "22px",
                boxShadow: "0 10px 25px rgba(0,0,0,.12)",
                transition: "all .35s ease",
                border: "1px solid rgba(255,255,255,.4)",
                cursor: "pointer",
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform =
                    "translateY(-8px) scale(1.03) ";
                e.currentTarget.style.boxShadow =
                    "0 22px 45px rgba(37,99,235,.25)";
                e.currentTarget.style.border =
                    "1px solid rgba(37,99,235,.6)";
                e.currentTarget.querySelector("h2").style.color = "#3a72ea";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                    "translateY(0) scale(1) ";
                e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,.12)";
                e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,.4)";
                e.currentTarget.querySelector("h2").style.color = "#1e293b";
            }}
        >
            <h2
                style={{
                    transition: ".3s",
                    color: "#1e293b",
                    marginBottom: "12px",
                }}
            >
                📁 {board.title}
            </h2>

            <p
                style={{
                    color: "#475569",
                    minHeight: "55px",
                }}
            >
                {board.description || "No description provided"}
            </p>

            <p
                style={{
                    color: "#64748b",
                    fontSize: "14px",
                }}
            >
                📅 Due Date:{" "}
                {board.dueDate
                    ? new Date(board.dueDate).toLocaleDateString()
                    : "Not Set"}
            </p>

            <div
                style={{
                    marginTop: "20px",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >
                <Link
                    to={`/boards/${board._id}`}
                    style={{
                        textDecoration: "none",
                        padding: "10px 20px",
                        borderRadius: "10px",
                        background:
                            "linear-gradient(135deg,#2563eb,#1d4ed8)",
                        color: "white",
                        fontWeight: "600",
                        transition: ".3s",
                        boxShadow:
                            "0 8px 18px rgba(37,99,235,.25)",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "scale(1.08)";
                        e.target.style.background =
                            "linear-gradient(135deg,#1d4ed8,#1e40af)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "scale(1)";
                        e.target.style.background =
                            "linear-gradient(135deg,#2563eb,#1d4ed8)";
                    }}
                >
                    Open Board →
                </Link>
            </div>
        </div>
    );
};

export default BoardCard;