import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";
import designSystem from "../styles/designSystem";
import { Search, Save, Filter, TrendingUp, TrendingDown } from "lucide-react";
import { Card, Input, Select, Button, Badge, EmptyState } from "./UI";

export const StockScreener = () => {
  const { isDark } = useTheme();
  const { colors, spacing, typography, radius, shadow, transitions } = designSystem;

  const [filters, setFilters] = useState({
    marketCap: "all",
    peRatio: [0, 100],
    dividend: false,
    volume: "all",
    sector: "all",
  });

  const [filterName, setFilterName] = useState("");
  const [savedFilters, setSavedFilters] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const stocksDatabase = [
    {
      id: 1,
      symbol: "INFY",
      price: 1550,
      change: 2.5,
      volume: "12.5M",
      pe: 22.5,
      dividend: 1.2,
      marketCap: "847B",
      sector: "IT",
    },
    {
      id: 2,
      symbol: "TCS",
      price: 3400,
      change: -1.2,
      volume: "8.3M",
      pe: 25.1,
      dividend: 1.5,
      marketCap: "952B",
      sector: "IT",
    },
    {
      id: 3,
      symbol: "HDFCBANK",
      price: 1550,
      change: 3.8,
      volume: "15.2M",
      pe: 18.9,
      dividend: 2.1,
      marketCap: "1.2T",
      sector: "Banking",
    },
    {
      id: 4,
      symbol: "WIPRO",
      price: 450,
      change: 5.2,
      volume: "22.1M",
      pe: 16.3,
      dividend: 1.8,
      marketCap: "285B",
      sector: "IT",
    },
    {
      id: 5,
      symbol: "RELIANCE",
      price: 2100,
      change: 4.1,
      volume: "11.9M",
      pe: 28.5,
      dividend: 2.3,
      marketCap: "2.1T",
      sector: "Energy",
    },
    {
      id: 6,
      symbol: "SBIN",
      price: 580,
      change: 6.3,
      volume: "35.4M",
      pe: 14.2,
      dividend: 2.8,
      marketCap: "725B",
      sector: "Banking",
    },
  ];

  const filteredResults = useMemo(() => {
    let results = [...stocksDatabase];

    if (filters.sector !== "all") {
      results = results.filter((stock) => stock.sector === filters.sector);
    }

    if (filters.marketCap !== "all") {
      results = results.filter((stock) => {
        const cap = parseInt(stock.marketCap);
        if (filters.marketCap === "large") return cap > 500;
        if (filters.marketCap === "mid") return cap >= 100 && cap <= 500;
        if (filters.marketCap === "small") return cap < 100;
        return true;
      });
    }

    if (filters.dividend) {
      results = results.filter((stock) => stock.dividend >= 1.5);
    }

    if (filters.volume !== "all") {
      results = results.filter((stock) => {
        const vol = parseInt(stock.volume);
        if (filters.volume === "high") return vol > 20;
        if (filters.volume === "medium") return vol >= 10 && vol <= 20;
        if (filters.volume === "low") return vol < 10;
        return true;
      });
    }

    results = results.filter((stock) => {
      const pe = stock.pe;
      return pe >= filters.peRatio[0] && pe <= filters.peRatio[1];
    });

    return results;
  }, [filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSearchScreener = () => {
    setHasSearched(true);
  };

  const handleSaveFilter = () => {
    if (!filterName.trim()) {
      alert("Please enter a filter name");
      return;
    }
    setSavedFilters([
      ...savedFilters,
      {
        id: Date.now(),
        name: filterName,
        filters: { ...filters },
      },
    ]);
    setFilterName("");
  };

  const handleLoadFilter = (savedFilter) => {
    setFilters(savedFilter.filters);
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

  const filtersCardStyle = {
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.xl,
    marginBottom: spacing.xl,
    boxShadow: shadow.xs,
  };

  const filtersSectionTitleStyle = {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    display: "flex",
    alignItems: "center",
    gap: spacing.sm,
  };

  const filtersGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: spacing.lg,
    marginBottom: spacing.xl,
  };

  const filterLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    display: "block",
  };

  const dividerStyle = {
    height: "1px",
    backgroundColor: colors.border,
    margin: `${spacing.xl} 0`,
  };

  const saveFilterSectionStyle = {
    backgroundColor: colors.bgSecondary,
    border: `1px solid ${colors.border}`,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  };

  const saveFilterLabelStyle = {
    ...typography.label,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    display: "block",
  };

  const saveFilterControlsStyle = {
    display: "flex",
    gap: spacing.md,
    alignItems: "flex-end",
  };

  const savedFiltersListStyle = {
    display: "flex",
    gap: spacing.sm,
    flexWrap: "wrap",
    marginTop: spacing.md,
  };

  const savedFilterButtonStyle = {
    padding: `${spacing.sm} ${spacing.md}`,
    borderRadius: radius.full,
    backgroundColor: colors.bgPrimary,
    border: `1px solid ${colors.primary}`,
    color: colors.primary,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 600,
    transition: transitions.base,
  };

  const buttonGroupStyle = {
    display: "flex",
        gap: spacing.lg,
    marginTop: spacing.xl,
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
    cursor: "pointer",
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
  };

  const [hoveredRow, setHoveredRow] = React.useState(null);

  // COMPONENT
  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <h1 style={headerTitleStyle}>Stock Screener</h1>
          <p style={headerSubtitleStyle}>
            Find stocks that match your investment criteria
          </p>
        </div>

        {/* FILTERS CARD */}
        <div style={filtersCardStyle}>
          <h2 style={filtersSectionTitleStyle}>
            <Filter size={18} />
            Filters
          </h2>

          <div style={filtersGridStyle}>
            <div>
              <label style={filterLabelStyle}>Market Cap</label>
              <Select
                options={[
                  { value: "all", label: "All" },
                  { value: "large", label: "Large Cap (>500B)" },
                  { value: "mid", label: "Mid Cap (100-500B)" },
                  { value: "small", label: "Small Cap (<100B)" },
                ]}
                value={filters.marketCap}
                onChange={(e) => handleFilterChange("marketCap", e.target.value)}
                fullWidth
              />
            </div>

            <div>
              <label style={filterLabelStyle}>Sector</label>
              <Select
                options={[
                  { value: "all", label: "All Sectors" },
                  { value: "IT", label: "IT" },
                  { value: "Banking", label: "Banking" },
                  { value: "Energy", label: "Energy" },
                  { value: "Pharma", label: "Pharma" },
                ]}
                value={filters.sector}
                onChange={(e) => handleFilterChange("sector", e.target.value)}
                fullWidth
              />
            </div>

            <div>
              <label style={filterLabelStyle}>Volume</label>
              <Select
                options={[
                  { value: "all", label: "Any Volume" },
                  { value: "high", label: "High (>20M)" },
                  { value: "medium", label: "Medium (10-20M)" },
                  { value: "low", label: "Low (<10M)" },
                ]}
                value={filters.volume}
                onChange={(e) => handleFilterChange("volume", e.target.value)}
                fullWidth
              />
            </div>

            <div>
              <label style={filterLabelStyle}>Dividend</label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: spacing.md,
                  padding: `${spacing.md} ${spacing.lg}`,
                  backgroundColor: colors.bgSecondary,
                  borderRadius: radius.md,
                  border: `1px solid ${colors.border}`,
                  height: "40px",
                }}
              >
                <input
                  type="checkbox"
                  checked={filters.dividend}
                  onChange={(e) => handleFilterChange("dividend", e.target.checked)}
                  style={{ cursor: "pointer" }}
                />
                <span style={{ fontSize: "14px", color: colors.textPrimary }}>
                  Dividend ≥ 1.5%
                </span>
              </div>
            </div>
          </div>

          {/* SEARCH BUTTONS */}
          <div style={buttonGroupStyle}>
            <Button
              variant="primary"
              onClick={handleSearchScreener}
              fullWidth
            >
              <Search size={16} />
              Run Screener
            </Button>
            <Button variant="secondary">
              <Filter size={16} />
              Reset Filters
            </Button>
          </div>
        </div>

        {/* SAVE FILTER SECTION */}
        <div style={saveFilterSectionStyle}>
          <div style={saveFilterLabelStyle}>Save This Filter</div>
          <div style={saveFilterControlsStyle}>
            <Input
              placeholder="Filter name (e.g., 'High Dividend IT Stocks')"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              size="md"
              style={{ flex: 1 }}
            />
            <Button variant="secondary" size="md" onClick={handleSaveFilter}>
              <Save size={14} />
              Save
            </Button>
          </div>

          {savedFilters.length > 0 && (
            <>
              <div style={{ marginTop: spacing.md, fontSize: "12px", fontWeight: 500, color: colors.textSecondary }}>
                SAVED FILTERS
              </div>
              <div style={savedFiltersListStyle}>
                {savedFilters.map((filter) => (
                  <button
                    key={filter.id}
                    style={savedFilterButtonStyle}
                    onClick={() => handleLoadFilter(filter)}
                  >
                    {filter.name}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* RESULTS */}
        {hasSearched ? (
          filteredResults.length > 0 ? (
            <div style={tableContainerStyle}>
              <table style={tableStyle}>
                <thead style={tableHeaderStyle}>
                  <tr>
                    <th style={tableHeaderCellStyle()}>Symbol</th>
                    <th style={tableHeaderCellStyle(true)}>Price</th>
                    <th style={tableHeaderCellStyle(true)}>Change</th>
                    <th style={tableHeaderCellStyle(true)}>Volume</th>
                    <th style={tableHeaderCellStyle(true)}>P/E Ratio</th>
                    <th style={tableHeaderCellStyle(true)}>Dividend</th>
                    <th style={tableHeaderCellStyle(true)}>Sector</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredResults.map((stock) => (
                    <tr
                      key={stock.id}
                      style={tableRowStyle(hoveredRow === stock.id)}
                      onMouseEnter={() => setHoveredRow(stock.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td style={symbolCellStyle}>{stock.symbol}</td>
                      <td style={tableCellStyle(true)}>₹{stock.price}</td>
                      <td style={tableCellStyle(true)}>
                        <Badge
                          variant={stock.change > 0 ? "success" : "error"}
                          size="sm"
                        >
                          {stock.change > 0 ? "+" : ""}
                          {stock.change}%
                        </Badge>
                      </td>
                      <td style={tableCellStyle(true)}>{stock.volume}</td>
                      <td style={tableCellStyle(true)}>{stock.pe}</td>
                      <td style={tableCellStyle(true)}>{stock.dividend}%</td>
                      <td style={tableCellStyle(true)}>
                        <Badge variant="default" size="sm">
                          {stock.sector}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={tableContainerStyle}>
              <EmptyState
                icon={Search}
                title="No results found"
                description="Try adjusting your filters to find matching stocks"
                actionLabel="Reset Filters"
                onAction={() => {
                  setFilters({
                    marketCap: "all",
                    peRatio: [0, 100],
                    dividend: false,
                    volume: "all",
                    sector: "all",
                  });
                }}
              />
            </div>
          )
        ) : (
          <div style={tableContainerStyle}>
            <EmptyState
              icon={Filter}
              title="Ready to screen"
              description="Configure your filters and click 'Run Screener' to find matching stocks"
              actionLabel="Run Screener"
              onAction={handleSearchScreener}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StockScreener;