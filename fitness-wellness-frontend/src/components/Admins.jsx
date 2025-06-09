// src/components/Admins.jsx
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Admins() {
  const [admins, setAdmins] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/admins');
      setAdmins(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load admins.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !email.trim()) {
      setError('Username and email are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/admins', { username, email });
      setUsername('');
      setEmail('');
      fetchAdmins();
    } catch (err) {
      console.error(err);
      setError('Failed to add admin.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Admins
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading admins…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {admins.map(admin => (
            <li
              key={admin.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">{admin.username}</span>
              <span className="text-gray-600">{admin.email}</span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add New Admin
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Admin'}
        </button>
      </form>
    </div>
  );
}
