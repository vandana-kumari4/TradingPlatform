const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  bio: { type: String, default: "" },
  avatar: { type: String, default: "" },
  city: { type: String, default: "" },
  portfolio: {
    totalValue: { type: Number, default: 450000 },
    totalReturns: { type: Number, default: 12500 },
    returnPercentage: { type: Number, default: 2.78 },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel };