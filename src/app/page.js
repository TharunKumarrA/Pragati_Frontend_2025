"use client";

import { usePathname } from "next/navigation";
import HeroLanding from "@/app/components/HeroLanding";
import Sponsors from "@/app/components/Sponsors";
import About from "@/app/components/About";
import OlympicConclave from "@/app/components/11_gods/olympic_conclave.jsx";
import AnimationPage from "@/app/components/animation_page/animation_page";
import Footer from "@/app/components/footer";
import FilmGallery from "./components/gallery";

export default function Home() {
  const pathname = usePathname(); 
  const currentPage = pathname === "/" ? "home" : pathname.replace("/", ""); 

  return (
    <div>
      <HeroLanding />
      <Sponsors />
      <About />
      <AnimationPage />
      <OlympicConclave />
      <FilmGallery />
      <Footer current_page={currentPage} /> {}
    </div>
  );
}
