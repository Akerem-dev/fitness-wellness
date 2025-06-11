
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, full_name, email FROM users");
    return res.json({ success: true, users: rows });
  } catch (err) {
    console.error("❌ [getAllUsers] Hata:", err);
    return res.status(500).json({ success: false, message: "Kullanıcılar alınamadı." });
  }
};


exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ success: false, message: "Lütfen tüm alanları doldurun." });
    }
   
    const [users] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);
    if (users.length > 0) {
      return res.status(409).json({ success: false, message: "Bu e-posta zaten kayıtlı." });
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
      success: true,
      id: result.insertId,
      fullName,
      email,
      token,
    });
  } catch (err) {
    console.error("❌ [signup] Hata:", err);
    return res.status(500).json({ success: false, message: "Kayıt sırasında hata oluştu." });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email ve şifre girin." });
    }
    
    const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (users.length === 0) {
      return res.status(401).json({ success: false, message: "E-posta bulunamadı." });
    }
    const user = users[0];
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ success: false, message: "Yanlış şifre." });
    }
   
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.json({
      success: true,
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("❌ [login] Hata:", err);
    return res.status(500).json({ success: false, message: "Giriş sırasında hata oluştu." });
  }
};


exports.getMe = async (req, res) => {
  try {
    const user_id = req.user.id;
    const [users] = await db.execute("SELECT id, full_name, email FROM users WHERE id = ?", [user_id]);
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: "Kullanıcı bulunamadı." });
    }
    const user = users[0];
    return res.json({
      success: true,
      id: user.id,
      fullName: user.full_name,
      email: user.email,
    });
  } catch (err) {
    console.error("❌ [getMe] Hata:", err);
    return res.status(500).json({ success: false, message: "Profil alınamadı." });
  }
};
