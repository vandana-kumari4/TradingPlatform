import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export const Navbar = ({ isAuthenticated, onLogout }) => {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navStyle = {
    backgroundColor: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    padding: "0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const logoStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: colors.primary,
    cursor: "pointer",
  };

  const navLinksStyle = {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  };

  const buttonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.text,
    fontSize: "16px",
    padding: "0.5rem 1rem",
  };

  return (
    <nav style={navStyle}>
      <div style={logoStyle} onClick={() => navigate("/")}>
        💰 MarketMastery
      </div>

      {isAuthenticated && (
        <div style={navLinksStyle}>
          <a style={{ color: colors.text, cursor: "pointer", textDecoration: "none" }} onClick={() => navigate("/dashboard")}>Dashboard</a>
          <a style={{ color: colors.text, cursor: "pointer", textDecoration: "none" }} onClick={() => navigate("/holdings")}>Holdings</a>
          <a style={{ color: colors.text, cursor: "pointer", textDecoration: "none" }} onClick={() => navigate("/orders")}>Orders</a>
          <a style={{ color: colors.text, cursor: "pointer", textDecoration: "none" }} onClick={() => navigate("/positions")}>Positions</a>
        </div>
      )}

      <div style={rightSectionStyle}>
        <button onClick={toggleTheme} style={buttonStyle}>
          {isDarkMode ? "☀️" : "🌙"}
        </button>

        {isAuthenticated ? (
          <button onClick={() => { onLogout(); navigate("/"); }} style={{...buttonStyle, backgroundColor: colors.danger, color: "white", borderRadius: "4px"}}>
            Logout
          </button>
        ) : (
          <>
            <button onClick={() => navigate("/login")} style={buttonStyle}>Login</button>
            <button onClick={() => navigate("/signup")} style={{...buttonStyle, backgroundColor: colors.primary, color: "white", borderRadius: "4px"}}>Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;