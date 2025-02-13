"use client";
import { useParams } from "next/navigation";
import { Calendar, MapPin, User, Phone, IndianRupeeIcon, Trophy } from "lucide-react";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/components/events/accordion";
import Link from "next/link";

const Event = () => {
  const { eventid } = useParams();
  if (!eventid) return <p className="text-white">Loading...</p>;
  const eventData = {
    title: "Athena's Debate Arena",
    date: "19th Feb | 10:00 AM - 2:00 PM",
    venue: "ABC Venue, XYZ Hall",
    teamSize: "5-6 Members",
    contact: "Prateek - 9567944874",
    price: "₹200 /member (incl of GST)",
    rewards: [
      { place: "1st Place", amount: "₹10,000", color: "bg-orange-500" },
      { place: "2nd Place", amount: "₹7,000", color: "bg-gray-500" },
    ],
    poster: "/Images/temp/1.png",
    logo: "/Images/temp/eventlogo.png",
    emblems: ["/Images/Emblems/1a_athena.webp", "/Images/Emblems/1b_eirene.webp"],
    description: `Prepare for an exhilarating challenge as teams of 5-6 players engage in a high-stakes race to decipher a series of perplexing puzzles and conquer a myriad of formidable challenges, all in pursuit of uncovering the elusive treasure.
    This thrilling treasure hunt spans various locations, from the depths of indoor spaces to the vastness of the outdoors.
    
    Victory hinges on the triumphant blend of creative thinking, problem-solving prowess, and seamless teamwork. Only the first team to crack the code and lay their hands on the concealed riches will emerge as the ultimate champions in this heart-pounding quest!`,
  };

  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center">
      <Image src={eventData.logo} alt="Event Logo" width={100} height={100} className="w-20 h-auto rounded-lg mt-[4rem] object-cover shadow-md" />
      <p className="text-white text-center text-lg font-semibold">ABC Presents</p>
      <h1 className="text-white text-center text-4xl font-bold mx-4">{eventData.title}</h1>

      <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start mt-5 mx-2 lg:mx-20 bg-[#ffffff]/2 rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
        <div className="w-[350px] flex flex-col items-center p-5">
          <Image src={eventData.poster} alt="Event Poster" width={500} height={500} className="w-full h-auto rounded-lg object-cover mb-6 shadow-md" />
          <Link href="/login" className="bg-[#322A1E] border-[#E5C14E] hover:scale-105 transition-all border-2 w-full text-[#E5C14E] py-3 text-center rounded-xl text-lg font-bold shadow-md">
            Login to Register
          </Link>
        </div>


        <div className="lg:w-2/3 text-white py-8 px-4">
          <p className="text-md mb-6 leading-relaxed text-justify">{eventData.description}</p>

          <div className="text-md">
            <div className="flex items-center gap-4 mb-2">
              <Calendar className="w-5 h-5 text-[#E5C14E]" />
              <span>{eventData.date}</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <MapPin className="w-5 h-5 text-[#E5C14E]" />
              <span>{eventData.venue}</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <User className="w-5 h-5 text-[#E5C14E]" />
              <span>{eventData.teamSize}</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <Phone className="w-5 h-5 text-[#E5C14E]" />
              <span>{eventData.contact}</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <IndianRupeeIcon className="w-5 h-5 text-[#E5C14E]" />
              <span className="text-xl font-semibold">{eventData.price}</span>
            </div>
          </div>

          <div className="flex gap-6 mt-6">
            {eventData.emblems.map((emblem, index) => (
              <Image key={index} src={emblem} alt={`Emblem ${index + 1}`} width={100} height={100} className="w-[80px] h-[80px] rounded-full object-cover shadow-md" />
            ))}
          </div>
        </div>
      </div>

      <div className="w-[90%] bg-black/10 backdrop-blur-md shadow-lg p-3 my-5 flex flex-col gap-5 lg:flex-row text-white items-center justify-center lg:items-start rounded-xl">
        {eventData.rewards.map((reward, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className={`${reward.color} rounded-full p-5`}>
              <Trophy className="w-5 h-5 md:w-10 md:h-10 text-white" />
            </div>
            <div>
              <p className="text-xl font-semibold">{reward.place}</p>
              <p className="text-lg">{reward.amount}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[90%] mb-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" className="mt-4" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>Rules</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default Event;
