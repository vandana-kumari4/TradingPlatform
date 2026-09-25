import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import {
  Menu,
  X,
  Home,
  Briefcase,
  BarChart3,
  Zap,
  Bell,
  Moon,
  Sun,
  LogOut,
  ChevronDown,
} from "lucide-react";

export const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const { colors, spacing, radius, transitions } = designSystem;

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // NAVBAR STYLE
  const navbarStyle = {
    backgroundColor: colors.bgPrimary,
    borderBottom: `1px solid ${colors.border}`,
    height: "64px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `0 ${spacing.lg}`,
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: designSystem.shadow.xs,
  };

  const logoStyle = {
    fontSize: "20px",
    fontWeight: 700,
    color: colors.primary,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    cursor: "pointer",
    textDecoration: "none",
  };

  const navLeftStyle = {
    display: "flex",
    alignItems: "center",
    gap: isMobile ? spacing.lg : spacing.xl,
    flex: isMobile ? 1 : "auto",
  };

  const navItemStyle = (isActiveItem = false) => ({
    color: isActiveItem ? colors.primary : colors.textPrimary,
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    padding: `${spacing.md} ${spacing.lg}`,
    borderRadius: radius.md,
    cursor: "pointer",
    transition: transitions.base,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
    position: "relative",
  });

  const activeIndicatorStyle = {
    position: "absolute",
    bottom: "0",
    left: spacing.lg,
    right: spacing.lg,
    height: "3px",
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
  };

  const navRightStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
  };

  const iconButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: spacing.md,
    borderRadius: radius.md,
    color: colors.textPrimary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: transitions.base,
    ':hover': {
      backgroundColor: colors.bgSecondary,
    },
  };

  const dropdownMenuStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    marginTop: spacing.sm,
    minWidth: "200px",
    boxShadow: designSystem.shadow.md,
    zIndex: 1001,
  };

  const dropdownItemStyle = (isActiveItem = false) => ({
    display: "block",
    width: "100%",
    padding: `${spacing.md} ${spacing.lg}`,
    color: isActiveItem ? colors.primary : colors.textPrimary,
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: isActiveItem ? 600 : 400,
    transition: transitions.base,
    borderBottom: `1px solid ${colors.border}`,
    ':last-child': {
      borderBottom: 'none',
    },
  });

  const mobileMenuStyle = {
    position: "fixed",
    top: "64px",
    left: 0,
    right: 0,
    backgroundColor: colors.bgPrimary,
    borderBottom: `1px solid ${colors.border}`,
    maxHeight: "calc(100vh - 64px)",
    overflowY: "auto",
    zIndex: 998,
    display: isMobileMenuOpen ? "block" : "none",
  };

  const mobileMenuItemStyle = (isActiveItem = false) => ({
    display: "block",
    width: "100%",
    padding: `${spacing.md} ${spacing.lg}`,
    color: isActiveItem ? colors.primary : colors.textPrimary,
    background: isActiveItem ? colors.bgSecondary : "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    fontSize: "14px",
    fontWeight: isActiveItem ? 600 : 400,
    transition: transitions.base,
    borderBottom: `1px solid ${colors.border}`,
  });

  if (isMobile) {
    return (
      <>
        <nav style={navbarStyle}>
          <div style={logoStyle} onClick={() => navigate("/dashboard")}>
            <Briefcase size={20} />
            <span>MM</span>
          </div>

          <div style={navRightStyle}>
            <button
              style={iconButtonStyle}
              onClick={() => navigate("/notifications")}
              title="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              style={iconButtonStyle}
              onClick={toggleTheme}
              title="Theme toggle"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              style={iconButtonStyle}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div style={mobileMenuStyle}>
            <button
              style={mobileMenuItemStyle(isActive("/dashboard"))}
              onClick={() => {
                navigate("/dashboard");
                setIsMobileMenuOpen(false);
              }}
            >
              <Home size={16} style={{ marginRight: spacing.sm }} />
              Dashboard
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/holdings"))}
              onClick={() => {
                navigate("/holdings");
                setIsMobileMenuOpen(false);
              }}
            >
              <Briefcase size={16} style={{ marginRight: spacing.sm }} />
              Holdings
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/orders"))}
              onClick={() => {
                navigate("/orders");
                setIsMobileMenuOpen(false);
              }}
            >
              <BarChart3 size={16} style={{ marginRight: spacing.sm }} />
              Orders
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/screener"))}
              onClick={() => {
                navigate("/screener");
                setIsMobileMenuOpen(false);
              }}
            >
              <Zap size={16} style={{ marginRight: spacing.sm }} />
              Screener
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/analytics"))}
              onClick={() => {
                navigate("/analytics");
                setIsMobileMenuOpen(false);
              }}
            >
              <BarChart3 size={16} style={{ marginRight: spacing.sm }} />
              Analytics
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/ai-recommendations"))}
              onClick={() => {
                navigate("/ai-recommendations");
                setIsMobileMenuOpen(false);
              }}
            >
              <Zap size={16} style={{ marginRight: spacing.sm }} />
              AI Recommendations
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/multi-agent-trading"))}
              onClick={() => {
                navigate("/multi-agent-trading");
                setIsMobileMenuOpen(false);
              }}
            >
              <Zap size={16} style={{ marginRight: spacing.sm }} />
              Multi-Agent
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/paper-trading"))}
              onClick={() => {
                navigate("/paper-trading");
                setIsMobileMenuOpen(false);
              }}
            >
              <BarChart3 size={16} style={{ marginRight: spacing.sm }} />
              Paper Trading
            </button>
            <button
              style={mobileMenuItemStyle(isActive("/profile"))}
              onClick={() => {
                navigate("/profile");
                setIsMobileMenuOpen(false);
              }}
            >
              <Briefcase size={16} style={{ marginRight: spacing.sm }} />
              Profile
            </button>
            <button
              style={{
                ...mobileMenuItemStyle(),
                color: colors.error,
                borderTop: `2px solid ${colors.border}`,
              }}
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
            >
              <LogOut size={16} style={{ marginRight: spacing.sm }} />
              Logout
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <nav style={navbarStyle}>
      {/* LEFT */}
      <div style={navLeftStyle}>
        <div style={logoStyle} onClick={() => navigate("/dashboard")}>
          <Briefcase size={24} />
          <span>MarketMastery</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: spacing.lg }}>
          <button
            style={navItemStyle(isActive("/dashboard"))}
            onClick={() => navigate("/dashboard")}
          >
            <Home size={16} />
            Dashboard
            {isActive("/dashboard") && <div style={activeIndicatorStyle} />}
          </button>

          <button
            style={navItemStyle(isActive("/holdings"))}
            onClick={() => navigate("/holdings")}
          >
            <Briefcase size={16} />
            Holdings
            {isActive("/holdings") && <div style={activeIndicatorStyle} />}
          </button>

          <div style={{ position: "relative" }}>
            <button
              style={navItemStyle(activeDropdown === "analysis")}
              onClick={() =>
                setActiveDropdown(activeDropdown === "analysis" ? null : "analysis")
              }
            >
              <BarChart3 size={16} />
              Analysis
              <ChevronDown
                size={16}
                style={{
                  transform:
                    activeDropdown === "analysis" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: transitions.base,
                }}
              />
            </button>
            {activeDropdown === "analysis" && (
              <div style={dropdownMenuStyle}>
                <button
                  style={dropdownItemStyle(isActive("/screener"))}
                  onClick={() => {
                    navigate("/screener");
                    setActiveDropdown(null);
                  }}
                >
                  Stock Screener
                </button>
                <button
                  style={dropdownItemStyle(isActive("/analytics"))}
                  onClick={() => {
                    navigate("/analytics");
                    setActiveDropdown(null);
                  }}
                >
                  Portfolio Analytics
                </button>
                <button
                  style={dropdownItemStyle(isActive("/benchmark"))}
                  onClick={() => {
                    navigate("/benchmark");
                    setActiveDropdown(null);
                  }}
                >
                  Benchmark Comparison
                </button>
                <button
                  style={dropdownItemStyle(isActive("/indicators"))}
                  onClick={() => {
                    navigate("/indicators");
                    setActiveDropdown(null);
                  }}
                >
                  Technical Indicators
                </button>
              </div>
            )}
          </div>

          <div style={{ position: "relative" }}>
            <button
              style={navItemStyle(activeDropdown === "ai")}
              onClick={() => setActiveDropdown(activeDropdown === "ai" ? null : "ai")}
            >
              <Zap size={16} />
              AI Tools
              <ChevronDown
                size={16}
                style={{
                  transform: activeDropdown === "ai" ? "rotate(180deg)" : "rotate(0deg)",
                  transition: transitions.base,
                }}
              />
            </button>
            {activeDropdown === "ai" && (
              <div style={dropdownMenuStyle}>
                <button
                  style={dropdownItemStyle(isActive("/ai-assistant"))}
                  onClick={() => {
                    navigate("/ai-assistant");
                    setActiveDropdown(null);
                  }}
                >
                  AI Chat Assistant
                </button>
                <button
                  style={dropdownItemStyle(isActive("/ai-recommendations"))}
                  onClick={() => {
                    navigate("/ai-recommendations");
                    setActiveDropdown(null);
                  }}
                >
                  AI Recommendations
                </button>
                <button
                  style={dropdownItemStyle(isActive("/multi-agent-trading"))}
                  onClick={() => {
                    navigate("/multi-agent-trading");
                    setActiveDropdown(null);
                  }}
                >
                  Multi-Agent Trading
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={navRightStyle}>
        <button
          style={navItemStyle(isActive("/prices"))}
          onClick={() => navigate("/prices")}
        >
          <BarChart3 size={16} />
          Prices
        </button>

        <button
          style={navItemStyle(isActive("/paper-trading"))}
          onClick={() => navigate("/paper-trading")}
        >
          Paper Trading
        </button>

        <button
          style={iconButtonStyle}
          onClick={() => navigate("/notifications")}
          title="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          style={iconButtonStyle}
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          style={navItemStyle(isActive("/profile"))}
          onClick={() => navigate("/profile")}
          title="Profile"
        >
          <Briefcase size={16} />
        </button>

        <button
          style={{
            ...iconButtonStyle,
            color: colors.error,
            border: `1px solid ${colors.error}`,
            padding: `${spacing.sm} ${spacing.md}`,
          }}
          onClick={handleLogout}
          title="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;