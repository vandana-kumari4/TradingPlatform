import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import { Bell, Settings, Trash2, Check } from "lucide-react";
import { Button, Badge } from "./UI";

export const Notifications = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "trade",
      title: "Trade Executed",
      message: "Your buy order for INFY 50 shares @ ₹1450 has been executed",
      timestamp: "2 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      title: "Price Alert",
      message: "TCS has reached your target price of ₹3400",
      timestamp: "15 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "news",
      title: "Market News",
      message: "Indian markets close at 6-month high. Sensex gains 500 points",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "recommendation",
      title: "AI Recommendation",
      message: "WIPRO shows strong buy signals. Consider accumulating on dips",
      timestamp: "3 hours ago",
      read: true,
    },
    {
      id: 5,
      type: "system",
      title: "System Update",
      message: "Platform maintenance completed successfully",
      timestamp: "5 hours ago",
      read: true,
    },
  ]);

  const [settings, setSettings] = useState({
    tradeAlerts: true,
    priceAlerts: true,
    newsUpdates: true,
    aiRecommendations: true,
  });

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "trade":
        return colors.success;
      case "alert":
        return colors.warning;
      case "news":
        return colors.primary;
      case "recommendation":
        return colors.info || colors.primary;
      case "system":
        return colors.textSecondary;
      default:
        return colors.primary;
    }
  };

  const getTypeBadgeVariant = (type) => {
    switch (type) {
      case "trade":
        return "success";
      case "alert":
        return "warning";
      case "news":
        return "info";
      case "recommendation":
        return "info";
      default:
        return "default";
    }
  };

  // STYLES
  const containerStyle = {
    backgroundColor: colors.bgSecondary,
    minHeight: "100vh",
    padding: `${spacing.xl} ${spacing.xl}`,
  };

  const contentStyle = {
    maxWidth: "900px",
    margin: "0 auto",
  };

  const headerStyle = {
    marginBottom: spacing["2xl"],
  };

  const headerTitleStyle = {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const headerSubtitleStyle = {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  };

  const tabsStyle = {
    display: "flex",
    gap: spacing.md,
    marginBottom: spacing.xl,
    borderBottom: `2px solid ${colors.border}`,
  };

  const tabStyle = (isActive = false) => ({
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: isActive ? `3px solid ${colors.primary}` : "none",
    color: isActive ? colors.primary : colors.textSecondary,
    cursor: "pointer",
    transition: transitions.base,
    fontWeight: isActive ? 600 : 400,
  });

  const notificationCardStyle = (isRead = false) => ({
    backgroundColor: isRead ? colors.bgPrimary : `${colors.primary}08`,
    border: `1px solid ${isRead ? colors.border : colors.primary}20`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    display: "flex",
    gap: spacing.lg,
    transition: transitions.base,
  });

  const notificationDotStyle = (type) => ({
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: getTypeColor(type),
    marginTop: "4px",
    flexShrink: 0,
  });

  const notificationContentStyle = {
    flex: 1,
  };

  const notificationTitleStyle = {
    ...typography.bodyLarge,
    fontWeight: 600,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  };

  const notificationMessageStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  };

  const notificationTimeStyle = {
    ...typography.bodySmall,
    color: colors.textTertiary,
    fontSize: "12px",
  };

  const notificationActionsStyle = {
    display: "flex",
    gap: spacing.sm,
    alignItems: "center",
  };

  const settingsCardStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
  };

  const settingsHeaderStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  };

  const settingItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${spacing.md} 0`,
    borderBottom: `1px solid ${colors.border}`,
  };

  const settingLabelStyle = {
    ...typography.bodyLarge,
    color: colors.textPrimary,
  };

  const checkboxStyle = {
    width: "20px",
    height: "20px",
    cursor: "pointer",
    accentColor: colors.primary,
  };

  const emptyStateStyle = {
    padding: `${spacing["3xl"]} ${spacing.xl}`,
    textAlign: "center",
    backgroundColor: colors.bgPrimary,
    borderRadius: radius.lg,
    border: `1px solid ${colors.border}`,
  };

  const emptyIconStyle = {
    fontSize: "48px",
    marginBottom: spacing.lg,
    opacity: 0.5,
  };

  // COMPONENT
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Notifications</h1>
          <p style={headerSubtitleStyle}>
            Stay updated with market alerts and trading updates
          </p>
        </div>

        {/* TABS */}
        <div style={tabsStyle}>
          <div style={tabStyle(true)}>
            <Bell size={16} style={{ marginRight: spacing.xs, display: "inline" }} />
            All Notifications
          </div>
          <div style={tabStyle()}>Unread</div>
          <div style={tabStyle()}>Settings</div>
        </div>

        {/* NOTIFICATIONS LIST */}
        {notifications.length > 0 ? (
          <>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                style={notificationCardStyle(notification.read)}
              >
                <div style={notificationDotStyle(notification.type)} />

                <div style={notificationContentStyle}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: spacing.sm,
                      marginBottom: spacing.xs,
                    }}
                  >
                    <h3 style={notificationTitleStyle}>{notification.title}</h3>
                    <Badge variant={getTypeBadgeVariant(notification.type)} size="sm">
                      {notification.type}
                    </Badge>
                  </div>
                  <p style={notificationMessageStyle}>{notification.message}</p>
                  <p style={notificationTimeStyle}>{notification.timestamp}</p>
                </div>

                <div style={notificationActionsStyle}>
                  {!notification.read && (
                    <button
                      onClick={() => handleMarkAsRead(notification.id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: colors.success,
                        padding: spacing.sm,
                      }}
                      title="Mark as read"
                    >
                      <Check size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notification.id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: colors.error,
                      padding: spacing.sm,
                    }}
                    title="Delete notification"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div style={emptyStateStyle}>
            <div style={emptyIconStyle}>📭</div>
            <p style={{ ...typography.bodyLarge, color: colors.textSecondary }}>
              No notifications
            </p>
          </div>
        )}

        {/* SETTINGS */}
        <div style={{ marginTop: spacing["3xl"] }}>
          <div style={settingsCardStyle}>
            <h3 style={settingsHeaderStyle}>
              <Settings size={20} />
              Notification Settings
            </h3>

            {Object.entries(settings).map(([key, value]) => (
              <div key={key} style={settingItemStyle}>
                <label style={settingLabelStyle}>
                  {key === "tradeAlerts"
                    ? "Trade Execution Alerts"
                    : key === "priceAlerts"
                    ? "Price Alerts"
                    : key === "newsUpdates"
                    ? "Market News Updates"
                    : "AI Recommendations"}
                </label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handleSettingChange(key)}
                  style={checkboxStyle}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;