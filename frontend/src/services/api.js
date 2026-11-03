const API_BASE_URL = (process.env.react_app_api_url || "http://localhost:4000") + "/api";

// Auth APIs
export const authAPI = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  signup: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Holdings APIs
export const holdingsAPI = {
  getAll: async (token) => {
    const response = await fetch((process.env.react_app_api_url || "http://localhost:4000") + "/allHoldings", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Orders APIs
export const ordersAPI = {
  getAll: async (token) => {
    const response = await fetch((process.env.react_app_api_url || "http://localhost:4000") + "/allOrders", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },

  create: async (orderData, token) => {
    const response = await fetch((process.env.react_app_api_url || "http://localhost:4000") + "/newOrder", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    return response.json();
  },
};

// Positions APIs
export const positionsAPI = {
  getAll: async (token) => {
    const response = await fetch((process.env.react_app_api_url || "http://localhost:4000") + "/allPositions", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Notifications APIs
export const notificationsAPI = {
  getAll: async (token) => {
    const response = await fetch(`${API_BASE_URL}/notifications`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};

// Paper Trading APIs
export const paperTradingAPI = {
  getPortfolio: async (token) => {
    const response = await fetch(`${API_BASE_URL}/paper-trading/portfolio`, {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};