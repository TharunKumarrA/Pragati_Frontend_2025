"use client";
export default function ChallengePrompt() {
  return (
    <div className="h-[60vh] sm:h-[70vh] md:h-screen flex items-center justify-center text-center p-4 sm:p-8">
      <div>
        <p className="text-[5vw] sm:text-[24px] md:text-[39px] mb-4 [font-family:var(--font-poppins)] leading-relaxed">
          In the Neo Renaissance, the gods of Olympus descend once more. They seek humans capable of merging ancient wisdom with modern innovation.
        </p>
        <h3 className="text-[7vw] sm:text-[36px] md:text-[54px] [font-family:var(--font-chicavenue)] italic leading-tight">
          Are you ready to accept the challenge?
        </h3>
      </div>
    </div>
  );
}