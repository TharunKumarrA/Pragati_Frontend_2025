"use client";
import React from "react";
import GodsGallery from "@/app/components/11_gods/gods_gallery";
import { useRouter } from "next/navigation";

function OlympicConclave() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center px-4 md:px-16 pt-8 pb-8 bg-[linear-gradient(180deg,#FFF 0%,#E8D096 100%)] w-full h-screen overflow-hidden">
      {/* Main content area */}
      <div className="h-4/5 cursor-default flex flex-col justify-center items-center">
        <div className="text-3xl tracking-wider text-center text-black max-md:text-2xl [font-family:var(--font-chicavenue)]">
          know your
        </div>
        <div className="text-5xl tracking-wider text-center text-black max-md:max-w-full max-md:text-3xl [font-family:var(--font-chicavenue)]">
          OLYMPIANS
        </div>
        <div className="w-full mt-3 overflow-hidden px-8 max-md:px-0">
          <GodsGallery />
        </div>
      </div>

      {/* Register text */}
      <div className="mt-8 text-base tracking-wide text-center text-black w-full max-w-md [font-family:var(--font-poppins)] cursor-default max-md:text-sm">
        Register to events and help your God win the Olympic Conclave
      </div>

      {/* Events Button */}
      <button
        onClick={() => router.push("/upcoming")}
        className="mt-4 px-8 md:px-12 py-2 md:py-3 text-xl md:text-3xl tracking-wider text-center text-black 
             border-2 border-black bg-[linear-gradient(90deg,#FACC15,#E8D096)] rounded-full 
             transition-all duration-300 transform 
             hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-opacity-80 
             active:scale-95 active:translate-y-0 focus:outline-none [font-family:var(--font-chicavenue)]"
        tabIndex={0}
      >
        EVENTS
      </button>
    </div>
  );
}

export default OlympicConclave;
