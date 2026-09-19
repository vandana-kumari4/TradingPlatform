import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import { hybridOrdersAPI, hybridHoldingsAPI, hybridPositionsAPI } from "./services/hybridDataService";
import { PortfolioAnalytics } from "./components/PortfolioAnalytics";
import { Watchlist } from "./components/WatchList";
import { StockSearch } from "./components/StockSearch";
import { StockScreener } from "./components/StockScreener";
import { BenchmarkComparison } from "./components/BenchmarkComparison";
import { AITradingAssistant } from "./components/AITradingAssistant";
import { RealTimePrices } from "./components/RealTimePrices";
import { TechnicalIndicators } from "./components/TechnicalIndicators";
import { AdvancedOrders } from "./components/AdvancedOrders";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function Home() {
  const { colors } = useTheme();
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "calc(100vh - 64px)" }}>
      <div style={{
        padding: "4rem 2rem",
        textAlign: "center",
        background: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}10 100%)`,
      }}>
        <h1 style={{ fontSize: "48px", fontWeight: "bold", marginBottom: "1rem", color: colors.text }}>
          💰 MarketMastery
        </h1>
        <p style={{ fontSize: "18px", color: colors.textSecondary, marginBottom: "2rem" }}>
          Professional stock trading platform
        </p>
        <button
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: colors.primary,
            color: "white",
            padding: "1rem 2rem",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function Login() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("authToken", "token_" + Date.now());
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)",
      backgroundColor: colors.background,
    }}>
      <div style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "2rem",
        width: "100%",
        maxWidth: "400px",
      }}>
        <h2 style={{ marginBottom: "2rem", color: colors.text }}>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor: colors.background,
              color: colors.text,
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor: colors.background,
              color: colors.text,
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Login
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem", color: colors.textSecondary }}>
          No account? <span style={{ color: colors.primary, cursor: "pointer", fontWeight: "600" }} onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

function Signup() {
  const { colors } = useTheme();
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();
    if (email && password && confirmPassword && password === confirmPassword) {
      localStorage.setItem("authToken", "token_" + Date.now());
      setIsAuthenticated(true);
      navigate("/dashboard");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "calc(100vh - 64px)",
      backgroundColor: colors.background,
    }}>
      <div style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "12px",
        padding: "2rem",
        width: "100%",
        maxWidth: "400px",
      }}>
        <h2 style={{ marginBottom: "2rem", color: colors.text }}>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor: colors.background,
              color: colors.text,
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor: colors.background,
              color: colors.text,
              boxSizing: "border-box",
            }}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem",
              marginBottom: "1rem",
              border: `1px solid ${colors.border}`,
              borderRadius: "6px",
              backgroundColor: colors.background,
              color: colors.text,
              boxSizing: "border-box",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Sign Up
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem", color: colors.textSecondary }}>
          Have account? <span style={{ color: colors.primary, cursor: "pointer", fontWeight: "600" }} onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

function Holdings() {
  const { colors } = useTheme();
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    hybridHoldingsAPI.getAll().then((data) => {
      if (data.success) setHoldings(data.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "1rem" };
  const cellStyle = { padding: "1rem", textAlign: "left", borderBottom: `1px solid ${colors.border}` };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "calc(100vh - 64px)", padding: "2rem" }}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Holdings</h1>
      <div style={{ backgroundColor: colors.surface, borderRadius: "12px", border: `1px solid ${colors.border}`, overflow: "auto" }}>
        <table style={tableStyle}>
          <thead style={{ backgroundColor: colors.surfaceLight }}>
            <tr>
              <th style={cellStyle}>Stock</th>
              <th style={cellStyle}>Qty</th>
              <th style={cellStyle}>Avg</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((h) => (
              <tr key={h._id}>
                <td style={cellStyle}><strong>{h.name}</strong></td>
                <td style={cellStyle}>{h.qty}</td>
                <td style={cellStyle}>₹{h.avg}</td>
                <td style={cellStyle}>₹{h.price}</td>
                <td style={{ ...cellStyle, color: (h.price - h.avg) >= 0 ? colors.success : colors.danger }}>
                  {(h.price - h.avg) >= 0 ? "+" : ""}₹{(h.price - h.avg).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Orders() {
  const { colors } = useTheme();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    hybridOrdersAPI.getAll().then((data) => {
      if (data.success) setOrders(data.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "1rem" };
  const cellStyle = { padding: "1rem", textAlign: "left", borderBottom: `1px solid ${colors.border}` };

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "calc(100vh - 64px)", padding: "2rem" }}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Orders</h1>
      <div style={{ backgroundColor: colors.surface, borderRadius: "12px", border: `1px solid ${colors.border}`, overflow: "auto" }}>
        <table style={tableStyle}>
          <thead style={{ backgroundColor: colors.surfaceLight }}>
            <tr>
              <th style={cellStyle}>Stock</th>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Qty</th>
              <th style={cellStyle}>Price</th>
              <th style={cellStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td style={cellStyle}><strong>{o.name}</strong></td>
                <td style={{ ...cellStyle, color: o.mode === "BUY" ? colors.success : colors.danger }}>{o.mode}</td>
                <td style={cellStyle}>{o.qty}</td>
                <td style={cellStyle}>₹{o.price}</td>
                <td style={cellStyle}>
                  <span style={{ backgroundColor: o.status === "COMPLETED" ? colors.success : colors.warning, color: "white", padding: "0.25rem 0.75rem", borderRadius: "4px" }}>
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Positions() {
  const { colors } = useTheme();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    hybridPositionsAPI.getAll().then((data) => {
      if (data.success) setPositions(data.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;

  return (
    <div style={{ backgroundColor: colors.background, minHeight: "calc(100vh - 64px)", padding: "2rem" }}>
      <h1 style={{ color: colors.text, marginBottom: "2rem" }}>Positions</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
        {positions.map((p) => (
          <div key={p._id} style={{ backgroundColor: colors.surface, border: `1px solid ${colors.border}`, borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ color: colors.text, marginBottom: "1rem" }}>{p.name}</h3>
            <div style={{ color: colors.textSecondary, marginBottom: "0.5rem" }}>Product: <strong>{p.product}</strong></div>
            <div style={{ color: colors.text, marginBottom: "1rem" }}>
              <div>Qty: {p.qty}</div>
              <div>Avg: ₹{p.avg}</div>
              <div>Price: ₹{p.price}</div>
            </div>
            <div style={{ color: p.isLoss ? colors.danger : colors.success, fontWeight: "600" }}>
              {p.net} ({p.day})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const AppContent = () => {
  const { colors } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  return (
    <div style={{ backgroundColor: colors.background, color: colors.text, minHeight: "100vh" }}>
      <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/holdings" element={<ProtectedRoute><Holdings /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/positions" element={<ProtectedRoute><Positions /></ProtectedRoute>} />
        <Route path="/watchlist" element={<ProtectedRoute><Watchlist /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><StockSearch /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><PortfolioAnalytics /></ProtectedRoute>} />
              <Route
          path="/screener"
          element={
            <ProtectedRoute>
              <StockScreener />
            </ProtectedRoute>
          }
        />
              <Route
          path="/benchmark"
          element={
            <ProtectedRoute>
              <BenchmarkComparison />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <AITradingAssistant />
            </ProtectedRoute>
          }
        />
        <Route
  path="/prices"
  element={
    <ProtectedRoute>
      <RealTimePrices />
    </ProtectedRoute>
  }
/>
<Route
  path="/indicators"
  element={
    <ProtectedRoute>
      <TechnicalIndicators />
    </ProtectedRoute>
  }
/>
<Route
  path="/advanced-orders"
  element={
    <ProtectedRoute>
      <AdvancedOrders />
    </ProtectedRoute>
  }
/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
} 