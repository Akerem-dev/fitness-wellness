// backend_ready/routes/userRoutes.js

const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @route   POST /api/users/register
 * @desc    Yeni kullanıcı kaydı
 * @access  Public
 */
router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Tüm alanları doldurun." });
    }

    // Email kontrolü
    const [existing] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Bu e-posta zaten kullanılıyor." });
    }

    // Şifre hash'leme
    const hashed = await bcrypt.hash(password, 10);
    const fullName = `${firstName} ${lastName}`;

    // Veritabanına ekle
    const [result] = await db.execute(
      "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
      [fullName, email, hashed]
    );

    // JWT token oluştur
    const token = jwt.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(201).json({
      fullName,
      email,
      token,
    });
  } catch (err) {
    console.error("❌ [userRoutes.register] Hata:", err);
    return res.status(500).json({ message: "Kayıt sırasında hata oluştu." });
  }
});

/**
 * @route   POST /api/users/login
 * @desc    Kullanıcı girişi
 * @access  Public
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email ve şifre gereklidir." });
    }

    // Kullanıcı var mı?
    const [users] = await db.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (users.length === 0) {
      return res.status(401).json({ message: "Email veya şifre yanlış." });
    }

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Email veya şifre yanlış." });
    }

    // Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      fullName: user.full_name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("❌ [userRoutes.login] Hata:", err);
    return res.status(500).json({ message: "Giriş sırasında hata oluştu." });
  }
});

/**
 * @route   GET /api/users/me
 * @desc    Mevcut kullanıcı profili
 * @access  Private (token)
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT id, full_name, email FROM users WHERE id = ?",
      [userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }
    const { id, full_name, email } = rows[0];
    return res.json({
      id,
      fullName: full_name,
      email,
    });
  } catch (err) {
    console.error("❌ [userRoutes.me] Hata:", err);
    return res.status(500).json({ message: "Profil alınamadı." });
  }
});

/**
 * @route   GET /api/users
 * @desc    Tüm kullanıcıları listele
 * @access  Public/Admin
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, full_name, email, created_at FROM users ORDER BY created_at DESC"
    );
    return res.json(rows);
  } catch (err) {
    console.error("❌ [userRoutes.getAll] Hata:", err);
    return res.status(500).json({ message: "Kullanıcılar yüklenemedi." });
  }
});

/**
 * @route   GET /api/users/all
 * @desc    Aynı işlev için alias
 * @access  Public/Admin
 */
router.get("/all", async (req, res) => {
  // Tekrar yazmaya gerek yok, yukarıdakini çağırabiliriz:
  return router.handle(req, res);
});

module.exports = router;
