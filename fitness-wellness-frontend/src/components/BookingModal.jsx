import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookingModal({ isOpen, onClose, classInfo, token, onBooked }) {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!isOpen) {
            setDate("");
            setTime("");
            setErrorMessage("");
        }
    }, [isOpen]);

    if (!isOpen || !classInfo) return null;

    const handleConfirmBooking = async () => {
        setErrorMessage("");
        if (!token) {
            setErrorMessage("You must be logged in to book.");
            return;
        }
        if (!date || !time) {
            setErrorMessage("Please select date and time.");
            return;
        }

        // MySQL'in DATETIME formatı için "YYYY-MM-DD HH:mm:ss" stringi lazım!
        const booking_date = `${date} ${time}:00`;

        const payload = {
            service_id: classInfo.id,      // (Trainer ya da sınıf ID'si)
            booking_date,                  // "2025-06-09 14:00:00" gibi
            status: "pending"
        };

        try {
            const response = await axios.post("/api/bookings", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 200 || response.status === 201) {
                onBooked && onBooked();
                onClose();
            }
        } catch (err) {
            setErrorMessage(err?.response?.data?.message || "Failed to create booking. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">
                Book: {classInfo.name}
            </h3>
            <form className="space-y-4">
                <div>
                    <label className="block text-gray-700 mb-1">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Time</label>
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                </div>
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                <button
                    type="button"
                    onClick={handleConfirmBooking}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
}
