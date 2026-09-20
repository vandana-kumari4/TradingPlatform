const express = require("express");
const {
  sendOrderConfirmationEmail,
  sendPriceAlertEmail,
  sendDailyMarketSummary,
} = require("../services/emailService");

const router = express.Router();

// Send order confirmation
router.post("/send-order-confirmation", async (req, res) => {
  try {
    const { userEmail, orderDetails } = req.body;

    await sendOrderConfirmationEmail(userEmail, orderDetails);

    res.json({
      success: true,
      message: "Order confirmation email sent",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send price alert
router.post("/send-price-alert", async (req, res) => {
  try {
    const { userEmail, alertDetails } = req.body;

    await sendPriceAlertEmail(userEmail, alertDetails);

    res.json({
      success: true,
      message: "Price alert email sent",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Send daily market summary
router.post("/send-daily-summary", async (req, res) => {
  try {
    const { userEmail, summary } = req.body;

    await sendDailyMarketSummary(userEmail, summary);

    res.json({
      success: true,
      message: "Daily summary email sent",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create price alert (store in database)
router.post("/create-alert", async (req, res) => {
  try {
    const { userId, symbol, targetPrice, condition } = req.body;

    // Mock alert creation
    res.json({
      success: true,
      message: "Price alert created",
      alert: {
        id: Math.random(),
        symbol,
        targetPrice,
        condition, // "above" or "below"
        createdAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;