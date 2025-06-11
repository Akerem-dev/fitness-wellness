
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Memberships() {
  const [memberships, setMemberships] = useState([]);
  const [userId, setUserId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/memberships');
      setMemberships(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load memberships.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    
    if (!userId || !startDate || !endDate || !status.trim()) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/memberships', {
        user_id: Number(userId),
        start_date: startDate,
        end_date: endDate,
        status: status.trim(),
      });
      
      setUserId('');
      setStartDate('');
      setEndDate('');
      setStatus('');
      
      fetchMemberships();
    } catch (err) {
      console.error(err);
      setError('Failed to add membership.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Memberships
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {memberships.map(m => (
            <li
              key={m.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                User ID: {m.user_id}
              </span>
              <span className="text-gray-600">
                Start: {m.start_date}, End: {m.end_date}, Status:{' '}
                {m.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add New Membership
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
          type="date"
          placeholder="Start Date"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="text"
          placeholder="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Membership'}
        </button>
      </form>
    </div>
  );
}
