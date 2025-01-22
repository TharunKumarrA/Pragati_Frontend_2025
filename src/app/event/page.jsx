import { Calendar, MapPin, User, Phone, IndianRupee } from "lucide-react";
import Image from "next/image";

const Event = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center">
      <img
            src="/Images/eventlogo.png"
            alt="Event Logo"
            className="w-20 h-auto rounded-lg mt-[4rem] object-cover shadow-md"
          /><p className="text-white text-center text-lg  font-semibold">
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
          <button className="bg-[#322A1E] border-[#E5C14E] border-2 w-full text-[#E5C14E] py-3  px-8 rounded-xl text-lg font-bold shadow-md">
            Login to Register
          </button>
        </div>
        {/* Right Section: Event Description and Details */}
        <div className="lg:w-2/3 text-white p-8">
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
    </div>
  );
};

export default Event;
