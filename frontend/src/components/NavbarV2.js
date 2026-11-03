import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import designSystemV2 from "../styles/designSystemV2";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  BarChart3,
  Zap,
  Bell,
  Moon,
  Sun,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export const NavbarV2 = ({ isAuthenticated, onLogout, isDarkMode, onToggleDarkMode, onMenuClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors, spacing, typography, radius, transition } = designSystemV2;
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  // Styles
  const navStyle = {
    backgroundColor: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  };

  const containerStyle = {
    maxWidth: "100%",
    padding: `0 ${spacing.lg}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "64px",
  };

  const leftSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
  };

  const logoStyle = {
    ...typography.h4,
    color: colors.primary,
    fontWeight: 700,
    cursor: "pointer",
  };

  const menuButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: colors.textSecondary,
    cursor: "pointer",
    padding: spacing.sm,
    borderRadius: radius.md,
    display: "none",
  };

  const rightSectionStyle = {
    display: "flex",
    alignItems: "center",
    gap: spacing.lg,
  };

  const iconButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    color: colors.textSecondary,
    cursor: "pointer",
    padding: spacing.sm,
    borderRadius: radius.md,
    transition: transition.base,
  };

  const profileMenuStyle = {
    position: "relative",
  };

  const profileButtonStyle = {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: colors.primaryLight,
    color: colors.primary,
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    transition: transition.base,
  };

  const profileDropdownStyle = {
    position: "absolute",
    top: "100%",
    right: 0,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    minWidth: "200px",
    zIndex: 1000,
  };

  const dropdownItemStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border}`,
    color: colors.textPrimary,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
    transition: transition.base,
    fontSize: "14px",
    backgroundColor: "transparent",
    border: "none",
    width: "100%",
    textAlign: "left",
    fontFamily: typography.fontFamily,
  };

  const dropdownItemLastStyle = {
    ...dropdownItemStyle,
    borderBottom: "none",
    color: colors.error,
  };

  return (
    <nav style={navStyle}>
      <div style={containerStyle}>
        {/* LEFT - LOGO + MENU BUTTON */}
        <div style={leftSectionStyle}>
          <button
            onClick={onMenuClick}
            style={menuButtonStyle}
            title="Toggle menu"
            className="navbar-menu-button"
          >
            <Menu size={20} />
          </button>
          <div
            style={logoStyle}
            onClick={() => navigate("/dashboard")}
            role="button"
          >
            MarketMastery
          </div>
        </div>

        {/* RIGHT - NOTIFICATIONS, THEME, PROFILE */}
        <div style={rightSectionStyle}>
          {isAuthenticated && (
            <>
              {/* NOTIFICATIONS */}
              <button
                style={iconButtonStyle}
                onClick={() => navigate("/notifications")}
                title="Notifications"
              >
                <Bell size={20} />
              </button>

              {/* THEME TOGGLE */}
              <button
                style={iconButtonStyle}
                onClick={onToggleDarkMode}
                title="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* PROFILE MENU */}
              <div style={profileMenuStyle}>
                <button
                  style={profileButtonStyle}
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  title="Profile menu"
                >
                  VK
                </button>

                {profileMenuOpen && (
                  <div style={profileDropdownStyle}>
                    <button
                      style={dropdownItemStyle}
                      onClick={() => {
                        navigate("/profile");
                        setProfileMenuOpen(false);
                      }}
                    >
                      <User size={16} />
                      Profile
                    </button>
                    <button
                      style={dropdownItemLastStyle}
                      onClick={() => {
                        onLogout();
                        setProfileMenuOpen(false);
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarV2;