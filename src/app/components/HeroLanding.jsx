import StatsBox from "./StatsBox";
import Image from "next/image";
import Link from "next/link";

const HeroLanding = () => {
  return (
    <div className="relative h-screen flex flex-col cursor-default">
      {/* Hero Background */}
      <div
        className="flex flex-col items-center sm:justify-center md:justify-start pt-12 flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Hero.webp')" }}
      >
        {/* ASB & BNY Logos in Glassmorphic Cards */}
        <div className="flex flex-row gap-6 mt-10">
          {/* ASB Section */}
          <Link
            href="https://www.amrita.edu/school/business/coimbatore/"
            target="_blank"
            passHref
          >
            <div
              className="flex flex-col items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/15 
              rounded-xl transform transition-all duration-500 ease-in-out 
              hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50 
              hover:ring-2 hover:ring-[#f3e5c0]/50"
            >
              {/* Label */}
              <p className="text-xs md:text-xs text-white/80 tracking-wide">
                Organized by
              </p>
              {/* Logo */}
              <Image
                src="/Images/ASB.png"
                width={120}
                height={120}
                alt="ASB Logo"
                className="w-[100px] md:w-[120px] h-auto -mt-3"
              />
            </div>
          </Link>

          {/* BNY Mellon Section */}
          <div
            className="flex flex-col items-center gap-2 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/15 
            rounded-xl transform transition-all duration-500 ease-in-out 
            hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50 
            hover:ring-2 hover:ring-[#f3e5c0]/50"
          >
            {/* Label */}
            <p className="text-xs md:text-xs text-white/80 tracking-wide">
              Title Sponsor
            </p>
            {/* Logo */}
            <Image
              src="/Images/BNY.png"
              width={140}
              height={50}
              alt="BNY Mellon Logo"
              className="w-[100px] md:w-[120px] h-auto -mt-3"
            />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="mt-8 px-8 text-center font-bold text-[3.5rem] md:text-[7rem] heading md:leading-[75%] leading-[85%] text-white">
          PRAGATI 2025
        </h1>
        <p className="text-xl md:text-2xl leading-[100%] px-8 text-white text-center mt-0">
          Where ancient wisdom meets modern innovation
        </p>
      </div>

      {/* Centered Mascot */}
      <div
        className="scale-75 absolute top-1/2 left-1/2 transform -translate-x-[40%] -translate-y-[20%]
     z-10 rounded-full backdrop-blur-lg shadow-[0_5px_20px_rgba(255,255,255,0.15)] 
     p-4 bg-white/5 border border-white/10 flex items-center justify-center 
     transition-all duration-500 hover:scale-103 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
      >
        <Image
          src="/Images/mascot.png"
          alt="Mascot"
          width={200}
          height={200}
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full"
        />
      </div>

      {/* Stats Section */}
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
