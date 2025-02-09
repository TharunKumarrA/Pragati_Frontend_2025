"use client";
import React from "react";
import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function UpcomingPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      {/* Overlay for better contrast with your background image */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-white">
          Registrations Opening Soon
        </h1>
        <p className="mt-4 text-xl text-white">Stay tuned for more details.</p>

        {/* Social Links with Lucide Icons */}
        <div className="mt-6 flex space-x-6">
          <a
            href="https://www.facebook.com/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition-colors duration-300"
          >
            <Facebook size={30} />
          </a>
          <a
            href="https://www.twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors duration-300"
          >
            <Twitter size={30} />
          </a>
          <a
            href="https://www.instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition-colors duration-300"
          >
            <Instagram size={30} />
          </a>
          {/* Add more social links as needed */}
        </div>

        {/* Go to Home Button */}
        <div className="mt-8">
          <Link href="/" passHref>
            <button
              className="px-6 py-3 border-2 border-white rounded-full text-xl text-white transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black focus:outline-none"
              tabIndex={0}
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
