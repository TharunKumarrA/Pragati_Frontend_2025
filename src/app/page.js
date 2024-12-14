import About from "./components/About";
import HeroLanding from "./components/HeroLanding";
import Sponsors from "./components/Sponsors";

export default function Home() {
  return (
    <div>
      <HeroLanding/>
      <Sponsors/>
      <About/>
      <div className="p-10 text-center">Storyline Starts here</div>
    </div>
  );
}
