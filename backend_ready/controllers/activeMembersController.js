// backend_ready/controllers/activeMembersController.js
const db = require("../config/db");

exports.list = async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT 
                id, 
                user_id AS userId, 
                name, 
                membershipType, 
                DATE_FORMAT(startDate, '%Y-%m-%d') AS startDate, 
                DATE_FORMAT(endDate, '%Y-%m-%d') AS endDate 
             FROM active_members`
        );
        return res.json(rows);
    } catch (err) {
        console.error("❌ [activeMembersController.list] Hata:", err);
        return res.status(500).json({
            success: false,
            message: "Could not load active members.",
        });
    }
};
