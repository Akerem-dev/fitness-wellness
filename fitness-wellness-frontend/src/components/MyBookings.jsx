import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings({ token, refreshTrigger, bookingCompletedFlag }) {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (!token) {
      setBookings([]);
      setError("You must be logged in to see your bookings.");
      return;
    }
    setError(null);

    const fetchMyBookings = async () => {
      try {
        const response = await axios.get("/api/bookings/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookings(response.data?.bookings || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to load your bookings.");
      }
    };
    fetchMyBookings();

    if (bookingCompletedFlag) {
      setSuccessMessage("Booking completed!");
      setTimeout(() => setSuccessMessage(""), 3000);
      
    }
  }, [token, refreshTrigger, bookingCompletedFlag]);

  if (!token) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-center text-red-500">
          You must be logged in to see your bookings.
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  
  const formatDateTime = (isoString) => {
    if (!isoString) return { date: "", time: "" };
    const d = new Date(isoString);
    return {
      // Gün/Ay/Yıl
      date: d.toLocaleDateString("en-GB"),
      // Saat:Dakika (24h)
      time: d
        .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
        .replace(/^0/, ""),
    };
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Your Bookings</h2>
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow text-center">
          {successMessage}
        </div>
      )}
      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {bookings.map((b) => {
            const { date, time } = formatDateTime(b.booking_date);
            return (
              <li
                key={b.id}
                className="bg-white rounded-2xl shadow p-4 flex flex-col md:flex-row justify-between"
              >
                <div className="space-y-1 text-left">
                  <p className="text-lg font-medium">
                    Trainer:{" "}
                    <span className="text-green-700">
                      {b.trainer_name || b.service_id}
                    </span>
                  </p>
                  <p className="text-gray-600">Date: {date}</p>
                  <p className="text-gray-600">Time: {time}</p>
                </div>
                <div className="text-right space-y-1 mt-2 md:mt-0">
                  <p className="text-gray-600">
                    Status:{" "}
                    <span
                      className={
                        b.status === "pending"
                          ? "text-yellow-600"
                          : b.status === "confirmed"
                          ? "text-green-700"
                          : "text-red-600"
                      }
                    >
                      {b.status}
                    </span>
                  </p>
                  <span className="text-sm text-gray-500">ID: {b.id}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
