import { Calendar, User } from "lucide-react";
import Image from "next/image";

const EventCard = ({ title, date, type, price, image, symbols }) => {
  return (
    <div className="bg-[#352B1E] rounded-2xl w-fit py-5 px-9 mx-auto relative">
      <div className="relative w-full flex flex-col items-center">
        <Image
          src="/Assets/border_style_4.jpg"
          width={1000}
          height={50}
          alt="Top Border"
          className="w-[22rem] h-[1.8rem] object-cover"
        />
        <div className="flex items-stretch gap-0 relative">
          <Image
            src="/Assets/border_style_4_rotated.jpg"
            width={1000}
            height={50}
            alt="Left Border"
            className="w-[1.8rem] h-[17rem] object-cover"
          />

          <Image
            src={image}
            width={1000}
            height={400}
            alt="Main Content"
            className="h-[17rem] object-cover"
          />

          <Image
            src="/Assets/border_style_4_rotated.jpg"
            width={1000}
            height={50}
            alt="Right Border"
            className="w-[1.8rem] h-[17rem] object-cover"
          />
        </div>

        <Image
          src="/Assets/border_style_4.jpg"
          width={1000}
          height={50}
          alt="Bottom Border"
          className="w-[22rem] h-[1.8rem] object-cover"
        />

        <div className="absolute bottom-0 right-0 flex gap-[-0.1rem] z-5 symbols">
          {symbols.map((symbol, index) => (
            <img
              key={index}
              src={symbol}
              alt={`Symbol ${index + 1}`}
              className={`w-[4.5rem] h-[4.5rem] rounded-full shadow-md ${
                index === 0
                  ? "z-8 translate-x-[1.5rem] translate-y-[0.6rem]"
                  : "translate-x-[0.6rem] translate-y-[0.6rem]"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="text-white [font-family:var(--font-chicavenue)] text-2xl md:text-[1.6rem] mt-2">
        {title}
      </div>
      <div className="flex items-center justify-between text-md [font-family:var(--font-poppins)] text-white mt-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <User size={18} />
            <p>{date}</p>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={18} />
            <p>{type}</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-3xl font-weight:700">{price}</p>
          <p className="text-sm">/member</p>
          <p className="text-sm">incl of GST</p>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
