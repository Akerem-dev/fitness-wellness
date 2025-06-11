
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-700 to-green-800 text-white pt-12 pb-6 mt-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="md:w-1/3 mb-6 md:mb-0 text-left">
            <h3 className="text-2xl font-bold">NaturaFitness</h3>
            <p className="mt-2 text-gray-200">
              Empower your body, elevate your life.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-8 md:gap-16 md:w-2/3">
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-white">About Us</a></li>
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#packages" className="hover:text-white">Packages</a></li>
                <li><a href="#trainers" className="hover:text-white">Trainers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal & Help</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="/contact" className="hover:text-white">Contact Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="border-green-600 mb-6" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NaturaFitness. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
