const mongoose = require("mongoose");
const { OrdersModel } = require("./model/OrdersModel");
require("dotenv").config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");

    await OrdersModel.deleteMany({});

    const testOrders = [
      { symbol: "INFY", type: "BUY", quantity: 50, price: 1450, status: "Completed", createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
      { symbol: "TCS", type: "BUY", quantity: 30, price: 3400, status: "Completed", createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000) },
      { symbol: "RELIANCE", type: "SELL", quantity: 20, price: 2100, status: "Pending", createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000) },
      { symbol: "WIPRO", type: "BUY", quantity: 40, price: 450, status: "Completed", createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
      { symbol: "HDFCBANK", type: "SELL", quantity: 25, price: 1550, status: "Cancelled", createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) },
    ];

    await OrdersModel.insertMany(testOrders);
    console.log("Orders seeded!");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
};

seedOrders();