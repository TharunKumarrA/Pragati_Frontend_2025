"use client";

import { usePathname } from "next/navigation";
import About from "@/app/components/About";
import Footer from "@/app/components/footer";
import HeroLanding from "@/app/components/HeroLanding";
import Sponsors from "@/app/components/Sponsors";
import OlympicConclave from "@/app/components/11_gods/olympic_conclave.jsx";
import FilmGallery from "./components/gallery";

export default function Home() {
  const pathname = usePathname(); // Get the current pathname
  const currentPage = pathname === "/" ? "home" : pathname.replace("/", ""); // Map pathname to a readable page name

  return (
    <div>
      <HeroLanding />
      <Sponsors />
      <About />
      <OlympicConclave />
      <FilmGallery />
      <Footer current_page={currentPage} />
    </div>
  );
}
