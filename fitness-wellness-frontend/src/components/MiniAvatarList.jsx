import React from 'react';

export default function MiniAvatarList({ users }) {
    return (
        <div className="flex items-center space-x-4">
            {users.map((u) => (
                <div key={u.id} className="flex flex-col items-center">
                    <img
                        src={u.avatar || '/user.png'}
                        className="w-10 h-10 rounded-full border-2 border-green-200"
                        alt={u.name}
                    />
                    <span className="text-xs mt-1 text-gray-700">{u.name.split(' ')[0]}</span>
                </div>
            ))}
        </div>
    );
}
