const nodemailer = require("nodemailer");

// Email transporter (using Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASSWORD || "your-app-password",
  },
});

// Send order confirmation email
const sendOrderConfirmationEmail = async (userEmail, orderDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `🎉 Order Confirmed - ${orderDetails.symbol}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">✅ Order Confirmed!</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd;">
            <h2 style="color: #333;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Symbol:</td>
                <td style="padding: 10px;">${orderDetails.symbol}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Type:</td>
                <td style="padding: 10px;">${orderDetails.mode}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Quantity:</td>
                <td style="padding: 10px;">${orderDetails.qty} shares</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Price:</td>
                <td style="padding: 10px;">₹${orderDetails.price}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Total:</td>
                <td style="padding: 10px; font-weight: bold; color: #667eea;">₹${(orderDetails.qty * orderDetails.price).toLocaleString()}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666;">
              Your order has been successfully placed. You will receive updates on order execution.
            </p>
          </div>
          <div style="padding: 20px; background: #f0f0f0; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #666; margin: 0;">MarketMastery Trading Platform</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent to:", userEmail);
  } catch (error) {
    console.log("Email error:", error.message);
  }
};

// Send price alert email
const sendPriceAlertEmail = async (userEmail, alertDetails) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `📈 Price Alert - ${alertDetails.symbol}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">🚨 Price Alert</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd;">
            <h2 style="color: #333;">Alert Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Stock:</td>
                <td style="padding: 10px;">${alertDetails.symbol}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Current Price:</td>
                <td style="padding: 10px;">₹${alertDetails.currentPrice}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Target Price:</td>
                <td style="padding: 10px;">₹${alertDetails.targetPrice}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Change:</td>
                <td style="padding: 10px; color: ${alertDetails.change > 0 ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                  ${alertDetails.change > 0 ? '+' : ''}${alertDetails.change}%
                </td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666;">
              ${alertDetails.symbol} has ${alertDetails.change > 0 ? 'risen' : 'fallen'} to your target price. 
              Consider taking action on your position.
            </p>
          </div>
          <div style="padding: 20px; background: #f0f0f0; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #666; margin: 0;">MarketMastery Trading Platform</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Price alert email sent to:", userEmail);
  } catch (error) {
    console.log("Email error:", error.message);
  }
};

// Send daily market summary
const sendDailyMarketSummary = async (userEmail, summary) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `📊 Daily Market Summary`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">📊 Daily Market Summary</h1>
          </div>
          <div style="padding: 20px; background: #f9f9f9; border: 1px solid #ddd;">
            <h2 style="color: #333;">Today's Performance</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Portfolio Value:</td>
                <td style="padding: 10px;">₹${summary.portfolioValue.toLocaleString()}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 10px; font-weight: bold;">Daily Gain/Loss:</td>
                <td style="padding: 10px; color: ${summary.dailyChange > 0 ? '#27ae60' : '#e74c3c'}; font-weight: bold;">
                  ${summary.dailyChange > 0 ? '+' : ''}₹${summary.dailyChange.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold;">Best Performer:</td>
                <td style="padding: 10px;">${summary.bestStock} (${summary.bestChange}%)</td>
              </tr>
            </table>
            <p style="margin-top: 20px; color: #666;">
              Have a great trading day!
            </p>
          </div>
          <div style="padding: 20px; background: #f0f0f0; text-align: center; border-radius: 0 0 8px 8px;">
            <p style="color: #666; margin: 0;">MarketMastery Trading Platform</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Daily summary email sent to:", userEmail);
  } catch (error) {
    console.log("Email error:", error.message);
  }
};

module.exports = {
  sendOrderConfirmationEmail,
  sendPriceAlertEmail,
  sendDailyMarketSummary,
};