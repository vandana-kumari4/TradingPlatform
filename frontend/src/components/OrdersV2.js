import React, { useState } from "react";
import designSystemV2 from "../styles/designSystemV2";
import { Badge } from "./UIV2";
import { Filter, Download, Search, TrendingUp, TrendingDown } from "lucide-react";
import { useOrders } from "../hooks/useOrders";

export const OrdersV2 = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;
  const { orders: apiOrders, loading } = useOrders();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Transform API data
  const orders = apiOrders.length > 0
    ? apiOrders.map(o => ({
        id: o._id || o.id,
        symbol: o.symbol || "N/A",
        type: o.type || "BUY",
        qty: o.quantity || 0,
        price: o.price || 0,
        status: o.status || "Pending",
        time: o.createdAt ? new Date(o.createdAt).toLocaleTimeString() : "N/A",
        date: o.createdAt ? new Date(o.createdAt).toLocaleDateString() : "N/A",
        value: (o.quantity || 0) * (o.price || 0),
      }))
    : [];

  // Filter & Sort
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const sorted = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "value") return b.value - a.value;
    if (sortBy === "qty") return b.qty - a.qty;
    return 0;
  });

  // Stats
  const completedCount = orders.filter(o => o.status === "Completed").length;
  const pendingCount = orders.filter(o => o.status === "Pending").length;
  const cancelledCount = orders.filter(o => o.status === "Cancelled").length;
  const totalValue = orders.reduce((sum, o) => sum + o.value, 0);

  // Styles
  const containerStyle = {
    backgroundColor: colors.bg,
    minHeight: "100vh",
    padding: spacing.xl,
  };

  const contentStyle = {
    maxWidth: "1400px",
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

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const statCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: shadow.xs,
  };

  const statValueStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
    fontSize: "24px",
  };

  const statLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
  };

  const tableCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    overflow: "hidden",
    boxShadow: shadow.xs,
  };

  const tableHeaderStyle = {
    padding: spacing.lg,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${colors.border}`,
    flexWrap: "wrap",
    gap: spacing.lg,
  };

  const filtersStyle = {
    display: "flex",
    gap: spacing.md,
    alignItems: "center",
    flex: 1,
    minWidth: "300px",
  };

  const inputStyle = {
    flex: 1,
    minWidth: "200px",
    padding: spacing.md,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    backgroundColor: colors.bgSecondary,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    fontSize: "14px",
  };

  const selectStyle = {
    padding: spacing.md,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.md,
    backgroundColor: colors.bgSecondary,
    color: colors.textPrimary,
    fontFamily: typography.fontFamily,
    cursor: "pointer",
    minWidth: "150px",
  };

  const buttonStyle = {
    padding: `${spacing.sm} ${spacing.md}`,
    backgroundColor: colors.primary,
    color: "white",
    border: "none",
    borderRadius: radius.md,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  };

  const tableContainerStyle = {
    overflowX: "auto",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderRowStyle = {
    backgroundColor: colors.bgSecondary,
    borderBottom: `1px solid ${colors.border}`,
  };

  const tableHeaderCellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: "left",
    ...typography.label,
    color: colors.textSecondary,
    fontWeight: 600,
    cursor: "pointer",
    userSelect: "none",
  };

  const tableCellStyle = {
    padding: `${spacing.md} ${spacing.lg}`,
    borderBottom: `1px solid ${colors.border}`,
    ...typography.body,
    color: colors.textPrimary,
  };

  const emptyStateStyle = {
    padding: spacing["3xl"],
    textAlign: "center",
    color: colors.textSecondary,
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={{ textAlign: "center", padding: spacing.xl }}>
            <p style={{ color: colors.textSecondary }}>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Orders</h1>
          <p style={headerSubtitleStyle}>Manage and track your trading orders</p>
        </div>

        {/* STATS */}
        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{orders.length}</div>
            <div style={statLabelStyle}>Total Orders</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{completedCount}</div>
            <div style={statLabelStyle}>Completed</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>{pendingCount}</div>
            <div style={statLabelStyle}>Pending</div>
          </div>
          <div style={statCardStyle}>
            <div style={statValueStyle}>₹{totalValue.toLocaleString()}</div>
            <div style={statLabelStyle}>Total Value</div>
          </div>
        </div>

        {/* TABLE */}
        <div style={tableCardStyle}>
          {/* FILTERS */}
          <div style={tableHeaderStyle}>
            <div style={filtersStyle}>
              <input
                type="text"
                placeholder="Search by symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={inputStyle}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={selectStyle}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <button style={buttonStyle}>
              <Download size={16} />
              Export
            </button>
          </div>

          {/* TABLE CONTENT */}
          {sorted.length > 0 ? (
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead style={tableHeaderRowStyle}>
                  <tr>
                    <th style={tableHeaderCellStyle}>Symbol</th>
                    <th style={tableHeaderCellStyle}>Type</th>
                    <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Qty</th>
                    <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Price</th>
                    <th style={{ ...tableHeaderCellStyle, textAlign: "right" }}>Value</th>
                    <th style={tableHeaderCellStyle}>Status</th>
                    <th style={tableHeaderCellStyle}>Time</th>
                    <th style={tableHeaderCellStyle}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((order) => (
                    <tr key={order.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={tableCellStyle}>
                        <strong>{order.symbol}</strong>
                      </td>
                      <td style={tableCellStyle}>
                        <Badge
                          variant={order.type === "BUY" ? "success" : "error"}
                          size="sm"
                        >
                          {order.type}
                        </Badge>
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        {order.qty}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        ₹{order.price}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right", fontWeight: 600 }}>
                        ₹{order.value.toLocaleString()}
                      </td>
                      <td style={tableCellStyle}>
                        <Badge variant={getStatusColor(order.status)} size="sm">
                          {order.status}
                        </Badge>
                      </td>
                      <td style={tableCellStyle}>{order.time}</td>
                      <td style={tableCellStyle}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={emptyStateStyle}>
              <p style={{ ...typography.h4, marginBottom: spacing.sm }}>No orders found</p>
              <p>Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersV2;