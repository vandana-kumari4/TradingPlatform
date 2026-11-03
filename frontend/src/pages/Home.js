import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>MarketMastery</h1>
      <p>Stock Trading Platform</p>
      <button onClick={() => navigate("/login")} style={{ marginRight: "10px", padding: "10px 20px", backgroundColor: "#2563EB", color: "white", border: "none", borderRadius: "4px" }}>
        Login
      </button>
      <button onClick={() => navigate("/signup")} style={{ padding: "10px 20px", backgroundColor: "#10B981", color: "white", border: "none", borderRadius: "4px" }}>
        Sign Up
      </button>
    </div>
  );
}