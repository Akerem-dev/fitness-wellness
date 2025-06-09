// src/components/Trainers.jsx
import React, { useState } from "react";
import "aos/dist/aos.css";

const trainersData = [
  {
    id: 1,
    name: "Murat Kaya",
    specialty: "Strength Training",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    education: "B.S. in Exercise Science, University of Fitness",
    experience: [
      "5 years as a certified strength coach",
      "Former collegiate athlete trainer",
    ],
    certifications: [
      "NSCA-CPT (National Strength & Conditioning Association)",
      "USA Weightlifting Level 1",
    ],
    socials: {
      linkedin: "https://linkedin.com/in/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  },
  {
    id: 2,
    name: "Selin Aksoy",
    specialty: "Yoga Instructor",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    education: "Yoga Science Diploma, Harmony Institute",
    experience: [
      "7 years teaching vinyasa and hatha",
      "Workshops at National Yoga Summit",
    ],
    certifications: [
      "RYT-500 (Yoga Alliance Registered 500-hour)",
      "Certified Prenatal Yoga Instructor",
    ],
    socials: {
      linkedin: "https://linkedin.com/in/janesmith",
      instagram: "https://instagram.com/janesmith",
    },
  },
  {
    id: 3,
    name: "Emre Yılmaz",
    specialty: "Cardio Specialist",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
    education: "M.S. in Sports Physiology, Heartland University",
    experience: [
      "6 years designing cardio programs for gyms",
      "University track team performance coach",
    ],
    certifications: [
      "ACSM-CEP (American College of Sports Medicine)",
      "Certified Indoor Cycling Instructor",
    ],
    socials: {
      linkedin: "https://linkedin.com/in/mikejohnson",
      instagram: "https://instagram.com/mikejohnson",
    },
  },
  {
    id: 4,
    name: "Zeynep Demir",
    specialty: "Nutrition Coach",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    education: "M.S. in Nutrition, Wellness University",
    experience: [
      "4 years as a registered dietitian",
      "Consultant for sports nutrition programs",
    ],
    certifications: [
      "CNS (Certified Nutrition Specialist)",
      "Precision Nutrition Level 2",
    ],
    socials: {
      linkedin: "https://linkedin.com/in/emilyclark",
      instagram: "https://instagram.com/emilyclark",
    },
  },
];

export default function Trainers({ token, onRequestBooking, onViewAvailability }) {
  const [selectedTrainerInfo, setSelectedTrainerInfo] = useState(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const openInfo = (trainer) => {
    setSelectedTrainerInfo(trainer);
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    setSelectedTrainerInfo(null);
    setIsInfoOpen(false);
  };

  return (
    <section id="trainers" className="py-20 bg-[#f0f9f0]" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-4" data-aos="zoom-in">
          Meet Our Trainers
        </h2>
        <div className="w-24 h-1 bg-green-700 mx-auto mb-12"></div>
        <div className={`grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center ${isInfoOpen ? "filter blur-sm" : ""}`}>
          {trainersData.map((trainer, index) => (
            <div
              key={trainer.id}
              className="relative bg-gradient-to-br from-white to-green-50 rounded-3xl shadow-xl overflow-hidden w-full max-w-sm flex flex-col items-center text-center transform transition-all duration-500 hover:scale-105 hover:shadow-2xl group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute -top-12 -left-12 w-36 h-36 bg-green-100 rounded-full opacity-20"></div>
              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-green-100 rounded-full opacity-20"></div>
              <div className="p-8 flex flex-col items-center w-full relative z-10">
                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-white shadow-lg group-hover:ring-4 group-hover:ring-green-300 transition">
                  <img src={trainer.img} alt={trainer.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-semibold text-green-800 mb-1">{trainer.name}</h3>
                <span className="w-10 h-1 bg-green-700 rounded-full mb-4"></span>
                <p className="text-green-600 text-lg font-medium mb-4">{trainer.specialty}</p>
                <div className="flex space-x-4 mb-6">
                  <a href={trainer.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5C4.98 5.43 3.42 7 1.5 7S-2 5.43-2 3.5 1.08 0 3 0s1.98 1.57 1.98 3.5zM.5 8.5h4V24h-4V8.5zm7.5 0h3.83v2.28h.05c.53-1 1.82-2.07 3.75-2.07 4.01 0 4.75 2.64 4.75 6.08V24h-4v-7.66c0-1.83-.03-4.18-2.55-4.18-2.56 0-2.95 2-2.95 4.05V24h-4V8.5z" /></svg>
                  </a>
                  <a href={trainer.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.19 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.403a4.92 4.92 0 011.764 1.147 4.92 4.92 0 011.147 1.764c.164.46.347 1.26.403 2.43.058 1.266.07 1.66.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.403 2.43a4.92 4.92 0 01-1.147 1.764 4.92 4.92 0 01-1.764 1.147c-.46.164-1.26.347-2.43.403-1.266.058-1.66.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.403a4.92 4.92 0 01-1.764-1.147 4.92 4.92 0 01-1.147-1.764c-.164-.46-.347-1.26-.403-2.43C2.175 15.747 2.163 15.353 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.97.403-2.43a4.92 4.92 0 011.147-1.764 4.92 4.92 0 011.764-1.147c.46-.164 1.26-.347 2.43-.403C8.416 2.175 8.81 2.163 12 2.163zm0-2.163C8.736 0 8.332.013 7.053.072 5.777.132 4.823.346 4.042.664a6.867 6.867 0 00-2.474 1.62 6.867 6.867 0 00-1.62 2.474c-.318.781-.531 1.735-.592 3.011C.013 8.332 0 8.736 0 12c0 3.264.013 3.668.072 4.947.061 1.276.274 2.23.592 3.011a6.867 6.867 0 001.62 2.474 6.867 6.867 0 002.474 1.62c.781.318 1.735.531 3.011.592C8.332 23.987 8.736 24 12 24s3.668-.013 4.947-.072c1.276-.061 2.23-.274 3.011-.592a6.867 6.867 0 002.474-1.62 6.867 6.867 0 001.62-2.474c.318-.781.531-1.735.592-3.011C23.987 15.668 24 15.264 24 12s-.013-3.668-.072-4.947c-.061-1.276-.274-2.23-.592-3.011a6.867 6.867 0 00-1.62-2.474 6.867 6.867 0 00-2.474-1.62c-.781-.318-1.735-.531-3.011-.592C15.668.013 15.264 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.999 3.999 0 110-7.998 3.999 3.999 0 010 7.998zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" /></svg>
                  </a>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => onRequestBooking(trainer)}
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    data-aos="zoom-in"
                    data-aos-delay={index * 150}
                  >
                    Book Class
                  </button>
                  <button
                    onClick={() => onViewAvailability(trainer)}
                    className="bg-white border border-green-500 text-green-600 hover:bg-green-100 font-medium py-2 px-4 rounded-full shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    data-aos="zoom-in"
                    data-aos-delay={index * 180}
                  >
                    View Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {isInfoOpen && selectedTrainerInfo && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
          <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm" onClick={closeInfo} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 mx-auto overflow-y-auto max-h-[80vh]" data-aos="zoom-in">
            <button
              onClick={closeInfo}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <div className="w-28 h-28 mb-3 rounded-full overflow-hidden border-2 border-green-200 shadow-md">
                <img src={selectedTrainerInfo.img} alt={selectedTrainerInfo.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-green-800 mb-1 text-center">
                {selectedTrainerInfo.name}
              </h3>
              <p className="text-green-600 text-lg md:text-xl font-medium mb-3 text-center">
                {selectedTrainerInfo.specialty}
              </p>
              <hr className="w-16 md:w-20 border-green-200" />
            </div>
            <div className="space-y-5 text-left px-2">
              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">Education</h4>
                <p className="text-gray-700 leading-relaxed">{selectedTrainerInfo.education}</p>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">Experience</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {selectedTrainerInfo.experience.map((exp, idx) => (
                    <li key={idx}>{exp}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">Certifications</h4>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {selectedTrainerInfo.certifications.map((cert, idx) => (
                    <li key={idx}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  onRequestBooking(selectedTrainerInfo);
                  closeInfo();
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2 px-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
              >
                Book Class
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
