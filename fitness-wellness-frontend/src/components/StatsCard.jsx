// src/components/StatsCard.jsx
import React from "react";

export default function StatsCard({ stats = [] }) {
    if (!stats.length) return null;
    return (
        <section className="py-10 bg-[#f0f9f0]">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((s, idx) => (
                    <div
                        key={idx}
                        className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center"
                    >
                        <div className="text-green-600 text-4xl mb-2">{s.icon}</div>
                        <h4 className="text-2xl font-bold text-green-800">{s.value}</h4>
                        <p className="text-gray-600 text-sm">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
