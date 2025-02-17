"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmallInnovationBanner() {
  const bannerRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;

    gsap.fromTo(
      banner.querySelectorAll("p, h1"),
      { opacity: 0, y: 50 }, 
      {
        opacity: 1,
        y: 0, 
        duration: 1.3,
        stagger: 0.3, 
        scrollTrigger: {
          trigger: banner,
          start: "top 80%", 
          end: "bottom 20%", 
          toggleActions: "play reverse play reverse", 
        },
      }
    );
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative w-full h-[60vh] sm:h-[70vh] flex items-center justify-center overflow-hidden px-4 mx-auto md:hidden"
    >
      {/* Text Content */}
      <div className="absolute text-center z-10">
        <p className="text-[8vw] [font-family:var(--font-poppins)] leading-tight">Where</p>
        <h1 className="text-[15vw] [font-family:var(--font-chicavenue)] leading-none">GODS</h1>
        <p className="text-[8vw] [font-family:var(--font-poppins)] leading-tight">meet</p>
        <h1 className="text-[15vw] [font-family:var(--font-chicavenue)] leading-none">INNOVATION</h1>
      </div>

      {/* Robot Hand */}
      <Image
        src={"/Images/robot_hand_alpha.png"}
        alt="Robot Hand"
        width={200}
        height={150}
        className="absolute bottom-[55%] -right-[12%] scale-10 z-20"
        priority
      />

      {/* Human Hand */}
      <Image
        src={"/Images/human_hand_alpha.png"}
        alt="Human Hand"
        width={200}
        height={150}
        className="absolute top-[41%] -left-[12%] scale-10 z-20"
        priority
      />
    </section>
  );
}
