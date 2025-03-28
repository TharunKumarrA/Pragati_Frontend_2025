import Link from "next/link";
import StatsBox from "./StatsBox";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";

const HeroLanding = () => {
  const notifText = (
    <div className="flex items-center">
      What&apos;s
      <MoveUpRight className="w-6 h-6 ml-2 font-extrabold" />
    </div>
  );
  
  return (
    <div className="relative min-h-screen flex flex-col cursor-default">
      {/* Hero Background */}
      <div
        className="flex flex-col items-center md:justify-start pt-12 flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Hero.webp')" }}
      >
        <div className="flex flex-row items-center justify-center gap-2 mt-8">
          {/* Organized by ASB */}
          <div className="flex flex-col gap-1 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50">
            <p className="text-white text-xs p-1 ">Organized by</p>
            <Link
              href="https://www.amrita.edu/school/business/coimbatore/"
              target="_blank"
              passHref
            >
              <Image
                src="/Images/ASB.png"
                width={148}
                height={100}
                alt="ASB Logo"
                className="bg-white/5 backdrop-blur-sm border border-white rounded-b-xl"
              />
            </Link>
          </div>

          {/* Sponsored by BNY Mellon */}
          <div className="flex flex-col bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50">
            <p className="text-white text-xs p-1">Title Sponsor</p>
            <Link
              href="https://www.bny.com/corporate/global/en.html"
              target="_blank"
              passHref
            >
              <Image
                src="/Images/BNY.png"
                width={128}
                height={50}
                alt="BNY Logo"
                className="bg-white/5 backdrop-blur-sm border border-white rounded-b-xl fit"
              />
            </Link>
          </div>
        </div>
        {/* Title & Subtitle */}
        <h1 className="mt-8 px-8 text-center font-bold text-[3.5rem] md:text-[7rem] heading md:leading-[75%] leading-[85%] text-white">
          PRAGATI 2025
        </h1>
        <p className="text-xl md:text-2xl leading-[100%] px-8 text-white text-center mt-0">
          Where ancient wisdom meets modern innovation
        </p>
        <div className="flex flex-col gap-1 bg-white/30 backdrop-blur-sm rounded-xl border border-white/20 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50 p-3 text-slate-700 mt-4">
          March 3rd & 4th, 2025
        </div>
      </div>

      {/* Centered Mascot */}
      {/* <div
        className="scale-75 absolute top-1/2 left-1/2 transform -translate-x-[40%] -translate-y-[20%]
        shadow-[0_5px_20px_rgba(255,255,255,0.15)] 
        p-4 bg-white/5 border border-white/10 flex items-center justify-center 
        transition-all duration-500 hover:scale-103 hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)]"
      >
        <Image
          src="/Images/mascot.png"
          alt="Mascot"
          width={200}
          height={200}
          className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
        />
      </div> */}

      <div className="absolute bottom-[4rem] w-full px-6 mx-auto flex flex-col items-center">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:flex px-4 md:items-center gap-2 md:gap-3 md:justify-center mt-6">
          <div className="w-full md:w-auto">
            <StatsBox title="Participants" value="1000+" />
          </div>
          <div className="grid grid-cols-2 md:flex md:justify-center gap-2 md:gap-3 w-full md:w-auto">
            <StatsBox title="Events" value="20+" />
            <Link href={"/notifications"}>
              <StatsBox title="Happening" value={notifText} />
            </Link>
          </div>
        </div>

        {/* Events Button */}
        <div className="flex justify-center mt-4">
          <Link
            href="/events"
            className="flex flex-row justify-center items-center align-middle px-4 md:px-12 py-2 text-lg md:text-3xl tracking-wider text-center text-black 
               border-2 border-black bg-[linear-gradient(90deg,#FACC15,#E8D096)] rounded-full [font-family:var(--font-chicavenue)] hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:bg-opacity-80 
             active:scale-95 active:translate-y-0 focus:outline-none transition-all duration-300 transform"
            tabIndex={0}
          >
            Register for Events
            <MoveUpRight className="w-6 h-6 ml-2 font-extrabold" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroLanding;
