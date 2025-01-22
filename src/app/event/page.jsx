import { Calendar, MapPin, User, Phone, IndianRupeeIcon, Trophy } from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/accordion";
import Link from "next/link";

const Event = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center">
      <img
        src="/Images/eventlogo.png"
        alt="Event Logo"
        className="w-20 h-auto rounded-lg mt-[4rem] object-cover shadow-md"
      />
      <p className="text-white text-center text-lg  font-semibold">
        ABC Presents
      </p>
      <h1 className="text-white text-center text-4xl font-bold">
        Athena&apos;s Debate Arena
      </h1>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row items-center justify-center lg:items-start mt-5 mx-2 lg:mx-20 bg-[#ffffff]/2 rounded-xl shadow-lg overflow-hidden backdrop-blur-md ">
        {" "}
        {/* Left Section: Poster and "Login to Register" button */}
        <div className="w-[350px] flex flex-col items-center p-5">
          <img
            src="/Images/1.png" // Replace with actual image path
            alt="Event Poster"
            className="w-full h-auto rounded-lg object-cover mb-6 shadow-md"
          />
          <Link href="/login" className="bg-[#322A1E] border-[#E5C14E] border-2 w-full text-[#E5C14E] py-3  text-center rounded-xl text-lg font-bold shadow-md">
            Login to Register
          </Link>
        </div>
        {/* Right Section: Event Description and Details */}
        <div className="lg:w-2/3 text-white py-8 px-4">
          {/* Description */}
          <p className="text-md mb-6 leading-relaxed text-justify">
            Prepare for an exhilarating challenge as teams of 5-6 players engage
            in a high-stakes race to decipher a series of perplexing puzzles and
            conquer a myriad of formidable challenges, all in pursuit of
            uncovering the elusive treasure. This thrilling treasure hunt spans
            various locations, from the depths of indoor spaces to the vastness
            of the outdoors.
            <br />
            <br />
            Victory hinges on the triumphant blend of creative thinking,
            problem-solving prowess, and seamless teamwork. Only the first team
            to crack the code and lay their hands on the concealed riches will
            emerge as the ultimate champions in this heart-pounding quest!
          </p>

          <div className="text-md">
            <div className="flex items-center gap-4 mb-2">
              <Calendar className="w-5 h-5 text-[#E5C14E]" />
              <span>19th Feb | 10:00 AM - 2:00 PM</span>
            </div>

            {/* Place */}
            <div className="flex items-center gap-4 mb-2">
              <MapPin className="w-5 h-5 text-[#E5C14E]" />
              <span>ABC Venue, XYZ Hall</span>
            </div>

            {/* Team Size */}
            <div className="flex items-center gap-4 mb-2">
              <User className="w-5 h-5 text-[#E5C14E]" />
              <span>5-6 Members</span>
            </div>

            {/* Contact Person */}
            <div className="flex items-center gap-4 mb-2">
              <Phone className="w-5 h-5 text-[#E5C14E]" />
              <span>Prateek - 9567944874</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <IndianRupeeIcon className="w-5 h-5 text-[#E5C14E]" />
              <span className="text-xl font-semibold">200</span><span className="text-md">/member (incl of GST)</span>
            </div>

            {/* Emblems */}
            <div className="flex gap-6 mt-6">
              <img
                src="/Images/Emblems/1a_athena.webp" // Replace with actual image path
                alt="Emblem 1"
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              />
              <img
                src="/Images/Emblems/1b_eirene.webp" // Replace with actual image path
                alt="Emblem 2"
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] p-5 flex flex-col gap-5 lg:flex-row text-white items-center justify-center lg:items-start rounded-xl ">
      {/* 1st Place */}
      <div className="flex items-center space-x-4 mb-6 lg:mb-0">
        <div className="bg-orange-500 rounded-full p-5">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <div>
          <p className="text-xl font-semibold">1st Place</p>
          <p className="text-lg">₹10,000</p>
        </div>
      </div>
      {/* 2nd Place */}
      <div className="flex items-center space-x-4">
        <div className="bg-gray-500 rounded-full p-5">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <div>
          <p className="text-xl font-semibold">2nd Place</p>
          <p className="text-lg">₹7,000</p>
        </div>
      </div>
    </div>

      <div className="w-[90%] mb-10 ">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" className="mt-4" collapsible>
          <AccordionItem value="item-1">
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
