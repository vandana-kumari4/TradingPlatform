import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

export const Navbar = () => {
  const { isDark, toggleTheme, colors } = useTheme();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const navbarStyle = {
    backgroundColor: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    padding: "1rem 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: colors.primary,
    cursor: "pointer",
  };

  const linkStyle = {
    color: colors.text,
    textDecoration: "none",
    cursor: "pointer",
    fontSize: "14px",
    padding: "0.75rem 0",
    display: "block",
  };

  const buttonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
  };

  // Desktop Menu
  if (!isMobile) {
    return (
      <nav style={navbarStyle}>
        <div style={logoStyle} onClick={() => navigate("/dashboard")}>
          💰 MarketMastery
        </div>
               <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <a onClick={() => navigate("/dashboard")} style={linkStyle}>Dashboard</a>
          <a onClick={() => navigate("/holdings")} style={linkStyle}>Holdings</a>
          <a onClick={() => navigate("/orders")} style={linkStyle}>Orders</a>
          <a onClick={() => navigate("/positions")} style={linkStyle}>Positions</a>
          <a onClick={() => navigate("/watchlist")} style={linkStyle}>Watchlist</a>
          <a onClick={() => navigate("/search")} style={linkStyle}>Search</a>
          <a onClick={() => navigate("/screener")} style={linkStyle}>Screener</a>
          <a onClick={() => navigate("/benchmark")} style={linkStyle}>Benchmark</a>
          <a onClick={() => navigate("/analytics")} style={linkStyle}>Analytics</a>
          <a onClick={() => navigate("/ai-assistant")} style={linkStyle}>🤖 AI</a>
          <a onClick={() => navigate("/prices")} style={linkStyle}>📊 Prices</a>
          <a onClick={() => navigate("/indicators")} style={linkStyle}>📈 Indicators</a>
          <a onClick={() => navigate("/advanced-orders")} style={linkStyle}>🎯 Orders</a>
          <button 
            onClick={toggleTheme} 
            style={{ 
              background: "none", 
              border: "none", 
              fontSize: "18px", 
              cursor: "pointer",
              color: colors.text 
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          
          <button onClick={handleLogout} style={buttonStyle}>Logout</button>
        </div>
      </nav>
    );
  }

  // Mobile Menu
  return (
    <div>
      <nav style={navbarStyle}>
        <div style={logoStyle} onClick={() => navigate("/dashboard")}>
          💰 MM
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button 
            onClick={toggleTheme} 
            style={{ 
              background: "none", 
              border: "none", 
              fontSize: "18px", 
              cursor: "pointer",
              color: colors.text
            }}
          >
            {isDark ? "☀️" : "🌙"}
          </button>
          
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ 
              background: "none", 
              border: "none", 
              cursor: "pointer", 
              fontSize: "24px",
              color: colors.text,
              padding: "0"
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{
          backgroundColor: colors.surface,
          borderBottom: `1px solid ${colors.border}`,
          padding: "1rem",
          maxHeight: "80vh",
          overflowY: "auto",
          position: "absolute",
          top: "60px",
          left: 0,
          right: 0,
          zIndex: 999,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1rem",
        }}>
          
          {/* Trading Section */}
          <div>
            <div style={{ 
              color: colors.textSecondary, 
              fontSize: "12px", 
              fontWeight: "600",
              marginBottom: "0.5rem",
              textTransform: "uppercase"
            }}>
              Trading
            </div>
            <a onClick={() => { navigate("/dashboard"); setMenuOpen(false); }} style={linkStyle}>Dashboard</a>
            <a onClick={() => { navigate("/watchlist"); setMenuOpen(false); }} style={linkStyle}>Watchlist</a>
            <a onClick={() => { navigate("/search"); setMenuOpen(false); }} style={linkStyle}>Search</a>
                        <a onClick={() => { navigate("/advanced-orders"); setMenuOpen(false); }} style={linkStyle}>🎯 Orders</a>
          </div>

          {/* Portfolio Section */}
          <div>
            <div style={{ 
              color: colors.textSecondary, 
              fontSize: "12px", 
              fontWeight: "600",
              marginBottom: "0.5rem",
              textTransform: "uppercase"
            }}>
              Portfolio
            </div>
            <a onClick={() => { navigate("/holdings"); setMenuOpen(false); }} style={linkStyle}>Holdings</a>
            <a onClick={() => { navigate("/orders"); setMenuOpen(false); }} style={linkStyle}>Orders</a>
            <a onClick={() => { navigate("/positions"); setMenuOpen(false); }} style={linkStyle}>Positions</a>
          </div>

          {/* Analysis Section */}
          <div>
            <div style={{ 
              color: colors.textSecondary, 
              fontSize: "12px", 
              fontWeight: "600",
              marginBottom: "0.5rem",
              textTransform: "uppercase"
            }}>
              Analysis
            </div>
            <a onClick={() => { navigate("/screener"); setMenuOpen(false); }} style={linkStyle}>Screener</a>
            <a onClick={() => { navigate("/benchmark"); setMenuOpen(false); }} style={linkStyle}>Benchmark</a>
            <a onClick={() => { navigate("/analytics"); setMenuOpen(false); }} style={linkStyle}>Analytics</a>
            <a onClick={() => { navigate("/ai-assistant"); setMenuOpen(false); }} style={linkStyle}>🤖 AI Assistant</a>
            <a onClick={() => { navigate("/prices"); setMenuOpen(false); }} style={linkStyle}>📊 Prices</a>
            <a onClick={() => { navigate("/indicators"); setMenuOpen(false); }} style={linkStyle}>📈 Indicators</a>
          </div>

          {/* Account Section */}
          <div>
            <div style={{ 
              color: colors.textSecondary, 
              fontSize: "12px", 
              fontWeight: "600",
              marginBottom: "0.5rem",
              textTransform: "uppercase"
            }}>
              Account
            </div>
            <button 
              onClick={handleLogout} 
              style={{
                ...linkStyle,
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "0.75rem 1rem",
                border: "none",
                borderRadius: "4px",
                width: "100%",
                textAlign: "left",
                fontWeight: "600"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;