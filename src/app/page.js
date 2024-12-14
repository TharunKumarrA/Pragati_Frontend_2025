"use client";
import Home from './components/home_page';
import HeroSection from './components/animation_page/hero_section';
import LargeInnovationBanner from './components/animation_page/large_innovation_banner';
import MediumInnovationBanner from './components/animation_page/medium_innovation_banner';
import SmallInnovationBanner from './components/animation_page/small_innovation_banner';
import ChallengePrompt from './components/animation_page/challenge_prompt';

export default function AnimationPage() {
  return (
    <main>
      <Home />
      <HeroSection />
      <LargeInnovationBanner />
      <MediumInnovationBanner />
      <SmallInnovationBanner />
      <ChallengePrompt />
    </main>
  );
}
