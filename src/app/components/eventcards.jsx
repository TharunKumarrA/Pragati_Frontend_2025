import Image from "next/image";
import Link from "next/link";  // Import Link component
import { Calendar, Clock, MapPin } from "lucide-react";

const EventCard = ({
  title,
  date,
  time,
  venue,
  price,
  emblem1,
  emblem2,
  poster,
}) => {
  return (
    <div className="bg-[#322A1E] bg-opacity-60 border-2 mx-auto border-[#E5C14E] rounded-3xl px-8 md:px-5 py-4 w-full max-w-[320px] md:max-w-[350px] lg:max-w-[380px] relative group transition-all transform hover:scale-105 hover:shadow-2xl hover:rotate-2 backdrop-blur-md">
      {/* Wrap the card in a Link component */}
      <Link href={`/event/`} passHref>
          <div className="relative w-full">
            <Image
              src={poster}
              width={500}
              height={500}
              alt="Event Poster"
              className="w-full h-auto aspect-[5/6] rounded-xl object-cover"
            />
            <div className="absolute z-0 top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end items-center rounded-xl text-lg font-bold cursor-pointer">
              <div className="mb-10 pb-5 text-center">
                <button className="bg-[#E5C14E] text-black py-2 px-4 rounded-xl text-lg font-bold">
                  Register Now!
                </button>
              </div>
            </div>

            <Image
              src={emblem1}
              width={65}
              height={65}
              alt="Emblem 1"
              className="absolute -bottom-5 right-12 w-[65px] h-[65px] rounded-full object-cover z-4"
            />
            <Image
              src={emblem2}
              width={65}
              height={65}
              alt="Emblem 2"
              className="absolute -bottom-5 right-0 w-[65px] h-[65px] rounded-full object-cover z-2"
            />
          </div>

          <h1 className="text-white text-lg md:text-2xl mt-4">{title}</h1>

          <div className="mt-3 flex justify-between items-center text-white text-sm">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#E5C14E]" />
                <span className="text-xs md:text-sm">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E5C14E]" />
                <span className="text-xs md:text-sm">{time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#E5C14E]" />
                <span className="text-xs md:text-sm">{venue}</span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-[#E5C14E] text-lg md:text-xl font-bold">
                ₹{price} <span className="text-xs font-normal">/member</span>
              </div>
              <div className="text-xs text-gray-300">Incl. of GST</div>
            </div>
          </div>
      </Link>
    </div>
  );
};

export default EventCard;
