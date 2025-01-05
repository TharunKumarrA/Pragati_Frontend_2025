"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

const SkeletonLoader = () => (
  <div className="animate-pulse flex gap-4">
    <div className="w-2/5 h-[300px] bg-gray-200 rounded-lg" />

    <div className="w-3/5 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />

      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-4/6" />
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
          <div className="w-16 h-16 bg-gray-200 rounded-full" />
        </div>
        <div className="w-32 h-10 bg-gray-200 rounded-full" />
      </div>
    </div>
  </div>
);

const GodModal = ({ god, closeModal }) => {
  const [imagesLoaded, setImagesLoaded] = React.useState(false);
  const [mainImageLoaded, setMainImageLoaded] = React.useState(false);
  const [emblemsLoaded, setEmblemsLoaded] = React.useState(false);

  React.useEffect(() => {
    setImagesLoaded(
      mainImageLoaded && (!god?.emblems_src?.length || emblemsLoaded)
    );
  }, [mainImageLoaded, emblemsLoaded, god?.emblems_src]);

  if (!god) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="relative w-full max-w-4xl bg-gradient-to-br from-white to-gray-100 rounded-lg p-6 shadow-lg max-md:w-[95%] max-md:p-4">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-600 hover:text-black z-50"
        >
          <X size={24} />
        </button>

        {!imagesLoaded && <SkeletonLoader />}

        <div
          className={`flex flex-row max-md:flex-col max-md:items-center ${
            !imagesLoaded ? "hidden" : ""
          }`}
        >
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
                onLoad={() => setMainImageLoaded(true)}
              />
            </div>
          </div>

          <div className="w-[60%] px-6 flex flex-col justify-center max-md:w-full max-md:px-0">
            <h2 className="text-2xl font-bold mb-2 uppercase text-gray-800 max-md:text-lg text-center [font-family:var(--font-chicavenue)]">
              {god.god_details.god_name}&apos;s Call
            </h2>

            <div className="text-gray-600 leading-relaxed text-sm [font-family:var(--font-poppins)] max-md:text-xs max-md:text-center">
              <ReactMarkdown>{god.god_details.description}</ReactMarkdown>
            </div>

            <div className="flex flex-row items-center justify-between gap-4 mt-6 lg:mt-8 max-md:flex-col max-md:gap-2">
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
                        onLoad={() => {
                          if (index === god.emblems_src.length - 1) {
                            setEmblemsLoaded(true);
                          }
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="button px-6 py-2 text-lg tracking-wider text-center text-black border-2 border-black bg-[linear-gradient(90deg, #FACC15, #E8D096)] rounded-full hover:bg-opacity-80 max-md:text-sm max-md:px-4 max-md:py-1 [font-family:var(--font-chicavenue)]">
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
