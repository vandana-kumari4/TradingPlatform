import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import designSystemV2 from "../styles/designSystemV2";
import {
  LayoutDashboard,
  Briefcase,
  TrendingUp,
  BarChart3,
  Zap,
  Menu,
  X,
} from "lucide-react";

export const SidebarV2 = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { colors, spacing, typography, radius, transition } = designSystemV2;

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard", group: "Core" },
    { label: "Holdings", icon: Briefcase, path: "/holdings", group: "Portfolio" },
    { label: "Orders", icon: TrendingUp, path: "/orders", group: "Portfolio" },
    { label: "Positions", icon: BarChart3, path: "/positions", group: "Portfolio" },
    { label: "Watchlist", icon: TrendingUp, path: "/watchlist", group: "Portfolio" },
    { label: "Analytics", icon: BarChart3, path: "/analytics", group: "Analysis" },
    { label: "Screener", icon: TrendingUp, path: "/screener", group: "Analysis" },
    { label: "Technical", icon: BarChart3, path: "/indicators", group: "Analysis" },
    { label: "Stock Analysis", icon: Zap, path: "/ai-recommendations", group: "AI" },
    { label: "AI Assistant", icon: Zap, path: "/ai-assistant", group: "AI" },
  ];

  const groupedItems = {};
  navItems.forEach((item) => {
    if (!groupedItems[item.group]) {
      groupedItems[item.group] = [];
    }
    groupedItems[item.group].push(item);
  });

  const isActive = (path) => location.pathname === path;

  // Styles
const sidebarStyle = {
  position: "fixed",
  left: 0,
  top: "64px",
  width: "260px",
  height: "calc(100vh - 64px)",
  backgroundColor: colors.surface,
  borderRight: `1px solid ${colors.border}`,
  overflowY: "auto",
  padding: spacing.lg,
  zIndex: 40,
  transition: transition.base,
  display: "block",
};

  const groupStyle = {
    marginBottom: spacing["2xl"],
  };

  const groupTitleStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    display: "block",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontSize: "12px",
  };

  const navItemStyle = (active) => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.md,
    padding: `${spacing.md} ${spacing.lg}`,
    marginBottom: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: active ? `${colors.primary}10` : "transparent",
    borderLeft: active ? `3px solid ${colors.primary}` : "3px solid transparent",
    color: active ? colors.primary : colors.textSecondary,
    cursor: "pointer",
    transition: transition.base,
    border: "none",
    fontFamily: typography.fontFamily,
    fontSize: "14px",
    fontWeight: active ? 600 : 500,
    width: "100%",
    textAlign: "left",
    paddingLeft: `calc(${spacing.lg} - 3px)`,
  });

  const closeButtonStyle = {
    position: "absolute",
    top: spacing.lg,
    right: spacing.lg,
    background: "none",
    border: "none",
    cursor: "pointer",
    color: colors.textSecondary,
    padding: spacing.sm,
    display: "none",
  };

  const sidebarContainerStyle = {
    position: "relative",
  };

  return (
  <aside
    style={sidebarStyle}
    className={`sidebar-v2 ${isOpen ? "sidebar-open" : ""}`}
    open={isOpen ? "true" : "false"}
  >
    
      <div style={sidebarContainerStyle}>
        {/* CLOSE BUTTON - MOBILE ONLY */}
        <button
          onClick={onClose}
          style={closeButtonStyle}
          className="sidebar-close-btn"
          title="Close sidebar"
        >
          <X size={20} />
        </button>

        {/* NAV ITEMS GROUPED */}
        {Object.entries(groupedItems).map(([group, items]) => (
          <div key={group} style={groupStyle}>
            <label style={groupTitleStyle}>{group}</label>
            {items.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose?.();
                }}
                style={navItemStyle(isActive(item.path))}
                className={isActive(item.path) ? "nav-item-active" : ""}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarV2;