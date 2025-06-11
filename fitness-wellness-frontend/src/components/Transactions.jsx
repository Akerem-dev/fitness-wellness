
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [userId, setUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/transactions');
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load transactions.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!userId || !amount || !transactionDate || !type.trim()) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/transactions', {
        user_id: Number(userId),
        amount: parseFloat(amount),
        transaction_date: transactionDate,
        type: type.trim(),
      });
      
      setUserId('');
      setAmount('');
      setTransactionDate('');
      setType('');
     
      fetchTransactions();
    } catch (err) {
      console.error(err);
      setError('Failed to add transaction.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Transactions
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading transactions…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {transactions.map(tx => (
            <li
              key={tx.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                User ID: {tx.user_id}
              </span>
              <span className="text-gray-600">
                Amount: {tx.amount} ₺, Date: {tx.transaction_date}, Type: {tx.type}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add New Transaction
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
          type="datetime-local"
          placeholder="Transaction Date"
          value={transactionDate}
          onChange={e => setTransactionDate(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Transaction'}
        </button>
      </form>
    </div>
  );
}
