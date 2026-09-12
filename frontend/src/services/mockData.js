export const MOCK_HOLDINGS = [
  {
    _id: "1",
    name: "INFY",
    qty: 10,
    avg: 1400,
    price: 1550,
    net: "+10.71%",
    day: "+2.5%",
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "TCS",
    qty: 5,
    avg: 3200,
    price: 3400,
    net: "+6.25%",
    day: "+1.2%",
    createdAt: new Date(),
  },
  {
    _id: "3",
    name: "HDFCBANK",
    qty: 15,
    avg: 1500,
    price: 1550,
    net: "+3.33%",
    day: "-0.5%",
    createdAt: new Date(),
  },
];

export const MOCK_ORDERS = [
  {
    _id: "1",
    name: "WIPRO",
    qty: 20,
    price: 450,
    mode: "BUY",
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 86400000),
  },
  {
    _id: "2",
    name: "RELIANCE",
    qty: 5,
    price: 2100,
    mode: "BUY",
    status: "COMPLETED",
    createdAt: new Date(Date.now() - 172800000),
  },
  {
    _id: "3",
    name: "INFY",
    qty: 10,
    price: 1500,
    mode: "SELL",
    status: "PENDING",
    createdAt: new Date(),
  },
];

export const MOCK_POSITIONS = [
  {
    _id: "1",
    name: "SBIN",
    product: "MIS",
    qty: 50,
    avg: 430,
    price: 450,
    net: "+4.65%",
    day: "+1.2%",
    isLoss: false,
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "MARUTI",
    product: "CNC",
    qty: 8,
    avg: 10000,
    price: 9800,
    net: "-2.0%",
    day: "-0.8%",
    isLoss: true,
    createdAt: new Date(),
  },
];

export const mockAPI = {
  holdings: {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: MOCK_HOLDINGS,
            count: MOCK_HOLDINGS.length,
          });
        }, 500);
      });
    },
  },

  orders: {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: MOCK_ORDERS,
            count: MOCK_ORDERS.length,
          });
        }, 500);
      });
    },
  },

  positions: {
    getAll: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            data: MOCK_POSITIONS,
            count: MOCK_POSITIONS.length,
          });
        }, 500);
      });
    },
  },
};

export default mockAPI;