import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import { Star, TrendingUp, TrendingDown, Trash2, Plus } from "lucide-react";
import { Badge, Button } from "./UI";

export const WatchList = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const [watchlist, setWatchlist] = useState([
    {
      id: 1,
      symbol: "INFY",
      price: 1550,
      change: 2.5,
      changePercent: 2.5,
      market: "NSE",
      lastUpdate: "10:30 AM",
    },
    {
      id: 2,
      symbol: "TCS",
      price: 3400,
      change: -42,
      changePercent: -1.2,
      market: "NSE",
      lastUpdate: "10:30 AM",
    },
    {
      id: 3,
      symbol: "HDFCBANK",
      price: 1550,
      change: 58,
      changePercent: 3.9,
      market: "NSE",
      lastUpdate: "10:30 AM",
    },
    {
      id: 4,
      symbol: "WIPRO",
      price: 450,
      change: 23,
      changePercent: 5.4,
      market: "NSE",
      lastUpdate: "10:30 AM",
    },
    {
      id: 5,
      symbol: "RELIANCE",
      price: 2100,
      change: 85,
      changePercent: 4.2,
      market: "NSE",
      lastUpdate: "10:30 AM",
    },
  ]);

  const [hoveredRow, setHoveredRow] = useState(null);

  const handleRemove = (id) => {
    setWatchlist(watchlist.filter((item) => item.id !== id));
  };

  // STYLES
  const containerStyle = {
    backgroundColor: colors.bgSecondary,
    minHeight: "100vh",
    padding: `${spacing.xl} ${spacing.xl}`,
  };

  const contentStyle = {
    maxWidth: "1280px",
    margin: "0 auto",
  };

  const headerStyle = {
    marginBottom: spacing["2xl"],
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const headerTitleStyle = {
    ...typography.h1,
    color: colors.textPrimary,
    marginBottom: 0,
  };

  const tableContainerStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    boxShadow: shadow.xs,
    overflow: "hidden",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const tableHeaderStyle = {
    backgroundColor: colors.bgSecondary,
    borderBottom: `2px solid ${colors.border}`,
  };

  const tableHeaderCellStyle = (isNumeric = false) => ({
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: isNumeric ? "right" : "left",
    fontWeight: 600,
    color: colors.textSecondary,
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  });

  const tableRowStyle = (isHovered = false) => ({
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: isHovered ? colors.bgSecondary : "transparent",
    transition: transitions.base,
  });

  const tableCellStyle = (isNumeric = false) => ({
    padding: `${spacing.md} ${spacing.lg}`,
    textAlign: isNumeric ? "right" : "left",
    color: colors.textPrimary,
    fontSize: "14px",
    fontWeight: isNumeric ? 600 : 400,
  });

  const symbolCellStyle = {
    ...tableCellStyle(),
    fontWeight: 700,
    color: colors.primary,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  };

  const emptyStateStyle = {
    padding: `${spacing["3xl"]} ${spacing.xl}`,
    textAlign: "center",
  };

  const emptyIconStyle = {
    fontSize: "48px",
    marginBottom: spacing.lg,
    opacity: 0.5,
  };

  const emptyTitleStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  };

  const emptyDescStyle = {
    ...typography.bodyLarge,
    color: colors.textSecondary,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div>
            <h1 style={headerTitleStyle}>Watchlist</h1>
            <p style={{ ...typography.bodyLarge, color: colors.textSecondary, margin: 0 }}>
              Monitor your favorite stocks
            </p>
          </div>
          <Button variant="primary" icon={Plus}>
            Add Stock
          </Button>
        </div>

        {/* TABLE */}
        {watchlist.length > 0 ? (
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th style={tableHeaderCellStyle()}>Symbol</th>
                  <th style={tableHeaderCellStyle()}>Market</th>
                  <th style={tableHeaderCellStyle(true)}>Price</th>
                  <th style={tableHeaderCellStyle(true)}>Change</th>
                  <th style={tableHeaderCellStyle(true)}>Change %</th>
                  <th style={tableHeaderCellStyle()}>Last Update</th>
                  <th style={tableHeaderCellStyle()}>Action</th>
                </tr>
              </thead>
              <tbody>
                {watchlist.map((stock) => (
                  <tr
                    key={stock.id}
                    style={tableRowStyle(hoveredRow === stock.id)}
                    onMouseEnter={() => setHoveredRow(stock.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={symbolCellStyle}>
                      <Star size={16} color={colors.primary} />
                      {stock.symbol}
                    </td>
                    <td style={tableCellStyle()}>{stock.market}</td>
                    <td style={tableCellStyle(true)}>₹{stock.price}</td>
                    <td style={tableCellStyle(true)}>
                      <span style={{ color: stock.change > 0 ? colors.success : colors.error }}>
                        {stock.change > 0 ? "+" : ""}₹{stock.change}
                      </span>
                    </td>
                    <td style={tableCellStyle(true)}>
                      <Badge
                        variant={stock.changePercent > 0 ? "success" : "error"}
                        size="sm"
                      >
                        {stock.changePercent > 0 ? "+" : ""}
                        {stock.changePercent}%
                      </Badge>
                    </td>
                    <td style={tableCellStyle()}>{stock.lastUpdate}</td>
                    <td style={tableCellStyle()}>
                      <button
                        onClick={() => handleRemove(stock.id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: colors.error,
                          padding: spacing.sm,
                        }}
                        title="Remove from watchlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={tableContainerStyle}>
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>📋</div>
              <h3 style={emptyTitleStyle}>Your watchlist is empty</h3>
              <p style={emptyDescStyle}>Add stocks to track them here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchList;