import React, { useState } from "react";
import designSystemV2 from "../styles/designSystemV2";
import { Button, Badge, Tabs, Tab } from "./UIV2";
import { Bell, Check, Trash2, Settings } from "lucide-react";

export const NotificationsV2 = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "trade",
      title: "Trade Executed",
      message: "Your buy order for INFY 50 shares @ ₹1450 completed",
      timestamp: "2 min ago",
      read: false,
    },
    {
      id: 2,
      type: "alert",
      title: "Price Alert",
      message: "TCS reached your target price ₹3400",
      timestamp: "15 min ago",
      read: false,
    },
    {
      id: 3,
      type: "news",
      title: "Market Update",
      message: "Markets close at 6-month high. Sensex +500",
      timestamp: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      type: "recommendation",
      title: "Stock Alert",
      message: "WIPRO shows strong buy signals",
      timestamp: "3 hours ago",
      read: true,
    },
  ]);

  const [settings, setSettings] = useState({
    tradeAlerts: true,
    priceAlerts: true,
    newsUpdates: true,
    aiRecommendations: true,
  });

  const [activeTab, setActiveTab] = useState(0);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const handleSettingChange = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "trade": return colors.success;
      case "alert": return colors.warning;
      case "news": return colors.primary;
      case "recommendation": return colors.info || colors.primary;
      default: return colors.textSecondary;
    }
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case "trade": return "success";
      case "alert": return "warning";
      case "news": return "primary";
      case "recommendation": return "info";
      default: return "default";
    }
  };

  // Styles
  const containerStyle = {
    backgroundColor: colors.bg,
    minHeight: "100vh",
    padding: spacing.xl,
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
    fontSize: "28px",
  };

  const headerSubtitleStyle = {
    ...typography.body,
    color: colors.textSecondary,
  };

  const tabsContainerStyle = {
    marginBottom: spacing["2xl"],
  };

  const notificationItemStyle = (isRead) => ({
    backgroundColor: isRead ? colors.surface : `${colors.primary}08`,
    border: `1px solid ${isRead ? colors.border : `${colors.primary}20`}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    display: "flex",
    gap: spacing.lg,
    transition: "all 200ms",
  });

  const notificationIndicatorStyle = (type) => ({
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
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  };

  const notificationTimeStyle = {
    ...typography.bodySmall,
    color: colors.textTertiary,
  };

  const notificationActionsStyle = {
    display: "flex",
    gap: spacing.sm,
    alignItems: "center",
  };

  const settingsCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.lg,
  };

  const settingItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: `${spacing.md} 0`,
    borderBottom: `1px solid ${colors.border}`,
  };

  const settingItemLastStyle = {
    ...settingItemStyle,
    borderBottom: "none",
  };

  const settingLabelStyle = {
    ...typography.body,
    color: colors.textPrimary,
  };

  const toggleStyle = {
    width: "44px",
    height: "24px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: colors.borderLight,
    cursor: "pointer",
    position: "relative",
    transition: "background-color 200ms",
  };

  const toggleCheckStyle = (isChecked) => ({
    ...toggleStyle,
    backgroundColor: isChecked ? colors.success : colors.borderLight,
  });

  const emptyStateStyle = {
    padding: spacing["3xl"],
    textAlign: "center",
    color: colors.textSecondary,
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Notifications</h1>
          <p style={headerSubtitleStyle}>
            {unreadCount > 0
              ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
              : "No unread notifications"}
          </p>
        </div>

        {/* TABS */}
        <div style={tabsContainerStyle}>
          <div style={{ display: "flex", gap: spacing.lg, borderBottom: `2px solid ${colors.border}`, marginBottom: spacing.lg }}>
            <button
              onClick={() => setActiveTab(0)}
              style={{
                padding: `${spacing.md} 0`,
                marginBottom: "-2px",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: activeTab === 0 ? `2px solid ${colors.primary}` : "transparent",
                color: activeTab === 0 ? colors.primary : colors.textSecondary,
                cursor: "pointer",
                ...typography.body,
                fontWeight: activeTab === 0 ? 600 : 500,
                transition: "all 200ms",
              }}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab(1)}
              style={{
                padding: `${spacing.md} 0`,
                marginBottom: "-2px",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: activeTab === 1 ? `2px solid ${colors.primary}` : "transparent",
                color: activeTab === 1 ? colors.primary : colors.textSecondary,
                cursor: "pointer",
                ...typography.body,
                fontWeight: activeTab === 1 ? 600 : 500,
                transition: "all 200ms",
              }}
            >
              Unread ({unreadCount})
            </button>
            <button
              onClick={() => setActiveTab(2)}
              style={{
                padding: `${spacing.md} 0`,
                marginBottom: "-2px",
                backgroundColor: "transparent",
                border: "none",
                borderBottom: activeTab === 2 ? `2px solid ${colors.primary}` : "transparent",
                color: activeTab === 2 ? colors.primary : colors.textSecondary,
                cursor: "pointer",
                ...typography.body,
                fontWeight: activeTab === 2 ? 600 : 500,
                transition: "all 200ms",
              }}
            >
              Settings
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS LIST */}
        {activeTab === 0 || activeTab === 1 ? (
          <>
            {(activeTab === 0
              ? notifications
              : notifications.filter((n) => !n.read)
            ).length > 0 ? (
              <>
                {(activeTab === 0
                  ? notifications
                  : notifications.filter((n) => !n.read)
                ).map((notif) => (
                  <div key={notif.id} style={notificationItemStyle(notif.read)}>
                    <div style={notificationIndicatorStyle(notif.type)} />

                    <div style={notificationContentStyle}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: spacing.sm,
                          marginBottom: spacing.xs,
                        }}
                      >
                        <div style={notificationTitleStyle}>{notif.title}</div>
                        <Badge variant={getTypeVariant(notif.type)} size="sm">
                          {notif.type}
                        </Badge>
                      </div>
                      <p style={notificationMessageStyle}>{notif.message}</p>
                      <div style={notificationTimeStyle}>{notif.timestamp}</div>
                    </div>

                    <div style={notificationActionsStyle}>
                      {!notif.read && (
                        <button
                          onClick={() => handleMarkAsRead(notif.id)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: colors.success,
                            padding: spacing.sm,
                          }}
                          title="Mark as read"
                        >
                          <Check size={18} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notif.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: colors.error,
                          padding: spacing.sm,
                        }}
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div style={emptyStateStyle}>
                No notifications
              </div>
            )}
          </>
        ) : (
          /* SETTINGS TAB */
          <div>
            <div style={settingsCardStyle}>
              <div style={{ ...typography.h4, color: colors.textPrimary, marginBottom: spacing.lg }}>
                Notification Preferences
              </div>

              <div style={settingItemStyle}>
                <label style={settingLabelStyle}>Trade Execution Alerts</label>
                <button
                  onClick={() => handleSettingChange("tradeAlerts")}
                  style={toggleCheckStyle(settings.tradeAlerts)}
                />
              </div>

              <div style={settingItemStyle}>
                <label style={settingLabelStyle}>Price Alerts</label>
                <button
                  onClick={() => handleSettingChange("priceAlerts")}
                  style={toggleCheckStyle(settings.priceAlerts)}
                />
              </div>

              <div style={settingItemStyle}>
                <label style={settingLabelStyle}>Market News Updates</label>
                <button
                  onClick={() => handleSettingChange("newsUpdates")}
                  style={toggleCheckStyle(settings.newsUpdates)}
                />
              </div>

              <div style={settingItemLastStyle}>
                <label style={settingLabelStyle}>AI Recommendations</label>
                <button
                  onClick={() => handleSettingChange("aiRecommendations")}
                  style={toggleCheckStyle(settings.aiRecommendations)}
                />
              </div>
            </div>

            <Button variant="primary" fullWidth>
              Save Settings
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsV2;