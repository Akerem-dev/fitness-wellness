
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function ClassSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [serviceId, setServiceId] = useState('');
  const [trainerId, setTrainerId] = useState('');
  const [classTime, setClassTime] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/api/class_schedules');
      setSchedules(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load schedules.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    
    if (!serviceId || !trainerId || !classTime) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/api/class_schedules', {
        service_id: Number(serviceId),
        trainer_id: Number(trainerId),
        class_time: classTime,
      });
      
      setServiceId('');
      setTrainerId('');
      setClassTime('');
      
      fetchSchedules();
    } catch (err) {
      console.error(err);
      setError('Failed to add schedule.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        Class Schedules
      </h2>

      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-600 text-center mb-8">Loading…</p>
      ) : (
        <ul className="divide-y divide-gray-200 mb-8">
          {schedules.map(s => (
            <li
              key={s.id}
              className="py-3 flex justify-between items-center"
            >
              <span className="text-lg font-medium">
                Service ID: {s.service_id}
              </span>
              <span className="text-gray-600">
                Trainer ID: {s.trainer_id}, Time: {s.class_time}
              </span>
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Add New Schedule
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Service ID"
          value={serviceId}
          onChange={e => setServiceId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="number"
          placeholder="Trainer ID"
          value={trainerId}
          onChange={e => setTrainerId(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          type="datetime-local"
          placeholder="Class Time"
          value={classTime}
          onChange={e => setClassTime(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Schedule'}
        </button>
      </form>
    </div>
  );
}
