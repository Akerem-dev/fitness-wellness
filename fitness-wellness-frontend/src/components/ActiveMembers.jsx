import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ActiveMembers({ refreshTrigger }) {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveMembers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("/api/active-members");
        setMembers(res.data); 
      } catch (err) {
        console.error("ActiveMembers çekilirken hata:", err);
        setError("Couldn't load active members.");
      } finally {
        setLoading(false);
      }
    };
    fetchActiveMembers();
  }, [refreshTrigger]);

  return (
    <section id="activemembers" className="py-20 bg-[#f0f9f0]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-4">
          Active Members
        </h2>
        <p className="text-gray-600 mb-6">
          Below you can see all members with active subscriptions.
        </p>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-12"></div>
        {loading && <p className="text-gray-600">Loading active members…</p>}
        {error && (
          <div className="bg-white rounded-3xl shadow-lg py-6 px-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        {!loading && !error && members.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {members.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-3xl shadow-lg p-6 flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-green-700 font-semibold">
                    {m.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-green-800">{m.name}</h3>
                <p className="text-gray-600 mt-2">{m.membershipType}</p>
                <p className="text-sm text-gray-500">Expires: {m.endDate}</p>
              </div>
            ))}
          </div>
        )}
        {!loading && !error && members.length === 0 && (
          <p className="text-gray-600">
            No active members yet. Check back later!
          </p>
        )}
      </div>
    </section>
  );
}
