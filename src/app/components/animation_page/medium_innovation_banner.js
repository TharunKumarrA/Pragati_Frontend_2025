"use client";

import Image from "next/image";

export default function MediumInnovationBanner() {
  return (
    <section className="relative w-full h-screen sm:h-[500px] flex items-center justify-center overflow-hidden px-4 sm:px-8 mx-auto hidden md:flex lg:hidden">
      {/* Text Content */}
      <div className="absolute text-center">
        <p className="text-[8vw] sm:text-[48px] [font-family:var(--font-poppins)]">Where</p>
        <h1 className="text-[14vw] sm:text-[72px] [font-family:var(--font-chicavenue)] leading-tight">GODS</h1>
        <p className="text-[8vw] sm:text-[48px] [font-family:var(--font-poppins)]">meet</p>
        <h1 className="text-[14vw] sm:text-[72px] [font-family:var(--font-chicavenue)] leading-tight">INNOVATION</h1>
      </div>

      {/* Robot Hand */}
      <Image
        src={"Images/robot_hand_alpha.png"}
        alt="Robot Hand"
        width={300}
        height={200}
        className="absolute bottom-[30%] right-[5%] sm:bottom-60 sm:right-0 scale-50 sm:scale-100"
        priority
      />

      {/* Human Hand */}
      <Image
        src={"Images/human_hand_alpha.png"}
        alt="Human Hand"
        width={300}
        height={200}
        className="absolute top-[30%] left-[5%] sm:top-40 sm:left-0 scale-50 sm:scale-100"
        priority
      />
    </section>
  );
}