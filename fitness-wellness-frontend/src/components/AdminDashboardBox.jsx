import React from 'react';

export default function AdminDashboardBox({ title, value, icon }) {
    return (
        <div className="bg-gradient-to-tr from-green-50 to-white rounded-2xl p-6 shadow flex items-center space-x-4">
            <span className="text-green-600 text-4xl">{icon}</span>
            <div>
                <p className="text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-green-700">{value}</p>
            </div>
        </div>
    )
}
