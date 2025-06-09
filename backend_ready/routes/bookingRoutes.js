const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { createBooking, getMyBookings } = require("../controllers/bookingController");

router.post("/", authMiddleware, createBooking);
router.get("/me", authMiddleware, getMyBookings);

module.exports = router;
