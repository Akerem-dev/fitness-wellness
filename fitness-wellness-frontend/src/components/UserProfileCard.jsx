import React from 'react';

export default function UserProfileCard({ user, onEdit }) {
    if (!user) return null;
    return (
        <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl p-8 text-center">
            <img
                src={user.avatar || '/user.png'}
                alt="User avatar"
                className="mx-auto mb-4 rounded-full w-24 h-24 object-cover border-4 border-green-200"
            />
            <h3 className="text-2xl font-semibold text-green-700">{user.name}</h3>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-sm text-gray-500 mb-4">
                Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
            </p>
            {user.membershipType && (
                <p className="bg-green-100 text-green-700 inline-block px-3 py-1 rounded-full text-xs mb-2">
                    Membership: {user.membershipType}
                </p>
            )}
            {onEdit && (
                <button
                    onClick={onEdit}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Edit Profile
                </button>
            )}
        </div>
    );
}
