"use client";
export default function HeroSection() {
  return (
    <div className="h-[60vh] sm:h-[70vh] md:h-screen flex items-center justify-center text-center px-4">
      <h1 className="text-[10vw] sm:text-[75px] md:text-[92px] [font-family:var(--font-chicavenue)] leading-tight">
        <span>What’s new this time?</span>
        <p className="text-[5vw] sm:text-[35px] md:text-[49px] mt-4 [font-family:var(--font-poppins)]">
          This year, we embark on a journey unlike any other...
        </p>
      </h1>
    </div>
  );
}