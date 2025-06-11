
const db = require("../config/db");

exports.getAll = async (req, res) => {
    try {
        // full_name ve created_at da dönelim!
        const [rows] = await db.execute("SELECT id, username AS full_name, rating, comment AS message, created_at FROM reviews ORDER BY created_at DESC");
        return res.json(rows);
    } catch (err) {
        console.error("[feedbackController.getAll] Error:", err);
        return res.status(500).json({ success: false, message: "Could not load reviews." });
    }
};

exports.create = async (req, res) => {
    try {
        const { username, rating, comment } = req.body;
        if (!username || !rating || !comment) {
            return res.status(400).json({ success: false, message: "username, rating, comment required." });
        }
        const [result] = await db.execute(
            "INSERT INTO reviews (username, rating, comment) VALUES (?, ?, ?)",
            [username, rating, comment]
        );
        return res.status(201).json({
            id: result.insertId,
            full_name: username,
            rating,
            message: comment,
            created_at: new Date()
        });
    } catch (err) {
        console.error("[feedbackController.create] Error:", err);
        return res.status(500).json({ success: false, message: "Could not create review." });
    }
};
