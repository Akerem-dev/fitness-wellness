// src/components/Users.jsx
import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Users({ mode, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Register
  const handleRegisterSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setErrorMessage("Please enter both first name and last name.");
      return;
    }
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API}/user/register`, {
        firstName,
        lastName,
        email,
        password,
      });
      const { fullName, token } = response.data;
      onLogin({ fullName, email, token });
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Login
  const handleLoginSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    try {
      setIsSubmitting(true);
      const response = await axios.post(`${API}/user/login`, {
        email,
        password,
      });
      const { fullName, token } = response.data;
      onLogin({ fullName, email, token });
      onClose();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage("Email or password is incorrect.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {mode === "signup" ? (
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Register</h2>
          <div className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Cancel</button>
            <button
              onClick={handleRegisterSubmit}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Registering…" : "Register"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Log In</h2>
          <div className="space-y-3">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
          <div className="mt-6 flex justify-end space-x-3">
            <button onClick={onClose} className="text-gray-600 hover:text-gray-800">Cancel</button>
            <button
              onClick={handleLoginSubmit}
              disabled={isSubmitting}
              className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition disabled:opacity-50"
            >
              {isSubmitting ? "Logging In…" : "Log In"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
