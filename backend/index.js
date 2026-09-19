require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const chatRouter = require("./routes/chat");

const PORT = process.env.PORT || 4000;
const uri = process.env.MONGO_URL;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(bodyParser.json());

// Stock prices for real-time updates
const stockPrices = {
  INFY: 1550,
  TCS: 3400,
  HDFCBANK: 1550,
  WIPRO: 450,
  RELIANCE: 2100,
  SBIN: 580,
  BAJAJ: 8500,
  MARUTI: 9800,
};

// WebSocket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send current prices
  socket.emit("initialPrices", stockPrices);

  // Simulate real-time price updates
  const priceUpdate = setInterval(() => {
    const updatedPrices = {};
    Object.keys(stockPrices).forEach((stock) => {
      const change = (Math.random() - 0.5) * 50;
      updatedPrices[stock] = Math.max(stockPrices[stock] + change, 100);
    });
    socket.emit("priceUpdate", updatedPrices);
  }, 3000); // Update every 3 seconds

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    clearInterval(priceUpdate);
  });
});

app.get("/allHoldings", async (req, res) => {
  try {
    let allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    let allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.json({ success: true, message: "Order saved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Chat API Route
app.use("/api/chat", chatRouter);

server.listen(PORT, () => {
  console.log(`App started on port ${PORT}!`);
  mongoose.connect(uri).catch((err) => {
    console.log("MongoDB connection error (non-critical):", err.message);
  });
});