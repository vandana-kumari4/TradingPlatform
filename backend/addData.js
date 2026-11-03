const mongoose = require("mongoose");
const { HoldingsModel } = require("./model/HoldingsModel");
require("dotenv").config();

const addData = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  
  await HoldingsModel.deleteMany({});
  
  await HoldingsModel.create([
    { symbol: "INFY", quantity: 50, buyPrice: 1450, currentPrice: 1550 },
    { symbol: "TCS", quantity: 30, buyPrice: 3500, currentPrice: 3400 },
    { symbol: "HDFCBANK", quantity: 25, buyPrice: 1620, currentPrice: 1550 },
    { symbol: "WIPRO", quantity: 40, buyPrice: 430, currentPrice: 450 },
    { symbol: "RELIANCE", quantity: 20, buyPrice: 2050, currentPrice: 2100 },
  ]);
  
  console.log("Data added!");
  mongoose.connection.close();
};

addData();