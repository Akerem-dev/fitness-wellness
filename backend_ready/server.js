// backend_ready/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("./config/db");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Tüm route'ları burada ekle!
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/profile", require("./routes/profileRoutes"));
app.use("/api/active-members", require("./routes/activeMembersRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/feedback", require("./routes/feedbackRoutes")); // DİKKAT: singular!
app.use("/api/packages", require("./routes/packageRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "A server error occurred.",
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
