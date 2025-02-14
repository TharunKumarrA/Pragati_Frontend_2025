import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const sponsors = [
  { src: "/Images/BNY.png", title: "BNY" },
  { src: "/Images/Sudhama.jpg", title: "Sudhama Groups" },
  { src: "/Images/Orange_B-1.png", title: "Hapli Earth" },
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
        className="flex py-8 justify-between"
      >
        {sponsors.map((sponsor, idx) => (
          <SponsorElement key={idx} sponsor={sponsor} />
        ))}
      </Marquee>
    </div>
  );
};

export default SponsorsMarquee;
