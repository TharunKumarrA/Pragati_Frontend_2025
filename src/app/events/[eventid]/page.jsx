"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  User,
  Phone,
  IndianRupeeIcon,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/events/accordion";
import Link from "next/link";
import { getEvent } from "@/app/_utils/api_endpoint_handler";
import secureLocalStorage from "react-secure-storage";

const Event = () => {
  const { eventid } = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // state to control showing the team details modal for group events
  const [showTeamModal, setShowTeamModal] = useState(false);
  // state to hold the team members list
  const [teamMembers, setTeamMembers] = useState([]);

  // Check if user is logged in using secureLocalStorage
  useEffect(() => {
    const stored = secureLocalStorage.getItem("isLoggedIn");
    console.log("Stored isLoggedIn:", stored);
    setIsLoggedIn(stored === "1");
  }, []);

  useEffect(() => {
    if (!eventid) return;

    getEvent(eventid)
      .then((data) => {
        if (data.DATA && data.DATA.length > 0) {
          const event = data.DATA[0];
          setEventData({
            title: event.eventName || "",
            date: `${event.eventDate}`,
            time: `${event.time}`,
            venue: event.venue || "TBA",
            teamSize: event.isGroup
              ? `${event.minTeamSize}-${event.maxTeamSize} Members`
              : "Individual Event",
            contact:
              event.organizers && event.organizers.length > 0
                ? event.organizers
                    .map(
                      (org) =>
                        `${org.organizerName} - ${org.organizerPhoneNumber}`
                    )
                    .join(" | ")
                : "Contact Info Unavailable",
            price: event.isPerHeadFee
              ? `₹${event.eventFee} / team`
              : `₹${event.eventFee} / member`,
            rewards: [
              { place: "1st Place", amount: "₹10,000", color: "bg-orange-500" },
              { place: "2nd Place", amount: "₹7,000", color: "bg-gray-500" },
            ],
            clubname: event.clubName,
            poster: "/Images/temp/1.png",
            logo: "/Images/temp/eventlogo.png",
            emblems: [
              "/Images/Emblems/1a_athena.webp",
              "/Images/Emblems/1b_eirene.webp",
            ],
            description:
              event.eventDescription || "No event description provided.",
            rules: [
              "Participants must arrive 15 minutes before the event starts.",
              "Use of external help or unauthorized tools is strictly prohibited.",
              "Each team is allowed a maximum of two substitutions.",
              "Judges' decisions are final and binding.",
              "Late submissions will result in disqualification.",
              "Respect other participants and maintain decorum.",
            ],
            details: [
              "This is a team-based event with a focus on problem-solving and creativity.",
              "Participants will be given a set of tasks to complete within a time limit.",
              "Judging criteria include innovation, feasibility, and presentation skills.",
              "Winners will receive cash prizes, certificates, and potential internship opportunities.",
              "Refreshments will be provided during the break.",
              "Networking session with industry experts post-event.",
            ],
            // Flag to indicate if the user is already registered
            isRegistered: event.isRegistered || 0,
            // Save whether this is a group event for later checks
            isGroup: event.isGroup,
          });
        } else {
          setEventData(null);
        }
      })
      .catch((error) => console.error("Error fetching event data:", error))
      .finally(() => setLoading(false));
  }, [eventid]);

  // Auto-fill team member details for group events if logged in.
  // Assumes that you store the current user's name and email in secureLocalStorage.
  useEffect(() => {
    if (isLoggedIn && eventData && eventData.isGroup) {
      const userEmail = secureLocalStorage.getItem("userEmail") || "";
      const userName = secureLocalStorage.getItem("userName") || "";
      setTeamMembers([{ name: userName, email: userEmail }]);
    }
  }, [isLoggedIn, eventData]);

  // This function decides what happens when the register button is clicked.
  const handleRegister = () => {
    if (eventData.isGroup) {
      // For group events, show the modal to collect team details.
      setShowTeamModal(true);
    } else {
      // For individual events, proceed directly to the payments page.
      router.push("/payment");
    }
  };

  // Add a new blank team member input.
  const addTeamMember = () => {
    setTeamMembers([...teamMembers, { name: "", email: "" }]);
  };

  // Update a team member's field.
  const handleTeamMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  // On submission, verify that all team members have been filled and are registered.
  const handleSubmitTeam = async () => {
    // Loop over team members and validate details.
    for (let i = 0; i < teamMembers.length; i++) {
      const member = teamMembers[i];
      if (!member.name || !member.email) {
        alert("Please fill in all team member details.");
        return;
      }
      // Dummy verification:
      // Replace this with an actual API call to verify registration if needed.
      if (!member.email.includes("@")) {
        alert(
          `Team member ${member.name} with email ${member.email} is not registered.`
        );
        return;
      }
    }
    // If verification passes, close the modal and send the user to the payment page.
    setShowTeamModal(false);
    router.push("/payment");
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!eventData) return <p className="text-white">Event not found</p>;

  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center">
      <Image
        src={eventData.logo}
        alt="Event Logo"
        width={100}
        height={100}
        className="w-20 h-auto rounded-lg mt-[4rem] object-cover shadow-md"
      />
      <p className="text-white text-center text-lg font-semibold">
        {eventData.clubname} Presents
      </p>
      <h1 className="text-white text-center text-4xl font-bold mx-4">
        {eventData.title}
      </h1>

      <div className="flex flex-col min-w-[90%] lg:flex-row items-center justify-center lg:items-start mt-5 mx-2 lg:mx-20 bg-[#ffffff]/2 rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
        <div className="w-[350px] flex flex-col items-center p-5">
          <Image
            src={eventData.poster}
            alt="Event Poster"
            width={500}
            height={500}
            className="w-full h-auto rounded-lg object-cover mb-6 shadow-md"
          />
          {console.log("isLoggedIn state:", isLoggedIn)}
          {isLoggedIn ? (
            eventData.isRegistered === 1 ? (
              <button
                disabled
                className="bg-gray-500 border-gray-500 cursor-not-allowed w-full py-3 text-center rounded-xl text-lg font-bold shadow-md"
              >
                Registered
              </button>
            ) : (
              <button
                onClick={handleRegister}
                className="bg-[#322A1E] border-[#E5C14E] hover:scale-105 transition-all border-2 w-full text-[#E5C14E] py-3 text-center rounded-xl text-lg font-bold shadow-md"
              >
                Register
              </button>
            )
          ) : (
            <Link
              href="/login"
              className="bg-[#322A1E] border-[#E5C14E] hover:scale-105 transition-all border-2 w-full text-[#E5C14E] py-3 text-center rounded-xl text-lg font-bold shadow-md"
            >
              Login to Register
            </Link>
          )}
        </div>

        <div className="lg:w-2/3 text-white py-8 px-4">
          <p className="text-md mb-6 leading-relaxed text-justify">
            {eventData.description}
          </p>

          <div className="text-md">
            <div className="flex items-center gap-4 mb-2">
              <Calendar className="w-5 h-5 text-[#E5C14E]" />
              <span>
                {eventData.date === "1" ? "3rd" : "4th"} March 2025 |{" "}
                {eventData.time}
              </span>
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

          <div className="flex gap-6 mt-3">
            {eventData.emblems.map((emblem, index) => (
              <Image
                key={index}
                src={emblem}
                alt={`Emblem ${index + 1}`}
                width={100}
                height={100}
                className="w-[80px] h-[80px] rounded-full object-cover shadow-md"
              />
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
            <AccordionContent className="pt-3">
              <ul className="list-disc list-inside space-y-2">
                {eventData.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" className="mt-4" collapsible>
          <AccordionItem value="item-2">
            <AccordionTrigger>Rules</AccordionTrigger>
            <AccordionContent className="pt-3">
              <ul className="list-disc list-inside space-y-2">
                {eventData.rules.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Modal for Group Event Team Registration */}
      {showTeamModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">Team Details</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1 border p-2 rounded"
                >
                  <label className="text-sm">Name:</label>
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "name", e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                  <label className="text-sm">Email:</label>
                  <input
                    type="email"
                    value={member.email}
                    onChange={(e) =>
                      handleTeamMemberChange(index, "email", e.target.value)
                    }
                    className="border p-2 rounded"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={addTeamMember}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Team Member
            </button>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => setShowTeamModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTeam}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
