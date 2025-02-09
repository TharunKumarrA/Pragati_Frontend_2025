"use client";

import { usePathname } from "next/navigation";
import HeroLanding from "@/app/components/HeroLanding";
import About from "@/app/components/About";
import OlympicConclave from "@/app/components/11_gods/olympic_conclave.jsx";
import AnimationPage from "@/app/components/animation_page/animation_page";
import FilmGallery from "./components/gallery";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import SponsorsMarquee from "@/app/components/Sponsors";

export default function Home() {
  const pathname = usePathname();
  const currentPage = pathname === "/" ? "home" : pathname.replace("/", "");

  return (
    <div>
      <Navbar />
      <HeroLanding />
      <SponsorsMarquee />
      <About />
      <div className="mt-24 md:my-0"></div>
      <AnimationPage />
      <div className="my-16 md:my-48"></div>
      <OlympicConclave />
      <FilmGallery />
      <Footer current_page={currentPage} />
    </div>
  );
}
