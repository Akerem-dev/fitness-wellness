
require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = async function (req, res, next) {
    try {

        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token provided." });
        }
        const token = authHeader.split(" ")[1];

       
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        
        const [rows] = await db.execute(
            "SELECT id, full_name, email FROM users WHERE id = ?",
            [userId]
        );
        if (rows.length === 0) {
            return res.status(401).json({ message: "Token geçersiz." });
        }

        
        req.user = {
            id: rows[0].id,
            email: rows[0].email,
            fullName: rows[0].full_name,
        };
        next();
    } catch (err) {
        console.error("AuthMiddleware hata:", err);
        return res.status(401).json({ message: "Authentication failed." });
    }
};
