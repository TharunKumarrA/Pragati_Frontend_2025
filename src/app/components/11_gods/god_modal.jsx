"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const GodModal = ({ god, closeModal }) => {
  if (!god) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-white to-gray-100 rounded-lg p-6 shadow-lg max-md:w-[95%] max-md:p-4">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-black z-50"
        >
          <X size={24} />
        </button>

        {/* Content Flexbox */}
        <div className="flex flex-row max-md:flex-col max-md:items-center">
          {/* Left Image */}
          <div className="w-[40%] flex items-center justify-center relative p-2 max-md:w-[80%] max-md:p-0 max-md:mb-4">
            <div className="border-2 border-gray-300 rounded-lg shadow-md overflow-hidden">
              <Image
                src={god.god_image_src}
                alt={`${god.god_details.god_name} Image`}
                layout="responsive"
                width={300}
                height={300}
                className="rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Right Details */}
          <div className="w-[60%] px-6 flex flex-col justify-center max-md:w-full max-md:px-0">
            {/* Title */}
            <h2 className="text-2xl font-bold mb-2 uppercase text-gray-800 max-md:text-lg text-center">
              {god.god_details.god_name}&apos;s Call
            </h2>

            {/* Description with Markdown */}
            <div className="text-gray-600 leading-relaxed text-sm [font-family:var(--font-poppins)] max-md:text-xs max-md:text-center">
              <ReactMarkdown>{god.god_details.description}</ReactMarkdown>
            </div>

            {/* Emblems and Button Row */}
            <div className="flex flex-row items-center justify-between gap-4 mt-6 lg:mt-8 max-md:flex-col max-md:gap-2">
              {/* Emblems */}
              {god.emblems_src && (
                <div className="flex flex-row gap-2 max-md:justify-center">
                  {god.emblems_src.map((emblem, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 relative rounded-full border-2 border-gray-300"
                    >
                      <Image
                        src={emblem}
                        alt={`${god.god_details.god_name} Emblem`}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-full"
                        priority
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Button */}
              <div className="button px-6 py-2 text-lg tracking-wider text-center text-black border-2 border-black bg-[linear-gradient(90deg, #FACC15, #E8D096)] rounded-full hover:bg-opacity-80 max-md:text-sm max-md:px-4 max-md:py-1">
                MY EVENTS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GodModal;
