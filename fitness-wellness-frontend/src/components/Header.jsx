
import React from "react";
import logo from "../assets/logo.png";

export default function Header({ currentUser, onOpenModal, onOpenProfile, onLogout }) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-green-700 to-green-900 shadow">
      <div className="w-full flex items-center justify-between h-20 px-6">
        {/* LOGO */}
        <div className="flex items-center">
          <img src={logo} alt="NaturaFitness" className="h-14 w-auto" />
        </div>

        {/* MENÜ + AUTH */}
        <div className="flex items-center space-x-6">
          {/* Nav Linkleri */}
          <nav className="flex items-center space-x-6 text-white">
            <a href="#about" className="hover:text-green-300">About</a>
            <a href="#packages" className="hover:text-green-300">Packages</a>
            <a href="#services" className="hover:text-green-300">Services</a>
            <a href="#trainers" className="hover:text-green-300">Trainers</a>
            <a href="#contact" className="hover:text-green-300">Contact</a>
            <a href="#reviews" className="hover:text-green-300">Reviews</a>
          </nav>

          {/* Kayıt/Giriş veya Profil/Çıkış */}
          {!currentUser ? (
            <>
              <button
                onClick={() => onOpenModal("signup")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Sign Up
              </button>
              <button
                onClick={() => onOpenModal("login")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Log In
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenProfile}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Profile
              </button>
              <span className="text-white font-medium">
                Welcome, {currentUser.fullName}!
              </span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
