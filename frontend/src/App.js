import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import NavbarV2 from "./components/NavbarV2";
import SidebarV2 from "./components/SidebarV2";
import DashboardV2Professional from "./components/Dashboard/DashboardV2Professional";
import HoldingsV2 from "./components/HoldingsV2";
import ScreenerV2 from "./components/ScreenerV2";
import AnalyticsV2 from "./components/AnalyticsV2";
import NotificationsV2 from "./components/NotificationsV2";
import ProfileV2 from "./components/ProfileV2";
import OrdersV2 from "./components/OrdersV2";
import designSystemV2 from "./styles/designSystemV2";
import WatchList from "./components/WatchList";
import { StockSearch } from "./components/StockSearch";
import { BenchmarkComparison } from "./components/BenchmarkComparison";
import { AITradingAssistant } from "./components/AITradingAssistant";
import { RealTimePrices } from "./components/RealTimePrices";
import { TechnicalIndicators } from "./components/TechnicalIndicators";
import { AdvancedOrders } from "./components/AdvancedOrders";
import { Leaderboard } from "./components/Leaderboard";
import { PaperTrading } from "./components/PaperTrading";
import { AIRecommendations } from "./components/AIRecommendations";
import { MultiAgentTrading } from "./components/MultiAgentTrading";
import './styles/globals.css';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function Home() {
  const { colors, spacing, typography } = designSystemV2;
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: colors.bg,
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: spacing.xl,
      width: "100%",
    }}>
      <div style={{
        textAlign: "center",
        maxWidth: "600px",
        width: "100%",
      }}>
        <h1 style={{
          ...typography.h1,
          color: colors.textPrimary,
          marginBottom: spacing.lg,
          fontSize: "48px",
        }}>
          MarketMastery
        </h1>
        <p style={{
          ...typography.bodyLarge,
          color: colors.textSecondary,
          marginBottom: spacing["2xl"],
          fontSize: "18px",
        }}>
          Professional stock trading platform
        </p>
        <button
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: colors.primary,
            color: "white",
            padding: `${spacing.md} ${spacing.xl}`,
            border: "none",
            borderRadius: "8px",
            ...typography.body,
            fontWeight: 600,
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function Login() {
  const { colors, spacing, typography, radius } = designSystemV2;
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: colors.bg,
    }}>
      <div style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: spacing.xl,
        width: "100%",
        maxWidth: "400px",
      }}>
        <h2 style={{ ...typography.h2, marginBottom: spacing.xl, color: colors.textPrimary }}>Login</h2>
        {error && <div style={{ color: colors.error, marginBottom: spacing.lg, fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{ ...typography.label, color: colors.textSecondary, display: "block", marginBottom: spacing.sm }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                backgroundColor: colors.surface,
                color: colors.textPrimary,
                boxSizing: "border-box",
                fontFamily: typography.fontFamily,
              }}
            />
          </div>
          <div style={{ marginBottom: spacing.xl }}>
            <label style={{ ...typography.label, color: colors.textSecondary, display: "block", marginBottom: spacing.sm }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                backgroundColor: colors.surface,
                color: colors.textPrimary,
                boxSizing: "border-box",
                fontFamily: typography.fontFamily,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: spacing.md,
              backgroundColor: loading ? colors.textTertiary : colors.primary,
              color: "white",
              border: "none",
              borderRadius: radius.md,
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontFamily: typography.fontFamily,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: spacing.lg, ...typography.body, color: colors.textSecondary }}>
          No account? <span style={{ color: colors.primary, cursor: "pointer", fontWeight: 600 }} onClick={() => navigate("/signup")}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

function Signup() {
  const { colors, spacing, typography, radius } = designSystemV2;
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
        navigate("/dashboard");
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      setError("Server error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: colors.bg,
    }}>
      <div style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: radius.lg,
        padding: spacing.xl,
        width: "100%",
        maxWidth: "400px",
      }}>
        <h2 style={{ ...typography.h2, marginBottom: spacing.xl, color: colors.textPrimary }}>Create Account</h2>
        {error && <div style={{ color: colors.error, marginBottom: spacing.lg, fontSize: "14px" }}>{error}</div>}
        <form onSubmit={handleSignup}>
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{ ...typography.label, color: colors.textSecondary, display: "block", marginBottom: spacing.sm }}>
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                backgroundColor: colors.surface,
                color: colors.textPrimary,
                boxSizing: "border-box",
                fontFamily: typography.fontFamily,
              }}
            />
          </div>
          <div style={{ marginBottom: spacing.lg }}>
            <label style={{ ...typography.label, color: colors.textSecondary, display: "block", marginBottom: spacing.sm }}>
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                backgroundColor: colors.surface,
                color: colors.textPrimary,
                boxSizing: "border-box",
                fontFamily: typography.fontFamily,
              }}
            />
          </div>
          <div style={{ marginBottom: spacing.xl }}>
            <label style={{ ...typography.label, color: colors.textSecondary, display: "block", marginBottom: spacing.sm }}>
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
              style={{
                width: "100%",
                padding: spacing.md,
                border: `1px solid ${colors.border}`,
                borderRadius: radius.md,
                backgroundColor: colors.surface,
                color: colors.textPrimary,
                boxSizing: "border-box",
                fontFamily: typography.fontFamily,
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: spacing.md,
              backgroundColor: loading ? colors.textTertiary : colors.primary,
              color: "white",
              border: "none",
              borderRadius: radius.md,
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: 600,
              fontFamily: typography.fontFamily,
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: spacing.lg, ...typography.body, color: colors.textSecondary }}>
          Have account? <span style={{ color: colors.primary, cursor: "pointer", fontWeight: 600 }} onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

const AppContent = () => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isAuthPage = location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {isAuthenticated && !isAuthPage && (
        <NavbarV2
          isAuthenticated={isAuthenticated}
          onLogout={logout}
          isDarkMode={isDark}
          onToggleDarkMode={toggleTheme}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />
      )}

      <div style={{
        display: "flex",
        flex: 1,
        width: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#F7F8FA",
      }}>
        {isAuthenticated && !isAuthPage && (
          <SidebarV2 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            className={sidebarOpen ? "sidebar-open" : ""}
          />
        )}

        <main style={{
          flex: 1,
          width: "100%",
          overflow: "auto",
          position: "relative",
          zIndex: 1,
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardV2Professional /></ProtectedRoute>} />
            <Route path="/holdings" element={<ProtectedRoute><HoldingsV2 /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrdersV2 /></ProtectedRoute>} />
            <Route path="/positions" element={<ProtectedRoute><PaperTrading /></ProtectedRoute>} />
            <Route path="/watchlist" element={<ProtectedRoute><WatchList /></ProtectedRoute>} />
            <Route path="/search" element={<ProtectedRoute><StockSearch /></ProtectedRoute>} />
            <Route path="/analytics" element={<ProtectedRoute><AnalyticsV2 /></ProtectedRoute>} />
            <Route path="/screener" element={<ProtectedRoute><ScreenerV2 /></ProtectedRoute>} />
            <Route path="/benchmark" element={<ProtectedRoute><BenchmarkComparison /></ProtectedRoute>} />
            <Route path="/ai-assistant" element={<ProtectedRoute><AITradingAssistant /></ProtectedRoute>} />
            <Route path="/prices" element={<ProtectedRoute><RealTimePrices /></ProtectedRoute>} />
            <Route path="/indicators" element={<ProtectedRoute><TechnicalIndicators /></ProtectedRoute>} />
            <Route path="/advanced-orders" element={<ProtectedRoute><AdvancedOrders /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfileV2 /></ProtectedRoute>} />
            <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><NotificationsV2 /></ProtectedRoute>} />
            <Route path="/paper-trading" element={<ProtectedRoute><PaperTrading /></ProtectedRoute>} />
            <Route path="/ai-recommendations" element={<ProtectedRoute><AIRecommendations /></ProtectedRoute>} />
            <Route path="/multi-agent-trading" element={<ProtectedRoute><MultiAgentTrading /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
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