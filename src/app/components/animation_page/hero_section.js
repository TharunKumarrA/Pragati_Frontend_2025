"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    // Fade-in and disappear-on-scroll-up animation
    gsap.fromTo(
      hero.querySelectorAll("h1, p"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        scrollTrigger: {
          trigger: hero,
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play reverse play reverse", // Play animation on scroll down, reverse on scroll up
          scrub: true, // Smooth animation synchronization with scroll
        },
      }
    );

    // Parallax effect for the entire hero section
    gsap.to(hero, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={heroRef}
      className="h-[50vh] sm:h-[70vh] md:h-screen flex flex-col items-center justify-center text-center px-4 space-y-6 pt-[20%] pb-[8%]"
    >
      <h1 className="text-[9vw] sm:text-[60px] md:text-[72px] leading-tight">
        <span>What’s new this time?</span>
      </h1>
      <p className="text-[5vw] sm:text-[28px] md:text-[36px] mt-2">
        The Neo Renaissance begins
      </p>
      <h1 className="text-[9vw] sm:text-[60px] md:text-[72px] leading-tight">
        <span>The GODS of Olympus descend</span>
      </h1>
      <p className="text-[5vw] sm:text-[28px] md:text-[36px] mt-2">
        seeking those who fuse
      </p>
      <h1 className="text-[9vw] sm:text-[60px] md:text-[72px] leading-tight">
        <span>ANCIENT WISDOM with INNOVATION</span>
      </h1>
      <p className="text-[5vw] sm:text-[28px] md:text-[36px] mt-2">
        Are you ready to accept the challenge?
      </p>
    </div>
  );
}
