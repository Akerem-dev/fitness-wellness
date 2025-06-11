
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/bookings');
      setBookings(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load bookings.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!userId || !serviceId || !bookingDate || !status) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/bookings', {
        user_id: Number(userId),
        service_id: Number(serviceId),
        booking_date: bookingDate,
        status,
      });
      
      setUserId('');
      setServiceId('');
      setBookingDate('');
      setStatus('');
      
      fetchBookings();
    } catch (err) {
      console.error(err);
      setError('Failed to add booking.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Bookings
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading bookings…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {bookings.map(booking => (
            <li
              key={booking.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                User ID: {booking.user_id}
              </span>
              <span className="text-gray-600">
                Service ID: {booking.service_id}, Date: {booking.booking_date}, Status: {booking.status}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add New Booking
      </h3>
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
          placeholder="Service ID"
          type="number"
          value={serviceId}
          onChange={e => setServiceId(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Booking Date"
          type="datetime-local"
          value={bookingDate}
          onChange={e => setBookingDate(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Status"
          value={status}
          onChange={e => setStatus(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Booking'}
        </button>
      </form>
    </div>
  );
}
