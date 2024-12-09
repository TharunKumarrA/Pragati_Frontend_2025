import React from "react";
import StatsBox from "./components/StatsBox";

const HeroLanding = () => {
  return (
    <div className="relative h-screen flex flex-col">
      <div
        className="flex flex-col items-center sm:justify-center md:justify-start pt-16 flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Hero.webp')" }}
      >
        <div className="mt-3 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-xl">
          <div className="flex gap-2 items-center justify-center">
            <img
              src="/Assets/location.png"
              className="w-6 h-6"
              alt="Location Icon"
            />
            <p className="text-sm md:text-lg font-normal text-white text-center">
              Amrita School of Business, Coimbatore
            </p>
          </div>
        </div>
        <h1 className="mt-8 px-8 text-center font-bold text-[3.5rem] md:text-[3rem] lg:text-[7.2rem] leading-[85%] heading text-white">
          PRAGATI 2025
        </h1>
        <p className="text-xl md:text-2xl leading-[100%] px-8 text-white text-center mt-0 ">
          Where ancient wisdom meets modern innovation
        </p>
      </div>

      <div className="absolute bottom-[4rem] w-full px-6 mx-auto">
        <div className="grid grid-cols-1 md:flex px-4 md:items-center gap-2 md:gap-3 md:justify-center">
          <div className="w-full md:w-auto">
            <StatsBox title="Participants" value="2000+" />
          </div>
          <div className="grid grid-cols-2 md:flex md:justify-center gap-2 md:gap-3 w-full md:w-auto">
            <StatsBox title="Events" value="40+" />
            <StatsBox title="Sponsors" value="15+" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroLanding;
