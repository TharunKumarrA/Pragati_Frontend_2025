"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const GodModal = ({ god, closeModal }) => {
  if (!god) return null;

  console.log(god);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      {/* Modal Container */}
      <div className="relative w-[90%] max-w-5xl bg-gradient-to-br from-white to-gray-100 rounded-lg p-8 shadow-lg">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {/* Content Flexbox */}
        <div className="flex flex-row">
          {/* Left Image */}
          <div className="w-[35%] relative p-4">
            <div className="border-4 border-gray-300 rounded-lg shadow-md">
              <Image
                src={god.god_image_src}
                alt={`${god.god_details.god_name} Image`}
                layout="responsive"
                width={500}
                height={500}
                className="rounded-lg"
                priority
              />
            </div>
          </div>

          {/* Right Details */}
          <div className="w-[65%] px-6 flex flex-col justify-center">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-4 uppercase text-gray-800">
              Hearken to {god.god_details.god_name}&apos;<span className="text-xl">s</span> call
            </h2>

            {/* Description with Markdown */}
            <div className="text-gray-700 leading-relaxed text-sm [font-family:var(--font-poppins)]">
              <ReactMarkdown>
                {god.god_details.description}
              </ReactMarkdown>
            </div>

            {/* Emblems and Button Row */}
            <div className="flex flex-row items-center justify-between gap-4 mt-6">
              {/* Emblems */}
              {god.emblems_src && (
                <div className="flex flex-row gap-4">
                  {god.emblems_src.map((emblem, index) => (
                    <div
                      key={index}
                      className="w-20 h-20 relative rounded-full border-2 border-gray-300"
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
              <div className="button px-8 py-2 text-2xl tracking-wider text-center text-black border-2 border-black bg-[linear-gradient(90deg, #FACC15, #E8D096)] rounded-full hover:bg-opacity-80">
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
