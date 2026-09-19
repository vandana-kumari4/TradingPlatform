import React, { useState, useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

const STOCKS_DATA = [
  { id: 1, symbol: "INFY", price: 1550, pe: 22.5, volume: 2500000, marketCap: 650000, sector: "IT" },
  { id: 2, symbol: "TCS", price: 3400, pe: 18.2, volume: 1200000, marketCap: 1200000, sector: "IT" },
  { id: 3, symbol: "HDFCBANK", price: 1550, pe: 25.3, volume: 3200000, marketCap: 850000, sector: "Banking" },
  { id: 4, symbol: "WIPRO", price: 450, pe: 16.8, volume: 1800000, marketCap: 180000, sector: "IT" },
  { id: 5, symbol: "RELIANCE", price: 2100, pe: 20.1, volume: 2800000, marketCap: 1400000, sector: "Energy" },
  { id: 6, symbol: "BAJAJ", price: 8500, pe: 24.6, volume: 900000, marketCap: 425000, sector: "Auto" },
  { id: 7, symbol: "MARUTI", price: 9800, pe: 19.2, volume: 850000, marketCap: 400000, sector: "Auto" },
  { id: 8, symbol: "SBIN", price: 580, pe: 12.5, volume: 4500000, marketCap: 720000, sector: "Banking" },
  { id: 9, symbol: "HDFC", price: 2750, pe: 28.1, volume: 1100000, marketCap: 550000, sector: "Finance" },
  { id: 10, symbol: "KOTAKBANK", price: 4800, pe: 26.7, volume: 950000, marketCap: 600000, sector: "Banking" },
];

export const StockScreener = () => {
  const { colors } = useTheme();
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    minPE: 0,
    maxPE: 50,
    minVolume: 0,
    minMarketCap: 0,
    sector: "All",
  });
  const [savedFilters, setSavedFilters] = useState([]);
  const [filterName, setFilterName] = useState("");

  const filteredStocks = useMemo(() => {
    return STOCKS_DATA.filter((stock) => {
      return (
        stock.price >= filters.minPrice &&
        stock.price <= filters.maxPrice &&
        stock.pe >= filters.minPE &&
        stock.pe <= filters.maxPE &&
        stock.volume >= filters.minVolume &&
        stock.marketCap >= filters.minMarketCap &&
        (filters.sector === "All" || stock.sector === filters.sector)
      );
    });
  }, [filters]);

  const saveFilter = () => {
    if (filterName.trim()) {
      setSavedFilters([...savedFilters, { name: filterName, filters }]);
      setFilterName("");
    }
  };

  const loadFilter = (savedFilter) => {
    setFilters(savedFilter.filters);
  };

  const deleteFilter = (index) => {
    setSavedFilters(savedFilters.filter((_, i) => i !== index));
  };

  const containerStyle = {
    backgroundColor: colors.background,
    minHeight: "100vh",
    padding: "2rem",
  };

  const cardStyle = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
  };

  const filterGroupStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    display: "block",
    color: colors.textSecondary,
    fontSize: "12px",
    marginBottom: "0.5rem",
    fontWeight: "600",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.background,
    color: colors.text,
    boxSizing: "border-box",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: colors.primary,
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "1rem",
  };

  const cellStyle = {
    padding: "1rem",
    textAlign: "left",
    borderBottom: `1px solid ${colors.border}`,
  };

  const savedFilterButtonStyle = {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.surfaceLight,
    color: colors.text,
    cursor: "pointer",
    fontWeight: "600",
    marginRight: "0.5rem",
    marginBottom: "0.5rem",
  };

  const deleteButtonStyle = {
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: colors.danger,
    color: "white",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
    marginLeft: "0.5rem",
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Advanced Stock Screener</h1>

      {/* Filters */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1.5rem" }}>Filters</h2>
        
        <div style={filterGroupStyle}>
          <div>
            <label style={labelStyle}>Price Range</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: parseFloat(e.target.value) })}
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: parseFloat(e.target.value) })}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>P/E Ratio</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="number"
                placeholder="Min"
                value={filters.minPE}
                onChange={(e) => setFilters({ ...filters, minPE: parseFloat(e.target.value) })}
                style={inputStyle}
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPE}
                onChange={(e) => setFilters({ ...filters, maxPE: parseFloat(e.target.value) })}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Min Volume</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minVolume}
              onChange={(e) => setFilters({ ...filters, minVolume: parseFloat(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Min Market Cap</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minMarketCap}
              onChange={(e) => setFilters({ ...filters, minMarketCap: parseFloat(e.target.value) })}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Sector</label>
            <select
              value={filters.sector}
              onChange={(e) => setFilters({ ...filters, sector: e.target.value })}
              style={inputStyle}
            >
              <option>All</option>
              <option>IT</option>
              <option>Banking</option>
              <option>Energy</option>
              <option>Auto</option>
              <option>Finance</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Filter */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Save Filter</h2>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Filter name (e.g., Low PE Stocks)"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button onClick={saveFilter} style={buttonStyle}>
            Save Filter
          </button>
        </div>
      </div>

      {/* Saved Filters */}
      {savedFilters.length > 0 && (
        <div style={cardStyle}>
          <h2 style={{ color: colors.text, marginBottom: "1rem" }}>Saved Filters</h2>
          <div>
            {savedFilters.map((f, idx) => (
              <div key={idx} style={{ marginBottom: "0.5rem" }}>
                <button
                  onClick={() => loadFilter(f)}
                  style={savedFilterButtonStyle}
                >
                  {f.name}
                </button>
                <button
                  onClick={() => deleteFilter(idx)}
                  style={deleteButtonStyle}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div style={cardStyle}>
        <h2 style={{ color: colors.text, marginBottom: "1rem" }}>
          Results ({filteredStocks.length} stocks)
        </h2>
        {filteredStocks.length > 0 ? (
          <div style={{ overflowX: "auto" }}>
            <table style={tableStyle}>
              <thead style={{ backgroundColor: colors.surfaceLight }}>
                <tr>
                  <th style={cellStyle}>Symbol</th>
                  <th style={cellStyle}>Price</th>
                  <th style={cellStyle}>P/E</th>
                  <th style={cellStyle}>Volume</th>
                  <th style={cellStyle}>Market Cap</th>
                  <th style={cellStyle}>Sector</th>
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stock) => (
                  <tr key={stock.id}>
                    <td style={{ ...cellStyle, fontWeight: "600" }}>{stock.symbol}</td>
                    <td style={cellStyle}>₹{stock.price.toLocaleString()}</td>
                    <td style={cellStyle}>{stock.pe}</td>
                    <td style={cellStyle}>{(stock.volume / 1000000).toFixed(2)}M</td>
                    <td style={cellStyle}>₹{(stock.marketCap / 100000).toFixed(1)}L</td>
                    <td style={cellStyle}>{stock.sector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ color: colors.textSecondary, padding: "2rem", textAlign: "center" }}>
            No stocks match your filters
          </div>
        )}
      </div>
    </div>
  );
};

export default StockScreener;