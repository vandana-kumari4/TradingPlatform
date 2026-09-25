import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import {
  Search,
  TrendingUp,
  TrendingDown,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Card, Input, Badge, StatusBadge, Button } from "./UI";

export const Holdings = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "symbol", direction: "asc" });
  const [hoveredRow, setHoveredRow] = useState(null);

  const holdingsData = [
    {
      id: 1,
      symbol: "INFY",
      qty: 50,
      avgPrice: 1450,
      currentPrice: 1550,
      value: 77500,
      gain: 5000,
      gainPercent: 6.87,
    },
    {
      id: 2,
      symbol: "TCS",
      qty: 30,
      avgPrice: 3500,
      currentPrice: 3400,
      value: 102000,
      gain: -3000,
      gainPercent: -2.86,
    },
    {
      id: 3,
      symbol: "RELIANCE",
      qty: 20,
      avgPrice: 2000,
      currentPrice: 2100,
      value: 42000,
      gain: 2000,
      gainPercent: 5.0,
    },
    {
      id: 4,
      symbol: "WIPRO",
      qty: 100,
      avgPrice: 420,
      currentPrice: 450,
      value: 45000,
      gain: 3000,
      gainPercent: 7.14,
    },
    {
      id: 5,
      symbol: "SBIN",
      qty: 75,
      avgPrice: 550,
      currentPrice: 580,
      value: 43500,
      gain: 2250,
      gainPercent: 5.45,
    },
  ];

  // FILTERING
  const filteredData = useMemo(() => {
    return holdingsData.filter((holding) =>
      holding.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // SORTING
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];
    sorted.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === "asc"
        ? aValue - bValue
        : bValue - aValue;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // TOTALS
  const totals = useMemo(() => {
    return {
      quantity: sortedData.reduce((sum, h) => sum + h.qty, 0),
      value: sortedData.reduce((sum, h) => sum + h.value, 0),
      gain: sortedData.reduce((sum, h) => sum + h.gain, 0),
      gainPercent:
        sortedData.length > 0
          ? (
              (sortedData.reduce((sum, h) => sum + h.gain, 0) /
                sortedData.reduce(
                  (sum, h) => sum + (h.value - h.gain),
                  0
                )) *
              100
            ).toFixed(2)
          : 0,
    };
  }, [sortedData]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
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

  const controlsStyle = {
    display: "flex",
    gap: spacing.lg,
    marginBottom: spacing.xl,
    alignItems: "flex-end",
    flexWrap: "wrap",
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
    userSelect: "none",
    cursor: "pointer",
    transition: transitions.base,
    ':hover': {
      backgroundColor: colors.bgTertiary,
    },
  });

  const tableRowStyle = (isHovered = false) => ({
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: isHovered ? colors.bgSecondary : "transparent",
    transition: transitions.base,
    ':last-child': {
      borderBottom: 'none',
    },
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

  const totalRowStyle = {
    backgroundColor: colors.bgSecondary,
    borderTop: `2px solid ${colors.border}`,
    borderBottom: `2px solid ${colors.border}`,
    fontWeight: 700,
  };

  const totalCellStyle = (isNumeric = false) => ({
    padding: `${spacing.lg} ${spacing.lg}`,
    textAlign: isNumeric ? "right" : "left",
    color: colors.textPrimary,
    fontSize: "14px",
    fontWeight: 700,
  });

  const emptyStateStyle = {
    padding: `${spacing["3xl"]} ${spacing.xl}`,
    textAlign: "center",
  };

  const emptyIconStyle = {
    fontSize: "48px",
    marginBottom: spacing.xl,
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

  const sortIndicatorStyle = {
    marginLeft: spacing.xs,
    display: "inline-block",
  };

  const SortIcon = ({ active, direction }) => {
    if (!active) return null;
    return direction === "asc" ? (
      <ChevronUp size={14} style={sortIndicatorStyle} />
    ) : (
      <ChevronDown size={14} style={sortIndicatorStyle} />
    );
  };

  // COMPONENT
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Holdings</h1>
          <p style={headerSubtitleStyle}>
            Manage and track your stock portfolio
          </p>
        </div>

        {/* CONTROLS */}
        <div style={controlsStyle}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <Input
              label="Search Holdings"
              placeholder="Search by symbol..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
              fullWidth
            />
          </div>
          <Button variant="secondary" size="md">
            Export Holdings
          </Button>
        </div>

        {/* TABLE */}
        {sortedData.length > 0 ? (
          <div style={tableContainerStyle}>
            <table style={tableStyle}>
              <thead style={tableHeaderStyle}>
                <tr>
                  <th style={tableHeaderCellStyle()} onClick={() => handleSort("symbol")}>
                    Symbol{" "}
                    <SortIcon
                      active={sortConfig.key === "symbol"}
                      direction={sortConfig.direction}
                    />
                  </th>
                  <th style={tableHeaderCellStyle(true)} onClick={() => handleSort("qty")}>
                    Quantity{" "}
                    <SortIcon
                      active={sortConfig.key === "qty"}
                      direction={sortConfig.direction}
                    />
                  </th>
                  <th style={tableHeaderCellStyle(true)} onClick={() => handleSort("avgPrice")}>
                    Avg Price{" "}
                    <SortIcon
                      active={sortConfig.key === "avgPrice"}
                      direction={sortConfig.direction}
                    />
                  </th>
                  <th style={tableHeaderCellStyle(true)} onClick={() => handleSort("currentPrice")}>
                    Current Price{" "}
                    <SortIcon
                      active={sortConfig.key === "currentPrice"}
                      direction={sortConfig.direction}
                    />
                  </th>
                  <th style={tableHeaderCellStyle(true)} onClick={() => handleSort("value")}>
                    Value{" "}
                    <SortIcon
                      active={sortConfig.key === "value"}
                      direction={sortConfig.direction}
                    />
                  </th>
                  <th style={tableHeaderCellStyle(true)} onClick={() => handleSort("gain")}>
                    Gain/Loss{" "}
                    <SortIcon
                      active={sortConfig.key === "gain"}
                      direction={sortConfig.direction}
                    />
                  </th>
                  <th style={tableHeaderCellStyle(true)}>Return %</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((holding) => (
                  <tr
                    key={holding.id}
                    style={tableRowStyle(hoveredRow === holding.id)}
                    onMouseEnter={() => setHoveredRow(holding.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <td style={symbolCellStyle}>
                      {holding.gain > 0 ? (
                        <TrendingUp size={16} color={colors.success} />
                      ) : (
                        <TrendingDown size={16} color={colors.error} />
                      )}
                      {holding.symbol}
                    </td>
                    <td style={tableCellStyle(true)}>{holding.qty}</td>
                    <td style={tableCellStyle(true)}>₹{holding.avgPrice.toLocaleString()}</td>
                    <td style={tableCellStyle(true)}>₹{holding.currentPrice.toLocaleString()}</td>
                    <td style={tableCellStyle(true)}>₹{holding.value.toLocaleString()}</td>
                    <td style={tableCellStyle(true)}>
                      <span
                        style={{
                          color: holding.gain > 0 ? colors.success : colors.error,
                        }}
                      >
                        {holding.gain > 0 ? "+" : ""}₹{holding.gain.toLocaleString()}
                      </span>
                    </td>
                    <td style={tableCellStyle(true)}>
                      <Badge
                        variant={holding.gainPercent > 0 ? "success" : "error"}
                        size="sm"
                      >
                        {holding.gainPercent > 0 ? "+" : ""}
                        {holding.gainPercent.toFixed(2)}%
                      </Badge>
                    </td>
                  </tr>
                ))}

                {/* TOTALS ROW */}
                <tr style={totalRowStyle}>
                  <td style={totalCellStyle()}>TOTAL</td>
                  <td style={totalCellStyle(true)}>{totals.quantity}</td>
                  <td style={totalCellStyle(true)}>-</td>
                  <td style={totalCellStyle(true)}>-</td>
                  <td style={totalCellStyle(true)}>
                    ₹{totals.value.toLocaleString()}
                  </td>
                  <td style={totalCellStyle(true)}>
                    <span
                      style={{
                        color: totals.gain > 0 ? colors.success : colors.error,
                      }}
                    >
                      {totals.gain > 0 ? "+" : ""}₹{totals.gain.toLocaleString()}
                    </span>
                  </td>
                  <td style={totalCellStyle(true)}>
                    <Badge
                      variant={totals.gainPercent > 0 ? "success" : "error"}
                      size="sm"
                    >
                      {totals.gainPercent > 0 ? "+" : ""}
                      {totals.gainPercent}%
                    </Badge>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div style={tableContainerStyle}>
            <div style={emptyStateStyle}>
              <div style={emptyIconStyle}>📦</div>
              <h3 style={emptyTitleStyle}>No holdings found</h3>
              <p style={emptyDescStyle}>
                Try adjusting your search or start by buying some stocks
              </p>
            </div>
          </div>
        )}

        {/* INFO TEXT */}
        <div
          style={{
            marginTop: spacing.xl,
            ...typography.bodySmall,
            color: colors.textTertiary,
            textAlign: "center",
          }}
        >
          Total holdings: {sortedData.length} | Last updated: Just now
        </div>
      </div>
    </div>
  );
};

export default Holdings;