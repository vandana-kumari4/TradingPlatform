import React, { useState } from "react";
import designSystemV2 from "../styles/designSystemV2";
import { Button, Input, Badge, Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from "./UIV2";
import { Filter, X, TrendingUp, TrendingDown } from "lucide-react";

export const ScreenerV2 = () => {
  const { colors, spacing, typography, radius, shadow } = designSystemV2;

  const [filters, setFilters] = useState({
    minPrice: 100,
    maxPrice: 5000,
    minVolume: 1000000,
    gainMin: 0,
    gainMax: 100,
  });

  const [results, setResults] = useState([
    { id: 1, symbol: "INFY", price: 1550, change: 2.5, volume: 5234000, pe: 22.5, marketCap: "800000Cr" },
    { id: 2, symbol: "TCS", price: 3400, change: -1.2, volume: 2134000, pe: 28.1, marketCap: "1200000Cr" },
    { id: 3, symbol: "WIPRO", price: 450, change: 5.4, volume: 8934000, pe: 18.2, marketCap: "180000Cr" },
    { id: 4, symbol: "RELIANCE", price: 2100, change: 4.2, volume: 3456000, pe: 24.7, marketCap: "1800000Cr" },
    { id: 5, symbol: "SBIN", price: 580, change: 3.8, volume: 12345000, pe: 12.4, marketCap: "600000Cr" },
  ]);

  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: parseFloat(value) }));
  };

  const resetFilters = () => {
    setFilters({
      minPrice: 100,
      maxPrice: 5000,
      minVolume: 1000000,
      gainMin: 0,
      gainMax: 100,
    });
  };

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

  const mainGridStyle = {
    display: "grid",
    gridTemplateColumns: showFilters ? "280px 1fr" : "1fr",
    gap: spacing.lg,
  };

  const filtersCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    height: "fit-content",
    boxShadow: shadow.xs,
  };

  const filtersHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottom: `1px solid ${colors.border}`,
  };

  const filtersHeaderTitleStyle = {
    ...typography.h4,
    color: colors.textPrimary,
  };

  const filterGroupStyle = {
    marginBottom: spacing.lg,
  };

  const filterLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    display: "block",
    marginBottom: spacing.sm,
  };

  const sliderStyle = {
    width: "100%",
    accentColor: colors.primary,
  };

  const filterValueStyle = {
    ...typography.bodySmall,
    color: colors.textPrimary,
    fontWeight: 600,
    marginTop: spacing.xs,
  };

  const filterButtonsStyle = {
    display: "flex",
    gap: spacing.sm,
  };

  const resultsCardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    overflow: "hidden",
    boxShadow: shadow.xs,
  };

  const resultsHeaderStyle = {
    padding: spacing.lg,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `1px solid ${colors.border}`,
  };

  const resultsHeaderTitleStyle = {
    ...typography.h4,
    color: colors.textPrimary,
  };

  const resultCountStyle = {
    ...typography.bodySmall,
    color: colors.textSecondary,
  };

  const tableContainerStyle = {
    overflowX: "auto",
  };

  const emptyStateStyle = {
    padding: spacing["3xl"],
    textAlign: "center",
    color: colors.textSecondary,
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Stock Screener</h1>
          <p style={headerSubtitleStyle}>Find stocks based on your criteria</p>
        </div>

        {/* MAIN LAYOUT */}
        <div style={mainGridStyle}>
          {/* FILTERS - MOBILE TOGGLE */}
          {showFilters && (
            <div style={filtersCardStyle}>
              <div style={filtersHeaderStyle}>
                <div style={filtersHeaderTitleStyle}>Filters</div>
                <button
                  onClick={() => setShowFilters(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: colors.textSecondary,
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Price Range */}
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Price Range</label>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    style={sliderStyle}
                  />
                  <div style={filterValueStyle}>
                    ₹{filters.minPrice} - ₹{filters.maxPrice}
                  </div>
                </div>
              </div>

              {/* Volume */}
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Min. Volume</label>
                <input
                  type="number"
                  value={filters.minVolume}
                  onChange={(e) => handleFilterChange("minVolume", e.target.value)}
                  style={{
                    width: "100%",
                    padding: spacing.sm,
                    border: `1px solid ${colors.border}`,
                    borderRadius: radius.md,
                    backgroundColor: colors.bgSecondary,
                    color: colors.textPrimary,
                    fontFamily: typography.fontFamily,
                  }}
                />
              </div>

              {/* Gain Range */}
              <div style={filterGroupStyle}>
                <label style={filterLabelStyle}>Gain Range (%)</label>
                <div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.gainMin}
                    onChange={(e) => handleFilterChange("gainMin", e.target.value)}
                    style={sliderStyle}
                  />
                  <div style={filterValueStyle}>
                    {filters.gainMin}% - {filters.gainMax}%
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div style={filterButtonsStyle}>
                <Button variant="secondary" size="sm" fullWidth onClick={resetFilters}>
                  Reset
                </Button>
                <Button variant="primary" size="sm" fullWidth>
                  Apply
                </Button>
              </div>
            </div>
          )}

          {/* RESULTS */}
          <div style={resultsCardStyle}>
            {/* RESULTS HEADER */}
            <div style={resultsHeaderStyle}>
              <div>
                <div style={resultsHeaderTitleStyle}>Results</div>
                <div style={resultCountStyle}>{results.length} stocks match your criteria</div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                icon={Filter}
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide" : "Show"} Filters
              </Button>
            </div>

            {/* RESULTS TABLE */}
            {results.length > 0 ? (
              <div style={tableContainerStyle}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableHeaderCell>Symbol</TableHeaderCell>
                      <TableHeaderCell align="right">Price</TableHeaderCell>
                      <TableHeaderCell align="right">Change</TableHeaderCell>
                      <TableHeaderCell align="right">Volume</TableHeaderCell>
                      <TableHeaderCell align="right">P/E Ratio</TableHeaderCell>
                      <TableHeaderCell align="right">Market Cap</TableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {results.map((stock) => (
                      <TableRow key={stock.id}>
                        <TableCell>
                          <strong>{stock.symbol}</strong>
                        </TableCell>
                        <TableCell align="right" variant="numeric">
                          ₹{stock.price}
                        </TableCell>
                        <TableCell align="right">
                          <Badge
                            variant={stock.change > 0 ? "success" : "error"}
                            size="sm"
                          >
                            {stock.change > 0 ? "+" : ""}{stock.change}%
                          </Badge>
                        </TableCell>
                        <TableCell align="right" variant="numeric">
                          {(stock.volume / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell align="right" variant="numeric">
                          {stock.pe}
                        </TableCell>
                        <TableCell align="right" variant="numeric">
                          {stock.marketCap}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div style={emptyStateStyle}>
                No stocks match your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenerV2;