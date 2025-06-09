const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createPayment } = require("../controllers/paymentController");

// POST /api/payments
router.post("/", authMiddleware, createPayment);

module.exports = router;
