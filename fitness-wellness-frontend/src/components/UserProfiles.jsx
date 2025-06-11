
import React, { useEffect, useState } from 'react';
import api from '../api';

export default function UserProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [userId, setUserId] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const res = await api.get('/user_profiles');
      setProfiles(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load profiles.');
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null);

    if (!userId || !age || !gender || !weight || !height) {
      setError('All fields are required.');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/user_profiles', {
        user_id: Number(userId),
        age: Number(age),
        gender,
        weight: parseFloat(weight),
        height: parseFloat(height),
      });
      
      setUserId('');
      setAge('');
      setGender('');
      setWeight('');
      setHeight('');
      
      fetchProfiles();
    } catch (err) {
      console.error(err);
      setError('Failed to add profile.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-green-600 text-center">
        User Profiles
      </h2>
      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}
      <ul className="divide-y divide-gray-200 mb-8">
        {profiles.map(profile => (
          <li
            key={profile.id}
            className="py-3 flex justify-between items-center"
          >
            <span className="text-lg font-medium">
              User ID: {profile.user_id}
            </span>
            <span className="text-gray-600">
              Age: {profile.age}, Gender: {profile.gender}, Weight: {profile.weight}kg, Height: {profile.height}cm
            </span>
          </li>
        ))}
      </ul>

      <h3 className="text-2xl font-semibold mb-4 text-gray-700">Add New Profile</h3>
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
          placeholder="Age"
          type="number"
          value={age}
          onChange={e => setAge(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Weight (kg)"
          type="number"
          step="0.1"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          required
        />
        <input
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Height (cm)"
          type="number"
          step="0.1"
          value={height}
          onChange={e => setHeight(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 transition"
        >
          {submitting ? 'Adding…' : 'Add Profile'}
        </button>
      </form>
    </div>
  );
}
