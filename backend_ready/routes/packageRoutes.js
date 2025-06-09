const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { purchase } = require("../controllers/packageController");

router.post("/purchase", authMiddleware, purchase);

module.exports = router;
