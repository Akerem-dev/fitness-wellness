// src/components/UserActivity.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function UserActivity() {
  const [activities, setActivities] = useState([]);
  const [userId, setUserId] = useState('');
  const [activityType, setActivityType] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list on mount (and after new activity)
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/user_activity');
      setActivities(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load activities.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    // Simple form validation
    if (!userId || !activityType.trim() || !activityDate) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/user_activity', {
        user_id: Number(userId),
        activity_type: activityType.trim(),
        activity_date: activityDate,
      });
      // Clear form
      setUserId('');
      setActivityType('');
      setActivityDate('');
      // Refresh list
      fetchActivities();
    } catch (err) {
      console.error(err);
      setError('Failed to add activity.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        User Activities
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading activities…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {activities.map(act => (
            <li
              key={act.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                User ID: {act.user_id}
              </span>
              <span className="text-gray-600">
                Activity: {act.activity_type}, Date: {act.activity_date}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add New Activity
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
          placeholder="Activity Type"
          value={activityType}
          onChange={e => setActivityType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="datetime-local"
          placeholder="Activity Date"
          value={activityDate}
          onChange={e => setActivityDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Activity'}
        </button>
      </form>
    </div>
  );
}
