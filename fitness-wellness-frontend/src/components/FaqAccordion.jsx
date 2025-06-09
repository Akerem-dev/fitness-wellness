import React, { useState } from 'react';

const sampleFaqs = [
    { q: "How can I join a class?", a: "You can book a class from the Classes section after logging in." },
    { q: "How do I renew my membership?", a: "Go to Memberships and select 'Renew' on your profile." },
    { q: "Who can I contact for nutrition advice?", a: "Message our coaches via the Contact page." },
];

export default function FaqAccordion({ faqs = sampleFaqs }) {
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Frequently Asked Questions</h2>
            {faqs.map((item, idx) => (
                <div key={idx} className="mb-2">
                    <button
                        onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                        className="w-full flex justify-between items-center bg-green-100 px-5 py-3 rounded-lg shadow-sm focus:outline-none"
                    >
                        <span className="text-green-700 font-medium">{item.q}</span>
                        <span>{openIdx === idx ? "−" : "+"}</span>
                    </button>
                    {openIdx === idx && (
                        <div className="px-5 py-3 bg-white border-l-4 border-green-500 rounded-b-lg text-gray-700">
                            {item.a}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
