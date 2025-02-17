import React from "react";
import Link from "next/link";
import PrivacyPolicyContent from "../components/PrivacyPolicy";

const PrivacyPolicy = () => {
  return (
    <div
      className="min-h-screen text-black px-8 py-16"
      style={{
        background: "linear-gradient(180deg, #FFF 0%, #E8D096 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <PrivacyPolicyContent />
        <div className="flex justify-center mt-8">
          <Link
            href="/"
            className="text-[#1a1a1a] px-6 py-2 rounded-full border-2 border-[#5b4711] bg-opacity-72 bg-[#fde6a8] transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 active:scale-95 items-center justify-center "
          >
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
