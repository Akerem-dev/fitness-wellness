import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Packages({ staticList, onBuyClick = () => {} }) {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (Array.isArray(staticList) && staticList.length > 0) {
            setPackages(staticList);
            setLoading(false);
            return;
        }
        axios
            .get(`${API}/packages`)
            .then((res) => {
                setPackages(res.data || []);
            })
            .catch(() => setPackages([]))
            .finally(() => setLoading(false));
    }, [staticList]);

    if (loading) {
        return (
            <section className="py-20 bg-[#f0f9f0]">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-green-700 mb-4">Packages</h2>
                    <div className="w-24 h-1 bg-green-700 mx-auto mb-12"></div>
                    <p className="text-gray-600">Loading packages…</p>
                </div>
            </section>
        );
    }

    return (
        <section id="packages" className="py-20 bg-[#f0f9f0]">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-green-700 mb-4">Packages</h2>
                <div className="w-24 h-1 bg-green-700 mx-auto mb-12"></div>
                {packages.length === 0 ? (
                    <p className="text-center text-gray-600">No packages found.</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
                        {packages.map((pkg) => (
                            <div
                                key={pkg.id}
                                className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl overflow-hidden w-full max-w-sm flex flex-col items-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
                            >
                                <div className="absolute -top-12 -left-12 w-36 h-36 bg-green-100 rounded-full opacity-20"></div>
                                <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-green-100 rounded-full opacity-20"></div>

                                <div className="p-8 flex flex-col items-center w-full relative z-10">
                                    <h3 className="text-2xl font-semibold text-green-800 mb-1 text-center">{pkg.name}</h3>
                                    <span className="w-12 h-1 bg-green-700 rounded-full mb-4"></span>
                                    <p className="text-gray-600 text-center text-sm leading-relaxed mt-3 mb-6 max-w-xs">
                                        {pkg.description}
                                    </p>
                                    <div className="text-center mb-6">
                                        <span className="text-2xl font-bold text-green-600">${pkg.price}</span>
                                        <span className="text-gray-500 mx-2">|</span>
                                        <span className="text-lg font-medium text-green-600">
                                            {pkg.duration_days} days
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => onBuyClick(pkg)}
                                        className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 mb-2"
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
