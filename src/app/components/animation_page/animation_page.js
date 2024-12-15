"use client";

import dynamic from "next/dynamic";
import HeroSection from "./hero_section";
import ChallengePrompt from "./challenge_prompt";

// Dynamically import components with SSR disabled
const LargeInnovationBanner = dynamic(() => import("./large_innovation_banner"), {
  ssr: false,
});

const MediumInnovationBanner = dynamic(() => import("./medium_innovation_banner"), {
  ssr: false,
});

const SmallInnovationBanner = dynamic(() => import("./small_innovation_banner"), {
  ssr: false,
});

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
