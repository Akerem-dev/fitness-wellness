
import React from 'react';

export default function InfoBox({ title, message, icon }) {
    return (
        <div className="flex items-center gap-4 bg-green-50 border-l-4 border-green-400 shadow p-4 rounded-xl mb-8">
            <div className="text-green-600 text-3xl">{icon || "🌱"}</div>
            <div>
                <h4 className="font-bold text-green-700 text-lg">{title}</h4>
                <p className="text-gray-800">{message}</p>
            </div>
        </div>
    );
}
