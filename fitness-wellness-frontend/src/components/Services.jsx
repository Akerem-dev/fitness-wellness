// src/components/Services.jsx
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import BookingModal from "./BookingModal";


const servicesData = [
  {
    id: 1,
    category: "Fitness",
    title: "Personal Training",
    description: "One-on-one customized training sessions with expert trainers.",
    icon: "💪",
  },
  {
    id: 2,
    category: "Fitness",
    title: "Group Classes",
    description: "Engaging group workouts to keep you motivated and connected.",
    icon: "🤸‍♂️",
  },
  {
    id: 3,
    category: "Nutrition",
    title: "Nutrition Plans",
    description: "Personalized nutrition guidance to complement your fitness goals.",
    icon: "🥗",
  },
  {
    id: 4,
    category: "Wellness",
    title: "Yoga & Meditation",
    description: "Relaxing sessions for body and mind balance and flexibility.",
    icon: "🧘‍♀️",
  },
];

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredServices, setFilteredServices] = useState(servicesData);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  
  const categories = ["All", ...new Set(servicesData.map((s) => s.category))];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    if (cat === "All") setFilteredServices(servicesData);
    else setFilteredServices(servicesData.filter((s) => s.category === cat));
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return (
    <section
      id="services"
      className="relative py-20 bg-[#f0f9f0] overflow-hidden"
      data-aos="fade-up"
    >
      <div className="relative max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-green-700" data-aos="zoom-in">
          Our Services
        </h2>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-8"></div>

        <div className="flex justify-center gap-4 mb-12" data-aos="fade-right">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full font-medium transition-colors duration-200 ${selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-white border border-green-600 text-green-600 hover:bg-green-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl shadow-lg p-6 text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
              data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              data-aos-delay={index * 100}
              onClick={() => handleServiceClick(service)}
            >
              <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-green-100 to-green-200 mb-4 transition-transform duration-300 group-hover:scale-110">
                <span className="text-4xl">{service.icon}</span>
              </div>
              <h3 className="text-2xl font-semibold text-green-800 mb-2">
                {service.title}
              </h3>
              <span className="block w-12 h-1 bg-green-700 mx-auto mb-4"></span>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-bg duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-transform duration-200 transform group-hover:scale-110">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modal (Booking) */}
      {isModalOpen && selectedService && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
          <div
            className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 mx-auto overflow-y-auto max-h-[80vh]"
            data-aos="zoom-in"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Book: {selectedService.title}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                closeModal();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-gray-700">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-200"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded transition transform hover:scale-105"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
