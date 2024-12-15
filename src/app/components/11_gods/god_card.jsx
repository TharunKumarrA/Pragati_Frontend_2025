"use client";
import Image from "next/image";

function GodCard({ god_image_src, god_details }) {
  const { god_name, god_type, dept } = god_details;

  return (
    <div
      className="group relative w-[100px] flex flex-col items-center self-stretch px-4 pb-16 my-auto 
      hover:scale-105 transition-all duration-300 max-md:scale-105"
    >
      {/* Image Container */}
      <div
        className="relative w-full h-[272px] rounded-xl overflow-hidden 
        transition-all duration-300 ease-out 
        group-hover:w-[160%] group-hover:h-[300px] 
        max-md:w-[200%] max-md:h-[300px]"
      >
        <Image
          src={god_image_src}
          alt={`${god_name} Image`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover grayscale group-hover:grayscale-0 
          transition-all duration-300 max-md:grayscale-0"
          priority={false}
        />
      </div>

      {/* Text Container (Always visible on mobile) */}
      <div
        className="mt-4 text-center 
        opacity-0 group-hover:opacity-100 
        translate-y-4 group-hover:translate-y-0
        transition-all duration-300 ease-out 
        max-md:opacity-100 max-md:translate-y-0"
      >
        <div className="text-xl font-bold">{god_name}</div>
        <div className="text-sm text-gray-500 leading-tight whitespace-nowrap overflow-hidden [font-family:var(--font-poppins)]">
          {god_type}
        </div>
        <div className="text-xs text-gray-400 [font-family:var(--font-poppins)]">
          {dept}
        </div>
      </div>
    </div>
  );
}

export default GodCard;
