// src/App.js

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Services from "./components/Services";
import Packages from "./components/Packages";
import Trainers from "./components/Trainers";
import Contact from "./components/Contact";
import Reviews from "./components/Reviews";
import ActiveMembers from "./components/ActiveMembers";
import Users from "./components/Users";
import Profile from "./components/Profile";
import BMICalculator from "./components/BMICalculator";
import PlanBuilder from "./components/PlanBuilder";
import BookingModal from "./components/BookingModal";
import TrainerAvailability from "./components/TrainerAvailability";
import PurchaseModal from "./components/PurchaseModal";
import MyBookings from "./components/MyBookings";
import ModalWrapper from "./components/ModalWrapper";
import Footer from "./components/Footer";

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const raw = localStorage.getItem("currentUser");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const [modalType, setModalType] = useState(null);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [bmiOpen, setBmiOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingInfo, setBookingInfo] = useState(null);
  const [availOpen, setAvailOpen] = useState(false);
  const [selectedTrainerForAvail, setSelectedTrainerForAvail] = useState(null);
  const [refreshActive, setRefreshActive] = useState(false);
  const [refreshBookings, setRefreshBookings] = useState(false);

  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const handleOpenModal = (type) => setModalType(type);

  const handleLogin = (userData) => {
    setCurrentUser({ fullName: userData.fullName, email: userData.email });
    setToken(userData.token);
    localStorage.setItem("token", userData.token);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({ fullName: userData.fullName, email: userData.email })
    );
    setModalType(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    setProfileOpen(false);
    setBmiOpen(false);
    setPlanOpen(false);
    setBookingOpen(false);
    setAvailOpen(false);
  };

  // Paket satın alma
  const handleBuyClick = (pkg) => {
    setSelectedPackage(pkg);
    setPurchaseOpen(true);
  };
  const handleClosePurchase = () => {
    setPurchaseOpen(false);
    setSelectedPackage(null);
  };
  const handlePurchaseSuccess = () => setRefreshActive((prev) => !prev);

  // Profil modal
  const handleOpenProfile = () => setProfileOpen(true);
  const handleCloseProfile = () => setProfileOpen(false);

  // Rezervasyon modalı ve booking başarı mesajı
  const handleBookClass = (trainer) => {
    setBookingInfo(trainer);
    setBookingOpen(true);
  };
  const handleAfterBooked = () => {
    setBookingOpen(false);
    setBookingSuccess(true);
    setRefreshBookings((prev) => !prev);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  // Trainer availability
  const handleViewAvailability = (trainer) => {
    setSelectedTrainerForAvail(trainer);
    setAvailOpen(true);
  };
  const handleCloseAvail = () => {
    setAvailOpen(false);
    setSelectedTrainerForAvail(null);
  };

  // Statik paketler (örnek)
  const staticPackages = [
    {
      id: 1,
      name: "Basic Fit",
      price: 40,
      duration_days: 30,
      description:
        "Access to gym facilities during off-peak hours, locker room included, and free water bottles.",
    },
    {
      id: 2,
      name: "Pro Fit",
      price: 60,
      duration_days: 30,
      description:
        "Unlimited gym access, 2 personal training sessions, free nutritional guide, and sauna privilege.",
    },
    {
      id: 3,
      name: "Yoga Master",
      price: 50,
      duration_days: 30,
      description:
        "Daily yoga and meditation classes, one private yoga session per month, and mindfulness workshop access.",
    },
    {
      id: 4,
      name: "Cardio King",
      price: 35,
      duration_days: 30,
      description:
        "Unlimited cardio classes, heart rate tracking, one cardio fitness assessment, and group run events.",
    },
  ];

  return (
    <>
      {/* HEADER */}
      <Header
        currentUser={currentUser}
        onOpenModal={handleOpenModal}
        onOpenProfile={handleOpenProfile}
        onLogout={handleLogout}
      />

      {/* MODAL & MAIN */}
      {modalType && (
        <ModalWrapper onClose={() => setModalType(null)}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 mx-auto overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <Users
              mode={modalType}
              onClose={() => setModalType(null)}
              onLogin={handleLogin}
            />
          </div>
        </ModalWrapper>
      )}

      {purchaseOpen && selectedPackage && (
        <ModalWrapper onClose={handleClosePurchase}>
          <PurchaseModal
            isOpen={purchaseOpen}
            onClose={handleClosePurchase}
            packageName={selectedPackage.name}
            packagePrice={selectedPackage.price}
            packageId={selectedPackage.id}
            token={token}
            onPurchased={handlePurchaseSuccess}
          />
        </ModalWrapper>
      )}

      {profileOpen && currentUser && (
        <ModalWrapper onClose={handleCloseProfile}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 mx-auto overflow-y-auto max-h-[80vh]">
            <button
              onClick={handleCloseProfile}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <Profile currentUser={currentUser} />
          </div>
        </ModalWrapper>
      )}

      {bmiOpen && (
        <ModalWrapper onClose={() => setBmiOpen(false)}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 mx-auto overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setBmiOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <BMICalculator />
          </div>
        </ModalWrapper>
      )}

      {planOpen && (
        <ModalWrapper onClose={() => setPlanOpen(false)}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 mx-auto overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setPlanOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <PlanBuilder />
          </div>
        </ModalWrapper>
      )}

      {bookingOpen && bookingInfo && (
        <ModalWrapper onClose={() => setBookingOpen(false)}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 mx-auto overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setBookingOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <BookingModal
              isOpen={bookingOpen}
              onClose={() => setBookingOpen(false)}
              classInfo={bookingInfo}
              token={token}
              onBooked={handleAfterBooked}
            />
          </div>
        </ModalWrapper>
      )}

      {availOpen && selectedTrainerForAvail && (
        <ModalWrapper onClose={handleCloseAvail}>
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 mx-auto overflow-y-auto max-h-[80vh]">
            <button
              onClick={handleCloseAvail}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl focus:outline-none"
            >
              &times;
            </button>
            <TrainerAvailability
              isOpen={availOpen}
              onClose={handleCloseAvail}
              trainer={selectedTrainerForAvail}
              token={token}
              onBook={handleBookClass}
            />
          </div>
        </ModalWrapper>
      )}

      {/* ANA İÇERİK */}
      <main className="pt-20">
        {/* HERO */}
        <section data-aos="fade-down" data-aos-duration="500">
          <HeroSection />
        </section>

        {/* ABOUT */}
        <section id="about" data-aos="fade-up" data-aos-duration="500">
          <About />
        </section>

        {/* SERVICES */}
        <section
          id="services"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
        >
          <Services />
        </section>

        {/* TOOLS (BMI + PLAN BUILDER) */}
        <section
          id="tools"
          className="py-20 bg-[#f0f9f0]"
          data-aos="fade-up"
          data-aos-duration="500"
        >
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
              Explore Our Tools
            </h2>
            <div className="w-24 h-1 bg-green-700 mx-auto mb-12"></div>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
              {/* BMI Calculator Card */}
              <div
                className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay="100"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>
                <div className="p-10 flex flex-col items-center space-y-6 relative z-10">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-green-200 to-green-400 mb-2 group-hover:from-green-300 group-hover:to-green-500 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8c-1.252 0-2.55.514-3.435 1.340A4.992 4.992 0 006 12.5v2a2.5 2.5 0 005 0v-2c0-.466.157-.905.423-1.270A3.975 3.975 0 0112 8zm-6 8h12m-6 4v-2"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-green-800">
                    BMI Calculator
                  </h3>
                  <p className="text-gray-600 text-center px-4">
                    Calculate your Body Mass Index quickly and easily. Track your
                    progress over time!
                  </p>
                  <button
                    onClick={() => setBmiOpen(true)}
                    className="mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105"
                  >
                    Open BMI Calculator
                  </button>
                </div>
              </div>

              {/* Workout Plan Builder Card */}
              <div
                className="group relative bg-white rounded-3xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-30"></div>
                <div className="p-10 flex flex-col items-center space-y-6 relative z-10">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-green-200 to-green-400 mb-2 group-hover:from-green-300 group-hover:to-green-500 transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-green-800">
                    Workout Plan Builder
                  </h3>
                  <p className="text-gray-600 text-center px-4">
                    Create personalized workout plans tailored to your goals and
                    schedule. Achieve results faster!
                  </p>
                  <button
                    onClick={() => setPlanOpen(true)}
                    className="mt-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg transition transform hover:scale-105"
                  >
                    Open Workout Plan Builder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section
          id="packages"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
        >
          <Packages staticList={staticPackages} onBuyClick={handleBuyClick} />
        </section>

        {/* TRAINERS */}
        <section
          id="trainers"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
        >
          <Trainers
            token={token}
            onRequestBooking={handleBookClass}
            onViewAvailability={handleViewAvailability}
          />
        </section>

        {/* CONTACT */}
        <section
          id="contact"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
        >
          <Contact currentUser={currentUser} />
        </section>

        {/* REVIEWS */}
        <section
          id="reviews"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
          className="bg-[#f0f9f0] py-16"
        >
          <Reviews currentUser={currentUser} token={token} />
        </section>

        {/* ACTIVE MEMBERS */}
        <section
          id="activemembers"
          data-aos="fade-up"
          data-aos-duration="500"
          data-aos-delay="100"
        >
          <ActiveMembers refreshTrigger={refreshActive} />
        </section>

        {/* MY BOOKINGS */}
        <section id="mybookings" className="py-10 bg-[#f0f9f0]">
          {bookingSuccess && (
            <div className="mb-6 flex justify-center">
              <span className="bg-green-100 text-green-800 rounded-xl px-6 py-3 font-medium shadow text-xl transition">
                Booking completed!
              </span>
            </div>
          )}
          {token ? (
            <MyBookings token={token} refreshTrigger={refreshBookings} />
          ) : (
            <p className="text-center text-red-500">
              You must be logged in to see your bookings.
            </p>
          )}
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

export default App;
