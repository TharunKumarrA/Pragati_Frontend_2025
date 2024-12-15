"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function LargeInnovationBanner() {
  const containerRef = useRef(null);
  const robotHandRef = useRef(null);
  const humanHandRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Robot Hand Animation
      gsap.fromTo(
        robotHandRef.current,
        {
          x: 900,
          y: -400,
          rotation: -30,
          opacity: 0,
        },
        {
          x: 480,
          y: -180,
          rotation: 0,
          opacity: 1,
          duration: 8,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 100%",
            end: "top 10%",
            scrub: 3,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Human Hand Animation
      gsap.fromTo(
        humanHandRef.current,
        {
          x: -900,
          y: 400,
          rotation: 30,
          opacity: 0,
        },
        {
          x: -500,
          y: 50,
          rotation: 0,
          opacity: 1,
          duration: 8,
          ease: "expo.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 100%",
            end: "top 10%",
            scrub: 3,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Parallax Effect on Text content
      gsap.fromTo(
        textRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 6,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 2,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full max-w-[1560px] h-[80vh] overflow-hidden mx-auto flex items-center justify-center px-4 sm:px-8 hidden md:hidden lg:flex"
      style={{ position: "relative" }}
    >
      {/* Robot Hand */}
      <Image
        ref={robotHandRef}
        src={"/Images/robot_hand_alpha.png"}
        alt="Robot Hand"
        width={600}
        height={600}
        priority
        suppressHydrationWarning
        style={{
          transform: "translate(900px, -400px) rotate(-30deg)",
          opacity: 0,
          position: "absolute",
        }}
      />

      {/* Human Hand */}
      <Image
        ref={humanHandRef}
        src={"/Images/human_hand_alpha.png"}
        alt="Human Hand"
        width={600}
        height={600}
        priority
        suppressHydrationWarning
        style={{
          transform: "translate(-900px, 400px) rotate(30deg)",
          opacity: 0,
          position: "absolute",
        }}
      />

      {/* Text Content */}
      <div ref={textRef} className="absolute text-center">
        <p className="text-[8vw] sm:text-[79px] [font-family:var(--font-poppins)]">Where</p>
        <h1 className="text-[12vw] sm:text-[140px] [font-family:var(--font-chicavenue)]">GODS</h1>
        <p className="text-[8vw] sm:text-[79px] [font-family:var(--font-poppins)]">meet</p>
        <h1 className="text-[12vw] sm:text-[140px] [font-family:var(--font-chicavenue)]">INNOVATION</h1>
      </div>
    </section>
  );
}
