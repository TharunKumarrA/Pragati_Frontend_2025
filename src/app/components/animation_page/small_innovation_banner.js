"use client";

import Image from "next/image";

export default function SmallInnovationBanner() {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden px-4 mx-auto md:hidden">
      {/* Text Content */}
      <div className="absolute text-center z-10">
        <p className="text-[8vw] [font-family:var(--font-poppins)] leading-tight">Where</p>
        <h1 className="text-[15vw] [font-family:var(--font-chicavenue)] leading-none">GODS</h1>
        <p className="text-[8vw] [font-family:var(--font-poppins)] leading-tight">meet</p>
        <h1 className="text-[15vw] [font-family:var(--font-chicavenue)] leading-none">INNOVATION</h1>
      </div>

      {/* Robot Hand */}
      <Image
        src={"Images/robot_hand_alpha.png"}
        alt="Robot Hand"
        width={200}
        height={150}
        className="absolute bottom-[50%] right-[0%] scale-10"
        priority
      />

      {/* Human Hand */}
      <Image
        src={"Images/human_hand_alpha.png"}
        alt="Human Hand"
        width={200}
        height={150}
        className="absolute top-[45%] left-[0%] scale-10"
        priority
      />
    </section>
  );
}