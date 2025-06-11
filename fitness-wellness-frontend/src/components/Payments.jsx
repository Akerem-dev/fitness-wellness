
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [method, setMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/payments');
      setPayments(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load payments.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    
    if (!userId || !amount || !paymentDate || !method.trim()) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/payments', {
        user_id: Number(userId),
        amount: parseFloat(amount),
        payment_date: paymentDate,
        method: method.trim(),
      });
      
      setUserId('');
      setAmount('');
      setPaymentDate('');
      setMethod('');
      
      fetchPayments();
    } catch (err) {
      console.error(err);
      setError('Failed to add payment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Payments
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading payments…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {payments.map(p => (
            <li
              key={p.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                User ID: {p.user_id}
              </span>
              <span className="text-gray-600">
                Amount: {p.amount} ₺, Date: {p.payment_date}, Method: {p.method}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add Payment
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
          type="number"
          step="0.01"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="date"
          placeholder="Payment Date"
          value={paymentDate}
          onChange={e => setPaymentDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="text"
          placeholder="Method"
          value={method}
          onChange={e => setMethod(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Payment'}
        </button>
      </form>
    </div>
  );
}
