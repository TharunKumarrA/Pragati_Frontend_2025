"use client";

import dynamic from "next/dynamic";
// Dynamically import components with SSR disabled
const HeroSection = dynamic(() => import("./hero_section"), {
  ssr: false,
});

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
    </main>
  );
}
