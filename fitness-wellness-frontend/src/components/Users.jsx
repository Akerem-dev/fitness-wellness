
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
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        
        `${API || ""}/api/user/register`, 
        { firstName, lastName, email, password }
      );
      const { fullName, token } = res.data;
      onLogin({ fullName, email, token });
      onClose();
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  
  const handleLoginSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await axios.post(
        `${API || ""}/api/user/login`,
        { email, password }
      );
      const { fullName, token } = res.data;
      onLogin({ fullName, email, token });
      onClose();
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Email or password is incorrect."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      {mode === "signup" ? (
        <>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Register</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button
              onClick={handleRegisterSubmit}
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Registering…" : "Register"}
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Log In</h2>
          <div className="space-y-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-300"
            />
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <div className="flex justify-end space-x-3">
            <button onClick={onClose} className="text-gray-600">Cancel</button>
            <button
              onClick={handleLoginSubmit}
              disabled={isSubmitting}
              className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Logging In…" : "Log In"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
