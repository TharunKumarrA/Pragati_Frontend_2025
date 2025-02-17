import React from "react";
import Link from "next/link";
import TermsAndConditionsContent from "../components/TermsAndConditions";

const PrivacyPolicy = () => {
  return (
    <div
      className="min-h-screen text-black px-8 py-16"
      style={{
        background: "linear-gradient(180deg, #FFF 0%, #E8D096 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <TermsAndConditionsContent />
        <div className="flex justify-center mt-8">
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
