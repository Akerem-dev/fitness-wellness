// backend_ready/controllers/paymentController.js

exports.createPayment = async (req, res) => {
    // Her gelen isteği “başarılı” olarak kaydeder, kart bilgisi doğrulamaz!
    try {
        // İsteğe gelen body loglanabilir
        console.log("Mock payment received:", req.body);

        return res.status(201).json({
            success: true,
            message: "Payment successful!",
            received: req.body
        });
    } catch (err) {
        console.error("❌ [createPayment] Hata:", err);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};
