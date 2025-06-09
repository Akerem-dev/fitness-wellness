// backend_ready/controllers/bookingController.js

const db = require("../config/db");

// POST /api/bookings
exports.createBooking = async (req, res) => {
    try {
        const user_id = req.user.id;  // authMiddleware’den
        const { service_id, booking_date, status } = req.body;

        if (!service_id || !booking_date) {
            return res.status(400).json({ success: false, message: "Eksik alanlar." });
        }

        // Aynı kullanıcı aynı tarihte aynı servise rezervasyon yaptı mı kontrolü
        const [existingRows] = await db.execute(
            "SELECT * FROM bookings WHERE user_id = ? AND service_id = ? AND booking_date = ?",
            [user_id, service_id, booking_date]
        );
        if (existingRows.length > 0) {
            return res.status(409).json({ success: false, message: "Aynı slot zaten alınmış." });
        }

        // Yeni rezervasyon ekle
        const [result] = await db.execute(
            "INSERT INTO bookings (user_id, service_id, booking_date, status) VALUES (?, ?, ?, ?)",
            [user_id, service_id, booking_date, status || "pending"]
        );

        return res.status(201).json({ success: true, message: "Booking completed!", id: result.insertId });
    } catch (err) {
        console.error("❌ [createBooking] Hata:", err);
        return res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
};

// GET /api/bookings/me (Kullanıcının kendi rezervasyonları) + Trainer adı ile JOIN!
exports.getMyBookings = async (req, res) => {
    try {
        const user_id = req.user.id;
        const [rows] = await db.execute(
            `SELECT b.*, t.name AS trainer_name 
             FROM bookings b
             LEFT JOIN trainers t ON b.service_id = t.id
             WHERE b.user_id = ? 
             ORDER BY b.booking_date ASC`,
            [user_id]
        );
        return res.json({ success: true, bookings: rows });
    } catch (err) {
        console.error("❌ [getMyBookings] Hata:", err);
        return res.status(500).json({ success: false, message: "Sunucu hatası." });
    }
};
