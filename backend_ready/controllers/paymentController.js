

exports.createPayment = async (req, res) => {

    try {
      
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
