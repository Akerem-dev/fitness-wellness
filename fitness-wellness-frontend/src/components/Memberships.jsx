// src/components/Memberships.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Memberships() {
    const [memberships, setMemberships] = useState([]);
    const [userId, setUserId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        fetchMemberships();
    }, []);

    const fetchMemberships = () => {
        axios.get('/api/memberships')
            .then(res => setMemberships(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/memberships', {
            user_id: parseInt(userId),
            start_date: startDate,
            end_date: endDate,
            status
        })
            .then(() => {
                setUserId('');
                setStartDate('');
                setEndDate('');
                setStatus('');
                fetchMemberships();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Memberships</h2>
            <ul className="divide-y divide-gray-200 mb-8">
                {memberships.map(membership => (
                    <li key={membership.id} className="py-3 flex justify-between items-center">
                        <span className="text-lg font-medium">User ID: {membership.user_id}</span>
                        <span className="text-gray-600">
                            Start: {membership.start_date}, End: {membership.end_date}, Status: {membership.status}
                        </span>
                    </li>
                ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add New Membership</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="User ID" type="number" value={userId} onChange={e => setUserId(e.target.value)} required />
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Start Date" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} required />
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="End Date" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} required />
                <input className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} required />
                <button type="submit" className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition">
                    Add
                </button>
            </form>
        </div>
    );
}
