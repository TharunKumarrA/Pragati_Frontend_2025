import React from "react";
import Image from "next/image";

const ScrollingSchedule = ({ rightImage, leftImage }) => {
  const schedulePaths = [leftImage, rightImage];

  return (
    <div className="w-full max-w-3xl mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        {schedulePaths.map((path, index) => (
          <div
            key={index}
            className="relative w-full h-[140vh] rounded-3xl overflow-hidden"
          >
            <Image
              src={path}
              alt={`Schedule image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              style={{ objectFit: "contain", borderRadius: "12px" }}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingSchedule;
