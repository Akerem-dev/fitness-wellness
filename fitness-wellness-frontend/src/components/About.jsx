// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section id="about" className="relative">
      <div className="flex flex-col md:flex-row w-full" style={{ minHeight: '80vh' }}>
        <div
          className="md:w-2/5 w-full flex justify-center items-center py-12"
          style={{ backgroundColor: '#cfe6b2' }}
          data-aos="fade-right"
        >
          <img
            src="/about.png"
            alt="NaturaFitness Logo"
            className="object-contain"
          />
        </div>
        <div
          className="md:w-3/5 w-full bg-green-800 flex flex-col justify-center items-start px-8 md:px-16 py-12 text-white"
          data-aos="fade-left"
        >
          <h2 className="text-4xl md:text-5xl font-semibold mb-4">
            About NaturaFitness
          </h2>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            At NaturaFitness, we don’t just train bodies—we transform lifestyles.
            Our programs are tailored to each individual, combining expert guidance
            with a supportive community.
          </p>
          <p className="text-lg md:text-xl leading-relaxed mb-8">
            Join us and discover your potential. Your journey to a healthier,
            happier you starts here.
          </p>
          <button
            onClick={openModal}
            className="bg-green-600 hover:bg-green-700 transition-colors duration-200 transform hover:scale-105 text-white font-medium py-3 px-6 rounded-lg"
          >
            Learn More
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center px-4 z-50">
          <div
            className="absolute inset-0 bg-white bg-opacity-10 backdrop-blur-sm"
            onClick={closeModal}
          />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg p-6 mx-auto overflow-y-auto max-h-[80vh]"
            data-aos="zoom-in"
          >
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-green-800 mb-4">
              Who We Are & Our Mission
            </h3>
            <div className="text-gray-700 space-y-4">
              <p>
                <strong>Who We Are: </strong>
                NaturaFitness is a team of passionate fitness professionals,
                wellness coaches, and nutrition experts dedicated to helping
                individuals achieve their health goals. We believe that
                true transformation begins with a holistic approach—balancing
                physical exercise, proper nutrition, and mental well-being
                in a supportive environment.
              </p>
              <p>
                <strong>When We Were Founded: </strong>
                We officially opened our doors in the spring of 2018,
                founded by two lifelong friends who shared a vision: to create
                a fitness community that emphasizes both personal growth and
                sustainable, healthy living. Since then, we have grown into
                a trusted local brand, serving thousands of members from
                diverse backgrounds.
              </p>
              <p>
                <strong>Our Purpose: </strong>
                Our mission is to empower every member to discover their full
                potential—physically, mentally, and emotionally. We strive to
                create programs that are accessible to beginners and challenging
                for advanced athletes, ensuring that everyone feels welcomed
                and motivated. At NaturaFitness, it’s not just about lifting weights;
                it’s about lifting spirits.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
