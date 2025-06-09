import React, { useState, useEffect } from 'react';

const templates = {
    beginner: {
        lose: [
            'Day 1: 30-min brisk walk',
            'Day 2: Rest or gentle yoga',
            'Day 3: 30-min cycling',
            'Day 4: Bodyweight strength (squats, push-ups)',
            'Day 5: 30-min swim',
            'Day 6: Rest or stretching',
            'Day 7: Yoga & mobility',
        ],
        maintain: [
            'Day 1: 20-min run',
            'Day 2: Rest',
            'Day 3: 20-min HIIT (intervals)',
            'Day 4: Bodyweight circuit',
            'Day 5: 20-min cycling',
            'Day 6: Rest',
            'Day 7: Pilates or core work',
        ],
        gain: [
            'Day 1: Full-body strength (3×8 reps)',
            'Day 2: Rest or light cardio',
            'Day 3: Upper body strength (bench, rows)',
            'Day 4: Rest',
            'Day 5: Lower body strength (squats, deadlifts)',
            'Day 6: Rest',
            'Day 7: Core & mobility',
        ],
    },
    intermediate: {
        lose: [
            'Day 1: 45-min HIIT',
            'Day 2: Active recovery (foam rolling)',
            'Day 3: 45-min cycling',
            'Day 4: Strength superset',
            'Day 5: 45-min run',
            'Day 6: Rest',
            'Day 7: Yoga',
        ],
        maintain: [
            'Day 1: Strength circuit',
            'Day 2: Rest',
            'Day 3: 30-min HIIT',
            'Day 4: Rest',
            'Day 5: Endurance run',
            'Day 6: Rest',
            'Day 7: Mobility & stretch',
        ],
        gain: [
            'Day 1: Heavy push (bench, overhead press)',
            'Day 2: Heavy pull (rows, pull-ups)',
            'Day 3: Rest',
            'Day 4: Leg day (squats, lunges)',
            'Day 5: Rest',
            'Day 6: Full-body hypertrophy',
            'Day 7: Rest',
        ],
    },
    advanced: {
        lose: [
            'Day 1: 60-min HIIT',
            'Day 2: Strength superset',
            'Day 3: 60-min run',
            'Day 4: Olympic lifts',
            'Day 5: 60-min cycling',
            'Day 6: Rest',
            'Day 7: Yoga & mobility',
        ],
        maintain: [
            'Day 1: Powerlifting session',
            'Day 2: CrossFit WOD',
            'Day 3: Rest',
            'Day 4: Plyometrics',
            'Day 5: Strongman circuits',
            'Day 6: Rest',
            'Day 7: Active recovery',
        ],
        gain: [
            'Day 1: Heavy strength (compound lifts)',
            'Day 2: Accessory hypertrophy upper',
            'Day 3: Accessory hypertrophy lower',
            'Day 4: Rest',
            'Day 5: Power cleans & snatches',
            'Day 6: Accessory/core work',
            'Day 7: Rest',
        ],
    },
};

export default function PlanBuilder() {
    const [level, setLevel] = useState('beginner');
    const [goal, setGoal] = useState('lose');
    const [plan, setPlan] = useState([]);

    useEffect(() => {
        // localStorage’dan önceki seçimi al
        const saved =
            JSON.parse(localStorage.getItem(`plan_${level}_${goal}`)) || null;
        if (saved) {
            setPlan(saved);
        } else {
            setPlan([]);
        }
    }, [level, goal]);

    const handleGenerate = () => {
        const template = templates[level][goal] || [];
        setPlan(template);
        // localStorage’a kaydet
        localStorage.setItem(`plan_${level}_${goal}`, JSON.stringify(template));
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-green-600 text-center">
                Workout Plan Builder
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Level</label>
                    <select
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Goal</label>
                    <select
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                    >
                        <option value="lose">Weight Loss</option>
                        <option value="maintain">Maintain</option>
                        <option value="gain">Muscle Gain</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <button
                        onClick={handleGenerate}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-md shadow transition-colors"
                    >
                        Generate Plan
                    </button>
                </div>
            </div>
            {plan.length > 0 && (
                <div className="mt-6 p-6 bg-green-50 border border-green-100 rounded-lg space-y-4">
                    {plan.map((day, idx) => (
                        <div
                            key={idx}
                            className="flex items-start bg-white p-3 rounded-md shadow-sm"
                        >
                            <span className="font-semibold text-green-700 mr-2">Day {idx + 1}:</span>
                            <span className="text-gray-700">{day}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
