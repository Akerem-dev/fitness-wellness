// src/components/TrainerAvailability.jsx
import React, { useState, useEffect } from "react";

export default function TrainerAvailability({ isOpen, onClose, trainer, token, onBook }) {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    if (!isOpen || !trainer) return;
    const mock = [
      { day: "Monday", slots: ["09:00 - 10:00", "14:00 - 15:00"] },
      { day: "Wednesday", slots: ["11:00 - 12:00", "16:00 - 17:00"] },
      { day: "Friday", slots: ["08:00 - 09:00", "13:00 - 14:00", "18:00 - 19:00"] },
    ];
    setSchedules(mock);
  }, [isOpen, trainer]);

  if (!isOpen || !trainer) return null;

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-2xl font-bold text-green-700 mb-4 text-center">{trainer.name} – Availability</h3>
      {schedules.length === 0 && <p className="text-center text-gray-600">Loading...</p>}
      <div className="space-y-4">
        {schedules.map((item) => (
          <div key={item.day} className="border border-gray-200 rounded-lg p-4">
            <h4 className="text-lg font-semibold text-green-700 mb-2">{item.day}</h4>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {item.slots.map((slot, i) => (
                <li key={i}>{slot}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => {
            onBook(trainer);
            onClose();
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition"
        >
          Book Here
        </button>
      </div>
    </div>
  );
}
