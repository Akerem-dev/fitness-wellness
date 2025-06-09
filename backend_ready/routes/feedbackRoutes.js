// backend_ready/routes/feedbackRoutes.js
const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackController");

// Tüm review'ları getir
router.get("/", feedbackController.getAll);

// Yeni review oluştur
router.post("/", feedbackController.create);

module.exports = router;
