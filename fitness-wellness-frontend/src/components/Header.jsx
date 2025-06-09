// src/components/Header.jsx
import React from "react";
import logo from "../assets/logo.png"; // Logo varsa assets'e ekle

export default function Header({ currentUser, onOpenModal, onOpenProfile, onLogout }) {
  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-700 to-green-900 shadow"
    >
      <div className="flex items-center justify-between h-20 px-4 max-w-7xl mx-auto">
        {/* Sol: Logo */}
        <div className="flex items-center">
          <img src={logo} alt="NaturaFitness" className="h-14 w-auto mr-3" />
          <span className="text-2xl font-bold text-white">NaturaFitness</span>
        </div>
        {/* Sağ: Menü */}
        <nav className="flex items-center gap-4 text-white">
          <a href="#about" className="hover:text-green-300">About</a>
          <a href="#packages" className="hover:text-green-300">Packages</a>
          <a href="#services" className="hover:text-green-300">Services</a>
          <a href="#trainers" className="hover:text-green-300">Trainers</a>
          <a href="#contact" className="hover:text-green-300">Contact</a>
          <a href="#reviews" className="hover:text-green-300">Reviews</a>
          {!currentUser ? (
            <>
              <button onClick={() => onOpenModal("signup")} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Sign Up
              </button>
              <button onClick={() => onOpenModal("login")} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Log In
              </button>
            </>
          ) : (
            <>
              <button onClick={onOpenProfile} className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Profile
              </button>
              <span className="ml-2">Welcome, {currentUser.fullName}!</span>
              <button onClick={onLogout} className="ml-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
                Log Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
