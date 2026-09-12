import { mockAPI } from "./mockData";

const USE_REAL_API = false;

export const hybridHoldingsAPI = {
  getAll: async () => {
    return await mockAPI.holdings.getAll();
  },

  add: async (holding) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Holding added",
          data: { ...holding, _id: Date.now().toString() },
        });
      }, 500);
    });
  },
};

export const hybridOrdersAPI = {
  getAll: async () => {
    return await mockAPI.orders.getAll();
  },

  place: async (order) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Order placed",
          data: { ...order, _id: Date.now().toString(), status: "PENDING" },
        });
      }, 800);
    });
  },
};

export const hybridPositionsAPI = {
  getAll: async () => {
    return await mockAPI.positions.getAll();
  },
};

export const hybridStockAPI = {
  getStockQuote: async (symbol) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          c: 1500,
          h: 1520,
          l: 1480,
          o: 1490,
          pc: 1460,
          t: Math.floor(Date.now() / 1000),
        });
      }, 300);
    });
  },
};

export default {
  hybridStockAPI,
  hybridHoldingsAPI,
  hybridOrdersAPI,
  hybridPositionsAPI,
};