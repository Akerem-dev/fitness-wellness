const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getProfile, updateProfile } = require("../controllers/profileController");

// Kendi profilini getir
router.get("/me", authMiddleware, getProfile);

// Profil oluştur/güncelle
router.post("/update", authMiddleware, updateProfile);

module.exports = router;
