// src/components/Announcements.jsx
import React from "react";

export default function Announcements({ items = [] }) {
    if (!items.length) return null;
    return (
        <section className="py-8 bg-gradient-to-br from-green-100 via-white to-green-100">
            <div className="max-w-4xl mx-auto px-4">
                <h3 className="text-2xl font-bold text-green-700 mb-4">Announcements</h3>
                <ul className="space-y-3">
                    {items.map((item, idx) => (
                        <li
                            key={idx}
                            className="bg-white border-l-4 border-green-500 shadow p-4 rounded flex items-start"
                        >
                            <span className="text-xl mr-3">📢</span>
                            <span className="text-gray-800">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
