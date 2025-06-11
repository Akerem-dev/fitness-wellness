  // src/components/Notifications.jsx
  import React, { useEffect, useState } from 'react';
  import api from '../api';

  export default function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');
    const [readStatus, setReadStatus] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/notifications');
        setNotifications(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load notifications.');
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = async e => {
      e.preventDefault();
      setError(null);

      // Validate
      if (!userId || !message.trim()) {
        setError('User ID and message are required.');
        return;
      }

      setSubmitting(true);
      try {
        await api.post('/notifications', {
          user_id: Number(userId),
          message: message.trim(),
          read_status: readStatus
        });
        // Clear form
        setUserId('');
        setMessage('');
        setReadStatus(false);
        // Refresh list
        fetchNotifications();
      } catch (err) {
        console.error(err);
        setError('Failed to add notification.');
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
          Notifications
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}

        {loading ? (
          <p className="text-gray-600 text-center mb-8">
            Loading notifications…
          </p>
        ) : (
          <ul className="divide-y divide-gray-200 mb-8">
            {notifications.map(n => (
              <li
                key={n.id}
                className="py-3 flex justify-between items-center space-x-4"
              >
                <span className="text-lg font-medium">
                  User ID: {n.user_id}
                </span>
                <span className="text-gray-600 flex-1">
                  {n.message}
                </span>
                <span className="text-gray-600">
                  Read: {n.read_status ? 'Yes' : 'No'}
                </span>
              </li>
            ))}
          </ul>
        )}

        <h3 className="text-2xl font-semibold mb-4 text-gray-700">
          Add Notification
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            placeholder="User ID"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="text"
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <div className="flex items-center space-x-2">
            <input
              id="readStatusCheckbox"
              type="checkbox"
              checked={readStatus}
              onChange={e => setReadStatus(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="readStatusCheckbox" className="select-none">
              Read
            </label>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
          >
            {submitting ? 'Adding…' : 'Add Notification'}
          </button>
        </form>
      </div>
    );
  }
