// Hybrid Data Service - Use mock data when backend is not available
const API_BASE_URL = "http://localhost:4000/api";

// Mock data
const mockHoldings = [
  {
    symbol: "INFY",
    qty: 50,
    avgPrice: 1450,
    currentPrice: 1550,
    value: 77500,
    gain: 5000,
    gainPercent: 6.87,
  },
  {
    symbol: "TCS",
    qty: 30,
    avgPrice: 3500,
    currentPrice: 3400,
    value: 102000,
    gain: -3000,
    gainPercent: -2.86,
  },
];

const mockOrders = [
  { symbol: "INFY", type: "BUY", qty: 50, price: 1450, status: "completed" },
  { symbol: "TCS", type: "BUY", qty: 30, price: 3500, status: "completed" },
];

const mockPortfolio = {
  totalValue: 450000,
  totalGain: 12500,
  gainPercent: 2.86,
  holdings: 5,
};

const mockPrices = {
  INFY: { price: 1550, change: 2.5 },
  TCS: { price: 3400, change: -1.2 },
  HDFCBANK: { price: 1550, change: 3.8 },
};

// Service functions
const hybridDataService = {
  // Holdings
  async getHoldings() {
    try {
      const response = await fetch(`${API_BASE_URL}/holdings`);
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable, using mock data");
    }
    return mockHoldings;
  },

  async addHolding(holding) {
    try {
      const response = await fetch(`${API_BASE_URL}/holdings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(holding),
      });
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable");
    }
    return holding;
  },

  // Orders
  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`);
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable, using mock data");
    }
    return mockOrders;
  },

  async placeOrder(order) {
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable");
    }
    return order;
  },

  // Portfolio
  async getPortfolio() {
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio`);
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable, using mock data");
    }
    return mockPortfolio;
  },

  // Prices
  async getPrices(symbols) {
    try {
      const response = await fetch(`${API_BASE_URL}/prices?symbols=${symbols.join(",")}`);
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable, using mock data");
    }
    return mockPrices;
  },

  // Auth
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable");
    }
    return { token: "mock-token" };
  },

  async signup(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (response.ok) return response.json();
    } catch (error) {
      console.log("Backend unavailable");
    }
    return { token: "mock-token" };
  },
};

export default hybridDataService;