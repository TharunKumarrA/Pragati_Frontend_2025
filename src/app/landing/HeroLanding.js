import React from "react";
import StatsBox from "./components/StatsBox";

const HeroLanding = () => {
  return (
    <div className="relative h-screen flex flex-col">
      <div
        className="flex flex-col items-center justify-start pt-16 flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Hero.webp')" }}
      >
        <div className="mt-8 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-xl">
          <div className="flex gap-2 items-center justify-center">
            <img src="/Assets/location.png" className="w-6 h-6" />
            <p className="text-lg font-normal text-white">
              Amrita School of Business, Coimbatore
            </p>
          </div>
        </div>
        <h1 className="mt-2 sm:text-[48px] lg:text-[7.2rem] leading-[100%] heading text-white">
          PRAGATI 2025
        </h1>
        <p className="text-2xl text-white">
          Where ancient wisdom meets modern innovation
        </p>
      </div>

      <div className="absolute bottom-10 w-full py-6">
        <div className="flex sm:flex-col md:flex-row justify-center gap-4">
          <StatsBox title="Events" value="25+" />
          <StatsBox title="Participants" value="2000+" />
          <StatsBox title="Sponsors" value="15+" />
        </div>
      </div>
    </div>
  );
};

export default HeroLanding;
