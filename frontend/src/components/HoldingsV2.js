import React, { useState } from "react";
import designSystemV2 from "../styles/designSystemV2";
import { Button, Input, Badge } from "./UIV2";
import { Search, TrendingUp, TrendingDown } from "lucide-react";
import { useHoldings } from "../hooks/useHoldings";

export const HoldingsV2 = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;
  const { holdings: apiHoldings, loading } = useHoldings();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("symbol");

  // Transform API data
  const holdings = apiHoldings.length > 0
    ? apiHoldings.map(h => ({
        id: h._id || h.id,
        symbol: h.symbol || "N/A",
        qty: h.quantity || 0,
        avgPrice: h.buyPrice || 0,
        currentPrice: h.currentPrice || 0,
        value: (h.quantity || 0) * (h.currentPrice || 0),
        gain: ((h.quantity || 0) * (h.currentPrice || 0)) - ((h.quantity || 0) * (h.buyPrice || 0)),
        gainPercent: h.quantity && h.buyPrice 
          ? (((((h.quantity * h.currentPrice) - (h.quantity * h.buyPrice)) / (h.quantity * h.buyPrice)) * 100)) 
          : 0,
      }))
    : [];

  const [searchTerm2, setSearchTerm2] = useState("");

  const totalValue = holdings.reduce((sum, h) => sum + h.value, 0);
  const totalGain = holdings.reduce((sum, h) => sum + h.gain, 0);
  const totalGainPercent = totalValue > 0 ? (totalGain / totalValue) * 100 : 0;

  const filteredHoldings = holdings.filter((h) =>
    h.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sorted = [...filteredHoldings].sort((a, b) => {
    if (sortBy === "gain") return b.gain - a.gain;
    if (sortBy === "value") return b.value - a.value;
    if (sortBy === "gainPercent") return b.gainPercent - a.gainPercent;
    return a.symbol.localeCompare(b.symbol);
  });

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

  const summaryGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing["2xl"],
  };

  const summaryCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    boxShadow: shadow.xs,
  };

  const summaryLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.md,
    display: "block",
  };

  const summaryValueStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  };

  const summaryChangeStyle = (isPositive) => ({
    display: "flex",
    alignItems: "center",
    gap: spacing.xs,
    ...typography.bodySmall,
    color: isPositive ? colors.success : colors.error,
    fontWeight: 600,
  });

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
  };

  const tableSearchStyle = {
    display: "flex",
    gap: spacing.md,
    flex: 1,
    maxWidth: "400px",
  };

  const tableActionsStyle = {
    display: "flex",
    gap: spacing.md,
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

  const footerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: spacing.lg,
    padding: spacing.lg,
    borderTop: `1px solid ${colors.border}`,
    backgroundColor: colors.bgSecondary,
  };

  if (loading) {
    return (
      <div style={containerStyle}>
        <div style={contentStyle}>
          <div style={{ textAlign: "center", padding: spacing.xl }}>
            <p style={{ color: colors.textSecondary }}>Loading holdings...</p>
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
          <h1 style={headerTitleStyle}>Holdings</h1>
          <p style={headerSubtitleStyle}>Manage your portfolio</p>
        </div>

        {/* SUMMARY */}
        <div style={summaryGridStyle}>
          <div style={summaryCardStyle}>
            <label style={summaryLabelStyle}>Portfolio Value</label>
            <div style={summaryValueStyle}>₹{totalValue.toLocaleString()}</div>
            <div style={summaryChangeStyle(true)}>
              <TrendingUp size={14} />
              <span>Updated today</span>
            </div>
          </div>

          <div style={summaryCardStyle}>
            <label style={summaryLabelStyle}>Total Gain/Loss</label>
            <div style={{ ...summaryValueStyle, color: totalGain > 0 ? colors.success : colors.error }}>
              {totalGain > 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString()}
            </div>
            <div style={summaryChangeStyle(totalGain > 0)}>
              {totalGain > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{totalGainPercent > 0 ? "+" : ""}{totalGainPercent.toFixed(2)}%</span>
            </div>
          </div>

          <div style={summaryCardStyle}>
            <label style={summaryLabelStyle}>Holdings</label>
            <div style={summaryValueStyle}>{holdings.length}</div>
            <div style={{ ...typography.bodySmall, color: colors.textSecondary }}>
              Across {holdings.length} stocks
            </div>
          </div>

          <div style={summaryCardStyle}>
            <label style={summaryLabelStyle}>Avg. Return</label>
            <div style={{ ...summaryValueStyle, color: colors.primary }}>
              {holdings.length > 0 ? (totalGain / holdings.length).toFixed(0) : "0"}
            </div>
            <div style={{ ...typography.bodySmall, color: colors.textSecondary }}>
              Per holding
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div style={tableCardStyle}>
          {/* TABLE HEADER */}
          <div style={tableHeaderStyle}>
            <div style={tableSearchStyle}>
              <input
                type="text"
                placeholder="Search symbol..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: spacing.md,
                  border: `1px solid ${colors.border}`,
                  borderRadius: radius.md,
                  backgroundColor: colors.bgSecondary,
                  color: colors.textPrimary,
                  fontFamily: typography.fontFamily,
                }}
              />
            </div>
            <div style={tableActionsStyle}>
              <button
                style={{
                  padding: `${spacing.sm} ${spacing.md}`,
                  backgroundColor: colors.primary,
                  color: "white",
                  border: "none",
                  borderRadius: radius.md,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                Export
              </button>
            </div>
          </div>

          {/* TABLE CONTENT */}
          {sorted.length > 0 ? (
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead style={tableHeaderRowStyle}>
                  <tr>
                    <th 
                      style={tableHeaderCellStyle}
                      onClick={() => setSortBy("symbol")}
                    >
                      Symbol {sortBy === "symbol" && "↓"}
                    </th>
                    <th 
                      style={{ ...tableHeaderCellStyle, textAlign: "right" }}
                    >
                      Quantity
                    </th>
                    <th 
                      style={{ ...tableHeaderCellStyle, textAlign: "right" }}
                    >
                      Avg. Price
                    </th>
                    <th 
                      style={{ ...tableHeaderCellStyle, textAlign: "right" }}
                    >
                      Current Price
                    </th>
                    <th 
                      style={{ ...tableHeaderCellStyle, textAlign: "right" }}
                      onClick={() => setSortBy("value")}
                    >
                      Value {sortBy === "value" && "↓"}
                    </th>
                    <th 
                      style={{ ...tableHeaderCellStyle, textAlign: "right" }}
                      onClick={() => setSortBy("gain")}
                    >
                      Gain/Loss {sortBy === "gain" && "↓"}
                    </th>
                    <th 
                      style={{ ...tableHeaderCellStyle, textAlign: "right" }}
                      onClick={() => setSortBy("gainPercent")}
                    >
                      Return % {sortBy === "gainPercent" && "↓"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((holding) => (
                    <tr key={holding.id} style={{ borderBottom: `1px solid ${colors.border}` }}>
                      <td style={tableCellStyle}>
                        <strong>{holding.symbol}</strong>
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        {holding.qty}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        ₹{holding.avgPrice}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        ₹{holding.currentPrice}
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <strong>₹{holding.value.toLocaleString()}</strong>
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <div style={{
                          color: holding.gain > 0 ? colors.success : colors.error,
                          fontWeight: 600,
                        }}>
                          {holding.gain > 0 ? "+" : ""}₹{Math.abs(holding.gain).toLocaleString()}
                        </div>
                      </td>
                      <td style={{ ...tableCellStyle, textAlign: "right" }}>
                        <span style={{
                          backgroundColor: holding.gainPercent > 0 ? colors.success + "20" : colors.error + "20",
                          color: holding.gainPercent > 0 ? colors.success : colors.error,
                          padding: `${spacing.xs} ${spacing.sm}`,
                          borderRadius: radius.sm,
                          fontWeight: 600,
                        }}>
                          {holding.gainPercent > 0 ? "+" : ""}{holding.gainPercent.toFixed(2)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={emptyStateStyle}>
              No holdings found
            </div>
          )}

          {/* TABLE FOOTER */}
          <div style={footerStyle}>
            <div>
              <div style={{ ...typography.label, color: colors.textSecondary }}>Total Value</div>
              <div style={{ ...typography.h4, color: colors.textPrimary, marginTop: spacing.sm }}>
                ₹{totalValue.toLocaleString()}
              </div>
            </div>
            <div>
              <div style={{ ...typography.label, color: colors.textSecondary }}>Total Gain/Loss</div>
              <div style={{ ...typography.h4, color: totalGain > 0 ? colors.success : colors.error, marginTop: spacing.sm }}>
                {totalGain > 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString()}
              </div>
            </div>
            <div>
              <div style={{ ...typography.label, color: colors.textSecondary }}>Return %</div>
              <div style={{ ...typography.h4, color: totalGainPercent > 0 ? colors.success : colors.error, marginTop: spacing.sm }}>
                {totalGainPercent > 0 ? "+" : ""}{totalGainPercent.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoldingsV2;