import StatsBox from "./StatsBox";
import Image from "next/image";
import Link from 'next/link';

const HeroLanding = () => {
  return (
    <div className="relative h-screen flex flex-col cursor-default">
      <div
        className="flex flex-col items-center sm:justify-center md:justify-start pt-12 flex-grow bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/Hero.webp')" }}
      >
        <Link href="https://www.amrita.edu/school/business/coimbatore/" target="_blank" passHref>
        <div className="mt-3 px-3 py-2 bg-white/5 backdrop-blur-sm border border-white rounded-xl transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50 hover:ring-2 hover:ring-[#f3e5c0]/50">

          <div className="flex gap-2 items-center justify-center">
            <Image
              src="/Assets/location.png"
              width={17}
              height={17}
              alt="Location Icon"
              className="w-5 h-5"
            />
            <p className="text-sm md:text-lg font-normal text-white text-center">
              Amrita School of Business, Coimbatore
            </p>
          </div>
        </div>
        </Link>
        <h1 className="mt-8 px-8 text-center font-bold text-[3.5rem] md:text-[6.2rem] heading md:leading-[75%] leading-[85%] text-white">
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
