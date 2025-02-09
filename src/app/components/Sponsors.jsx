import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const sponsors = [
  { src: "/Images/BNY.png", title: "H&R" },
  { src: "/Images/BNY.png", title: "IETE" },
  { src: "/Images/BNY.png", title: "ICICI" },
  { src: "/Images/BNY.png", title: "Dhanalakshmi Bank" },
  { src: "/Images/BNY.png", title: "vnc group" },
  { src: "/Images/BNY.png", title: "Prominance" },
];

const SponsorElement = ({ sponsor }) => {
  return (
    <div className="mx-8 md:mx-20">
      <Image
        src={sponsor.src}
        alt={`${sponsor.title} Sponsor Logo`}
        objectFit="contain"
        height={100}
        width={100}
      />
    </div>
  );
};

const SponsorsMarquee = () => {
  return (
    <div className="overflow-hidden">
      <Marquee
        pauseOnHover
        gradient={false}
        speed={50}
        className="flex items-center py-8"
      >
        {sponsors.map((sponsor, idx) => (
          <SponsorElement key={idx} sponsor={sponsor} />
        ))}
      </Marquee>
    </div>
  );
};

export default SponsorsMarquee;
