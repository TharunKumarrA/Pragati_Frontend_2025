"use client";
import AnimationPage from '@/app/components/animation_page/animation_page';
import About from "@/app/components/About";
import HeroLanding from "@/app/components/HeroLanding";
import Sponsors from "@/app/components/Sponsors";
import OlympicConclave from "@/app/components/11_gods/olympic_conclave.jsx";

export default function Home() {
  return (
    <div>
      <HeroLanding/>
      <Sponsors/>
      <About/>
      <AnimationPage />
      <OlympicConclave />
    </div>
  );
}

