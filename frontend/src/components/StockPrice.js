import { useStock } from "../hooks/useStock";
import { useTheme } from "../context/ThemeContext";

export const StockPrice = ({ symbol }) => {
  const { quote, loading, error } = useStock(symbol);
  const { colors } = useTheme();

  if (loading) return <div style={{ color: colors.textSecondary }}>Loading...</div>;
  if (error) return <div style={{ color: colors.danger }}>Error</div>;
  if (!quote || !quote.c) return <div>No data</div>;

  const change = quote.c - quote.pc;
  const changePercent = ((change / quote.pc) * 100).toFixed(2);
  const isPositive = change >= 0;

  return (
    <div style={{
      backgroundColor: colors.surface,
      padding: "1rem",
      borderRadius: "8px",
      border: `1px solid ${colors.border}`,
      textAlign: "center",
    }}>
      <div style={{ fontSize: "12px", color: colors.textSecondary }}>
        {symbol}
      </div>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: colors.text, margin: "0.5rem 0" }}>
        ₹{quote.c.toFixed(2)}
      </div>
      <div style={{
        fontSize: "14px",
        color: isPositive ? colors.success : colors.danger,
        fontWeight: "600",
      }}>
        {isPositive ? "+" : ""}{change.toFixed(2)} ({changePercent}%)
      </div>
    </div>
  );
};

export default StockPrice;