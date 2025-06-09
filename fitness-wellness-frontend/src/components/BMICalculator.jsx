import React, { useState } from 'react';

const adviceLists = {
    underweight: [
        'Increase calorie intake with healthy fats (nuts, avocado, olive oil).',
        'Add 2–3 days of strength training per week (squats, deadlifts, bench press).',
        'Eat more frequently—5–6 small meals a day.',
        'Include protein shakes or smoothies between meals.',
    ],
    normal: [
        'Continue balanced diet: 45% carbs, 30% protein, 25% fats.',
        'Maintain 150 minutes of moderate cardio weekly.',
        'Incorporate 2 strength sessions per week.',
        'Stay hydrated and get 7–9 hours of sleep.',
    ],
    overweight: [
        'Aim for a 500-calorie daily deficit.',
        '30–45 minutes of moderate cardio, 5x/week (jogging, cycling).',
        'Include HIIT once a week.',
        'Control portion sizes and reduce sugary drinks.',
    ],
    obese: [
        'Consult a healthcare professional before starting.',
        'Begin with low-impact cardio (walking, swimming) 30 min/day.',
        'Focus on whole foods: vegetables, lean protein, legumes.',
        'Consider a supervised weight-loss program.',
    ],
};

export default function BMICalculator() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [advice, setAdvice] = useState([]);

    const calculate = (e) => {
        e.preventDefault();
        const h = parseFloat(height) / 100;
        const w = parseFloat(weight);
        if (!h || !w) return;
        const value = w / (h * h);
        setBmi(value.toFixed(1));

        let key;
        if (value < 18.5) key = 'underweight';
        else if (value < 25) key = 'normal';
        else if (value < 30) key = 'overweight';
        else key = 'obese';

        setAdvice(adviceLists[key]);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-green-600 text-center">BMI Calculator</h2>
            <form onSubmit={calculate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Height (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="e.g. 170"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Weight (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            placeholder="e.g. 65"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md shadow transition-colors"
                >
                    Calculate
                </button>
            </form>
            {bmi && (
                <div className="mt-6 p-6 bg-green-50 border border-green-100 rounded-lg space-y-4">
                    <p className="text-xl text-center text-green-700">
                        Your BMI is <span className="font-bold">{bmi}</span>
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                        {advice.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
