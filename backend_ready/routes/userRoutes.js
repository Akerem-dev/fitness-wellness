const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/user/register
router.post("/register", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Tüm alanları doldurun." });
        }
        // Email kontrolü
        const [users] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
        if (users.length > 0) {
            return res.status(409).json({ message: "Bu e-posta zaten kullanılıyor." });
        }
        const hashed = await bcrypt.hash(password, 10);
        const fullName = `${firstName} ${lastName}`;
        const [result] = await db.execute(
            "INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)",
            [fullName, email, hashed]
        );
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

// POST /api/user/login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email ve şifre gereklidir." });
        }
        const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "Email veya şifre yanlış." });
        }
        const user = users[0];
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Email veya şifre yanlış." });
        }
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

// GET /api/user/me
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user_id = req.user.id;
        const [users] = await db.execute("SELECT id, full_name, email FROM users WHERE id = ?", [user_id]);
        if (users.length === 0) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }
        const user = users[0];
        return res.json({
            id: user.id,
            fullName: user.full_name,
            email: user.email,
        });
    } catch (err) {
        return res.status(500).json({ message: "Profil alınamadı." });
    }
});

module.exports = router;
