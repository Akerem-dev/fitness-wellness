const db = require("../config/db");

// Profilini getir (GET /api/profile/me)
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.execute(
            "SELECT * FROM user_profiles WHERE user_id = ?",
            [userId]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: "Profil bulunamadı." });
        }
        res.json({ success: true, profile: rows[0] });
    } catch (err) {
        console.error("[profileController.getProfile] Hata:", err);
        res.status(500).json({ success: false, message: "Profil alınamadı." });
    }
};

// Profilini oluştur veya güncelle (POST /api/profile/update)
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { age, gender, weight, height } = req.body;
        if (!age || !gender || !weight || !height) {
            return res.status(400).json({ success: false, message: "Tüm alanlar zorunlu." });
        }

        // Var mı diye bak
        const [rows] = await db.execute(
            "SELECT id FROM user_profiles WHERE user_id = ?",
            [userId]
        );
        if (rows.length > 0) {
            // Güncelle
            await db.execute(
                "UPDATE user_profiles SET age = ?, gender = ?, weight = ?, height = ? WHERE user_id = ?",
                [age, gender, weight, height, userId]
            );
            res.json({ success: true, message: "Profil güncellendi." });
        } else {
            // Yeni profil oluştur
            await db.execute(
                "INSERT INTO user_profiles (user_id, age, gender, weight, height) VALUES (?, ?, ?, ?, ?)",
                [userId, age, gender, weight, height]
            );
            res.json({ success: true, message: "Profil oluşturuldu." });
        }
    } catch (err) {
        console.error("[profileController.updateProfile] Hata:", err);
        res.status(500).json({ success: false, message: "Profil güncellenemedi." });
    }
};
