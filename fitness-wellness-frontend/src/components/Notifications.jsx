import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [readStatus, setReadStatus] = useState(false);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = () => {
        axios.get(`${API}/notifications`)
            .then(res => setNotifications(res.data))
            .catch(err => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${API}/notifications`, {
            user_id: parseInt(userId),
            message,
            read_status: readStatus
        })
            .then(() => {
                setUserId('');
                setMessage('');
                setReadStatus(false);
                fetchNotifications();
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">Notifications</h2>

            <ul className="divide-y divide-gray-200 mb-8">
                {notifications.map(notification => (
                    <li key={notification.id} className="py-3 flex justify-between items-center space-x-4">
                        <span className="text-lg font-medium">User ID: {notification.user_id}</span>
                        <span className="text-gray-600 flex-1">Message: {notification.message}</span>
                        <span className="text-gray-600">Read: {notification.read_status ? 'Yes' : 'No'}</span>
                    </li>
                ))}
            </ul>

            <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add Notification</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="User ID"
                    type="number"
                    value={userId}
                    onChange={e => setUserId(e.target.value)}
                    required
                />
                <input
                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    required
                />
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={readStatus}
                        onChange={e => setReadStatus(e.target.checked)}
                        id="readStatusCheckbox"
                        className="w-4 h-4"
                    />
                    <label htmlFor="readStatusCheckbox" className="select-none">Read</label>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
                >
                    Add
                </button>
            </form>
        </div>
    );
}
