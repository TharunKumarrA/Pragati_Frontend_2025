"use client";
import HeroSection from './hero_section';
import LargeInnovationBanner from './large_innovation_banner';
import MediumInnovationBanner from './medium_innovation_banner';
import SmallInnovationBanner from './small_innovation_banner';
import ChallengePrompt from './challenge_prompt';

export default function AnimationPage() {
  return (
    <main>
      <HeroSection />
      <LargeInnovationBanner />
      <MediumInnovationBanner />
      <SmallInnovationBanner />
      <ChallengePrompt />
    </main>
  );
}
