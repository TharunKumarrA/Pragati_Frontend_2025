"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Group, MapPin } from "lucide-react";

const EventCard = ({
  title,
  date,
  isGroup,
  venue,
  price,
  emblem1,
  emblem2,
  poster,
  eventid,
  tags,
  isDisabled,
  type,
  isPerHeadFee,
}) => {
  // Define your placeholder image paths (ensure these images exist in your public folder)
  const placeholderPoster = "/Images/FallbackPoster.jpg";
  const placeholderEmblem = "/Images/Emblems/3a_dionysus.webp";

  // Initialize state with fallback if the provided prop is empty or undefined
  const [posterSrc, setPosterSrc] = useState(
    poster && poster.trim() !== "" ? poster : placeholderPoster
  );
  const [emblem1Src, setEmblem1Src] = useState(
    emblem1 && emblem1.trim() !== "" ? emblem1 : placeholderEmblem
  );
  const [emblem2Src, setEmblem2Src] = useState(
    emblem2 && emblem2.trim() !== "" ? emblem2 : placeholderEmblem
  );

  return (
    <div   className={`rounded-3xl px-8 md:px-5 py-4 w-full max-w-[320px] md:max-w-[350px] lg:max-w-[380px] relative group transition-all transform hover:scale-105 hover:shadow-2xl backdrop-blur-md ${isDisabled ? 'bg-black bg-opacity-60 cursor-not-allowed' : 'bg-[#322A1E] bg-opacity-60 border-2 mx-auto border-[#E5C14E]'}`}
>
      {isDisabled && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-3xl"></div> // The grey overlay
      )}
      <Link href={`/events/${eventid}`} passHref>
        <div className="relative w-full">
          <Image
            src={posterSrc}
            width={500}
            height={500}
            alt="Event Poster"
            className="w-full h-auto aspect-[5/5] rounded-xl object-cover"
            onError={() => {
              if (posterSrc !== placeholderPoster) {
                setPosterSrc(placeholderPoster);
              }
            }}
          />
          <div className="absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center rounded-xl text-lg font-bold cursor-pointer">
            <div className="mb-10 pb-5 text-center">
              <button className="bg-[#E5C14E] text-black py-2 px-4 rounded-xl text-lg font-bold">
                {isDisabled==true ? "Registrations Closed!" :"Register Now!"}
              </button>
            </div>
          </div>

          <Image
            src={emblem1Src}
            width={65}
            height={65}
            alt="Emblem 1"
            className="absolute -bottom-5 right-12 w-[65px] h-[65px] rounded-full object-cover z-4"
            onError={() => {
              if (emblem1Src !== placeholderEmblem) {
                setEmblem1Src(placeholderEmblem);
              }
            }}
          />
          <Image
            src={emblem2Src}
            width={65}
            height={65}
            alt="Emblem 2"
            className="absolute -bottom-5 right-0 w-[65px] h-[65px] rounded-full object-cover z-2"
            onError={() => {
              if (emblem2Src !== placeholderEmblem) {
                setEmblem2Src(placeholderEmblem);
              }
            }}
          />
        </div>

        <h1 className="text-white text-lg md:text-2xl mt-4">{title}</h1>
        <div className="flex flex-wrap gap-1">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="px-3 py-1 bg-[#E5C14E] text-sm w-fit rounded-full font-poppins"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="mt-3 flex justify-between items-center text-white text-sm">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#E5C14E]" />
              <span className="text-xs md:text-sm">
                {date === "1" ? "3rd" : "4th"} March 2025
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Group className="w-4 h-4 text-[#E5C14E]" />
              <span className="text-xs md:text-sm">{isGroup === 1 ? "Group": "Individual"} Event</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E5C14E]" />
              <span className="text-xs md:text-sm">{venue}</span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[#E5C14E] text-lg md:text-xl font-bold">
              ₹{Math.ceil(price*1.18)}{" "}
              <span className="text-xs font-normal">
                /{isPerHeadFee === 1 ? " member" : " team"}
              </span>
            </div>
            <div className="text-xs text-gray-300">Incl. of GST</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;
