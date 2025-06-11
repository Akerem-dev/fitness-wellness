
import React, { useEffect, useState, useRef } from "react";
import api from "../api";

export default function Reviews({ currentUser }) {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const listRef = useRef(null);

 
  const fetchReviews = async () => {
    try {
      const { data } = await api.get("/api/feedback");
      setReviews(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Yorumlar yüklenemedi.");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentUser) {
      setError("Yorum bırakmak için giriş yapmalısınız.");
      return;
    }
    if (!rating || !comment.trim()) {
      setError("Hem puan hem de yorum gerekli.");
      return;
    }

    
    const payload = {
      username: currentUser.fullName,
      rating: Number(rating),
      comment: comment.trim(),
    };
    console.log("Submitting payload:", payload);

    setSubmitting(true);
    try {
      const res = await api.post("/api/feedback", payload);
      
      setReviews((prev) => [res.data, ...prev]);
      setComment("");
      setRating(0);
      setHover(0);
      listRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Submit error:", err.response?.data || err);
      
      setError(err.response?.data?.message || "Yorum gönderilemedi.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mb-16">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-4">
        Reviews
      </h2>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-8 space-y-4">
          {/* Yıldız seçimi: ★=doluyıldız ☆=boşyıldız */}
          <div className="flex space-x-1 text-2xl">
            {[1, 2, 3, 4, 5].map((n) => (
              <span
                key={n}
                onMouseEnter={() => setHover(n)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(n)}
                className={`cursor-pointer ${
                  (hover || rating) >= n ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write your review…"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit"}
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600 mb-8">
          Please log in to leave a review.
        </p>
      )}

      <div ref={listRef} className="space-y-6 max-h-[400px] overflow-y-auto">
        {reviews.map((r) => (
          <div key={r.id} className="border-b pb-4">
            <div className="flex items-center mb-1">
              <span className="font-semibold mr-2">{r.full_name}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 mr-1 ${
                      r.rating >= i ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-1">{r.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(r.created_at).toLocaleDateString("en-GB")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
