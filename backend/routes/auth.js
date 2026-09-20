const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Create new user
    const newUser = new UserModel({
      name,
      email,
      password, // In production, hash this with bcrypt
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check password (in production, use bcrypt.compare)
    if (user.password !== password) {
      return res.status(400).json({ error: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        portfolio: user.portfolio,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get User Profile
router.get("/profile/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        city: user.city,
        portfolio: user.portfolio,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update User Profile
router.put("/profile/:userId", async (req, res) => {
  try {
    const { name, bio, avatar, city, phone } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      req.params.userId,
      { name, bio, avatar, city, phone, updatedAt: Date.now() },
      { new: true }
    );

    res.json({
      success: true,
      message: "Profile updated",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Leaderboard (Top 10 traders)
router.get("/leaderboard", async (req, res) => {
  try {
    const topTraders = await UserModel.find()
      .sort({ "portfolio.totalReturns": -1 })
      .limit(10)
      .select("name avatar city portfolio createdAt");

    res.json({
      success: true,
      leaderboard: topTraders,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;