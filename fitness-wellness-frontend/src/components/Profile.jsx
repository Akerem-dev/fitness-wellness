// src/components/Profile.jsx
import React, { useState, useEffect } from 'react';

export default function Profile({ currentUser }) {
  const storageKey = `profile_${currentUser.id || currentUser.email}`;
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');

  const initial = saved || {
    email: currentUser.email || '',
    fullName: currentUser.fullName || '',
    age: currentUser.age || '',
    height: currentUser.height || '',
    weight: currentUser.weight || '',
    goal: currentUser.goal || '',
  };

  const [form, setForm] = useState(initial);
  const [editing, setEditing] = useState(!saved);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (stored) {
      setForm(stored);
      setEditing(false);
    } else {
      setForm({
        email: currentUser.email || '',
        fullName: currentUser.fullName || '',
        age: currentUser.age || '',
        height: currentUser.height || '',
        weight: currentUser.weight || '',
        goal: currentUser.goal || '',
      });
      setEditing(true);
    }
    // eslint-disable-next-line
  }, [currentUser.id, currentUser.email]);

  const handleChange = e => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = e => {
    e.preventDefault();
    localStorage.setItem(storageKey, JSON.stringify(form));
    alert('Profile saved!');
    setEditing(false);
  };

  // Progress bar: current weight / goal weight * 100
  const progress =
    form.weight && form.goal
      ? Math.min(100, (Number(form.weight) / Number(form.goal)) * 100)
      : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-green-600 mb-4">Your Profile</h2>
      <form onSubmit={handleSave} className="space-y-4">
        {[
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Full Name', name: 'fullName', type: 'text' },
          { label: 'Age', name: 'age', type: 'number' },
          { label: 'Height (cm)', name: 'height', type: 'number' },
          { label: 'Weight (kg)', name: 'weight', type: 'number' },
          { label: 'Goal (kg)', name: 'goal', type: 'number' },
        ].map(field => (
          <div key={field.name}>
            <label className="block text-gray-700 mb-1">{field.label}</label>
            <input
              name={field.name}
              type={field.type}
              value={form[field.name]}
              onChange={handleChange}
              disabled={!editing}
              className={`w-full p-2 border rounded ${editing ? 'bg-white' : 'bg-gray-100 cursor-not-allowed'}`}
            />
          </div>
        ))}

        {/* Progress Bar */}
        {!editing && form.goal && form.weight && (
          <div className="mt-6">
            <label className="block text-gray-700 mb-1">Progress towards goal:</label>
            <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="h-4 bg-green-600"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-right text-sm text-gray-600 mt-1">
              {progress.toFixed(1)}%
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          {editing ? (
            <>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
