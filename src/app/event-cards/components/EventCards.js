import Image from "next/image";
import styles from "../styles/EventCard.module.css";
import { User } from "lucide-react";
import { Calendar } from "lucide-react";

const EventCards = ({ title, date, type, price, image, symbols }) => {
  const [firstPart, secondPart] = title.split(" Arena");

  return (
    <div className="w-[400px] h-[600px] border-0 rounded-[25px] bg-[#3a2d15] overflow-visible m-5 mx-auto flex flex-col relative shadow-lg hover:translate-y-[-5px]">
      <div className="relative w-[85%] h-[65%] overflow-visible flex items-center justify-center mt-5 mx-auto rounded-none">
        <Image src={image} alt={title} layout="fill" objectFit="cover" className="w-full h-full object-cover"/>
        <div className={styles.symbols}>
          {symbols.map((symbol, index) => (
            <Image
              key={index}
              src={symbol}
              alt={`symbol-${index}`}
              width={50}
              height={50}
            />
          ))}
        </div>
      </div>
      <div className="p-5 pt-7.5 flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-white m-0 text-left leading-tight [font-family:var(--font-chicavenue)]">
          {firstPart} <br /> Arena
        </h2>
        <div className="flex justify-between items-center mt-2.5">
          <div className="flex gap-4 text-base text-white">
            <div className="flex items-center gap-1.5">
              <User />
              <p className="m-0 [font-family:var(--font-chicavenue)]">{date}</p>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar />
              <p className="m-0 [font-family:var(--font-chicavenue)]">{type}</p>
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white text-right [font-family:var(--font-chicavenue)]">{price}</p>
          </div>
        </div>
        <p className="text-sm text-white text-right -mt-1 [font-family:var(--font-chicavenue)]">Incl. of GST</p>
      </div>
    </div>
  );
};

export default EventCards;
