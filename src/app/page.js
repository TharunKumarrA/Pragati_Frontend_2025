import About from "./components/About";
import Footer from "./components/footer";
import HeroLanding from "./components/HeroLanding";
import Sponsors from "./components/Sponsors";
import OlympicConclave from "@/app/components/11_gods/olympic_conclave.jsx";

export default function Home() {
  return (
    <div>
      <HeroLanding/>
      <Sponsors/>
      <About/>
      <OlympicConclave />
      <Footer/>
    </div>
  );
}

