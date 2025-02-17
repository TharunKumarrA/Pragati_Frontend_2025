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
  Clock,
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
import TeamModal from "../components/TeamModal";
import { payU_Action, payU_Key } from "@/app/_utils/consts";
import { registerTeam } from "@/app/_utils/api_endpoint_handler";

const godEmblemMapping = {
  Athena: ["/Images/Emblems/1a_athena.webp", "/Images/Emblems/1b_eirene.webp"],
  Apollo: [
    "/Images/Emblems/2a_apollo.webp",
    "/Images/Emblems/2b_mnemosyne.webp",
  ],
  Dionysus: ["/Images/Emblems/3a_dionysus.webp"], // Only one emblem; duplicate if needed
  Plutus: ["/Images/Emblems/4a_plutus.webp", "/Images/Emblems/4b_demeter.webp"],
  Hermes: ["/Images/Emblems/5a_hermes.webp", "/Images/Emblems/5b_peitho.webp"],
  Zeus: ["/Images/Emblems/6a_nike.webp", "/Images/Emblems/6b_hephaestus.webp"],
};

const Event = () => {
  const { eventid } = useParams();
  const router = useRouter();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // State to control showing the team details modal for group events
  const [showTeamModal, setShowTeamModal] = useState(false);
  // State to store event status
  const [eventStatus, setEventStatus] = useState("");

  const userEmail = secureLocalStorage.getItem("registerEmail") || "";
  const placeholderPoster = "/Images/FallbackPoster.jpg";
  const placeholderClub = "/Images/FallbackClub.jpg";
  const [posterSrc, setPosterSrc] = useState(placeholderPoster);
  const [logoSrc, setLogoSrc] = useState(placeholderClub);

  useEffect(() => {
    const stored = secureLocalStorage.getItem("isLoggedIn");
    setIsLoggedIn(stored === "1");
  }, []);

  useEffect(() => {
    if (!eventid) return;

    getEvent(eventid)
      .then((data) => {
        console.log("Event data:", data);
        if (data.DATA && data.DATA.length > 0) {
          const event = data.DATA[0];
          setEventStatus(event.eventStatus);
          setPosterSrc(
            event.eventImageUrl && event.eventImageUrl.trim() !== ""
              ? event.eventImageUrl
              : placeholderPoster
          );
          setLogoSrc(
            event.clubImageUrl && event.clubImageUrl.trim() !== ""
              ? event.clubImageUrl
              : placeholderClub
          );

          setEventData({
            eventID: event.eventID,
            title: event.eventName || "",
            date: `${event.eventDate}`,
            time: `${event.time}`,
            venue: event.venue || "TBA",
            minTeamSize: event.minTeamSize || 1,
            maxTeamSize: event.maxTeamSize || 1,
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
            price:
              event.isPerHeadFee === 0
                ? `₹${Math.ceil(event.eventFee * 1.18)} / team`
                : `₹${Math.ceil(event.eventFee * 1.18)} / member`,
            rewards: [
              {
                place: "1st Place",
                amount: event.firstPrice,
                color: "bg-amber-500",
              },
              {
                place: "2nd Place",
                amount: event.secondPrice,
                color: "bg-gray-500",
              },
              {
                place: "3rd Place",
                amount: event.thirdPrice,
                color: "bg-orange-500",
              },
            ],
            clubname: event.clubName,
            poster: posterSrc,
            logo: logoSrc,
            emblems: godEmblemMapping[event.godName] || [],
            description:
              event.eventDescription || "No event description provided.",
            rules: event.rules != null ? [event.rules] : [],
            details: event.eventDescription || "No details provided.",
            isRegistered: event.isRegistered || 0,
            isGroup: event.isGroup,
          });
        } else {
          setEventData(null);
        }
      })
      .catch((error) => console.error("Error fetching event data:", error))
      .finally(() => setLoading(false));
  }, [eventid]);

  // Handler for team registration submission from the modal
  const handleTeamSubmit = async (teamData) => {
    // Show a confirmation prompt before proceeding
    const confirmed = window.confirm(
      "Team details received. Do you want to register the team and proceed to payment?"
    );

    console.log("Team Data:", teamData);
    if (confirmed) {
      try {
        // Call your API to register the team and get transaction details
        const response = await registerTeam(teamData);
        const responseData = response.DATA;
        console.log("Team registration response:", responseData);

        // Prepare payment data using responseData
        const payUData = {
          key: payU_Key,
          txnid: responseData.txnID,
          amount: responseData.amount,
          productinfo: responseData.productInfo,
          firstname: responseData.userName,
          email: responseData.userEmail,
          phone: responseData.phoneNumber,
          surl:
            responseData.surl ||
            `http://localhost:3000/transactions/verify/${responseData.txnID}`,
          furl:
            responseData.furl ||
            `http://localhost:3000/transactions/verify/${responseData.txnID}`,
          hash: responseData.hash,
        };

        console.log("PayU Data:", payUData);

        // Create and submit the payment form
        const payUForm = document.createElement("form");
        payUForm.method = "post";
        payUForm.action = payU_Action;

        for (const key in payUData) {
          if (Object.hasOwn(payUData, key)) {
            const hiddenField = document.createElement("input");
            hiddenField.type = "hidden";
            hiddenField.name = key;
            hiddenField.value = payUData[key];
            payUForm.appendChild(hiddenField);
          }
        }

        document.body.appendChild(payUForm);
        console.log("Submitting PayU form...");
        payUForm.submit();
      } catch (error) {
        alert(`Team registration failed: ${error.message}`);
      }
    }
  };

  // This function decides what happens when the register button is clicked.
  const handleRegister = async () => {
    if (eventData.isGroup) {
      // For group events, show the modal to collect team details.
      setShowTeamModal(true);
    } else {
      // For individual events, register directly and proceed to payment.
      try {
        const teamData = {
          eventID: eventData.eventID,
          totalMembers: 1,
          teamName: "Individual",
          teamMembers: [],
          memberRoles: [],
        };
        console.log("Team Data:", teamData);

        handleTeamSubmit(teamData);
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    }
  };

  if (loading) return <p className="text-white">Loading...</p>;
  if (!eventData) return <p className="text-white">Event not found</p>;

  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center">
      <Image
        src={logoSrc}
        alt="Event Logo"
        width={100}
        height={100}
        className="w-20 h-auto rounded-lg mt-[4rem] object-cover shadow-md"
        onError={() => {
          if (logoSrc !== placeholderClub) {
            setLogoSrc(placeholderClub);
          }
        }}
      />
      <p className="text-white text-center text-lg font-semibold">
        {eventData.clubname} Presents
      </p>
      <h1 className="text-white text-center text-4xl font-bold mx-4">
        {eventData.title}
      </h1>

      <div className="flex flex-col min-w-[90%] lg:flex-row items-center justify-center lg:items-start mt-5 mx-2 lg:mx-20 bg-[#ffffff]/2 rounded-xl shadow-lg overflow-hidden backdrop-blur-md">
        <div className="w-[350px] flex flex-col items-center p-5">
          <div className="relative w-fit h-fit">
            <Image
              src={posterSrc}
              alt="Event Poster"
              width={500}
              height={500}
              className="w-full h-auto rounded-lg object-cover mb-6 shadow-md"
              onError={() => {
                if (posterSrc !== placeholderPoster) {
                  setPosterSrc(placeholderPoster);
                }
              }}
            />
            {eventStatus == "0" && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                <span className="text-white text-2xl font-bold">
                  Event Closed
                </span>
              </div>
            )}
            {eventStatus == "2" && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 rounded-lg">
                <span className="text-white text-2xl font-bold">
                  Registrations Closed
                </span>
              </div>
            )}
          </div>
          {console.log("isLoggedIn state:", isLoggedIn)}
          {isLoggedIn ? (
            eventData.isRegistered === "1" ? (
              <button
                disabled
                className="bg-gray-500 border-gray-500 cursor-not-allowed w-full py-3 text-center rounded-xl text-lg font-bold shadow-md"
              >
                Registered
              </button>
            ) : (
              <button
                disabled={eventStatus != "1" ? true : false}
                onClick={handleRegister}
                className={`bg-[#322A1E] border-[#E5C14E] hover:scale-105 transition-all border-2 w-full text-[#E5C14E] py-3 text-center rounded-xl text-lg font-bold shadow-md ${
                  eventStatus != "1" ? "cursor-not-allowed" : ""
                }`}
              >
                {eventStatus == "1" ? "Register" : "Registrations Closed"}
              </button>
            )
          ) : (
            <Link
              href="/login"
              className={`bg-[#322A1E] border-[#E5C14E] hover:scale-105 transition-all border-2 w-full text-[#E5C14E] py-3 text-center rounded-xl text-lg font-bold shadow-md`}
            >
              Login to Register
            </Link>
          )}
        </div>

        <div className="lg:w-2/3 text-white py-8 px-4">
          <div className="text-md mb-6 leading-relaxed text-justify">
            {eventData.description.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>

          <div className="text-md">
            <div className="flex items-center gap-4 mb-2">
              <Calendar className="w-5 h-5 text-[#E5C14E]" />
              <span>{eventData.date === "1" ? "3rd" : "4th"} March 2025</span>
            </div>

            <div className="flex items-center gap-4 mb-2">
              <Clock className="w-5 h-5 text-[#E5C14E]" />
              <div className="flex flex-col">
                {eventData.time.split("\n").map((round, index) => (
                  <span key={index}>{round}</span>
                ))}
              </div>
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
        {eventData.rewards.map((reward, index) => {
          if (
            reward.amount !== "" &&
            reward.amount !== 0 &&
            reward.amount !== null &&
            reward.amount !== undefined
          ) {
            return (
              <div key={index} className="flex items-center space-x-4">
                <div className={`${reward.color} rounded-full p-5`}>
                  <Trophy className="w-5 h-5 md:w-10 md:h-10 text-white" />
                </div>
                <div>
                  <p className="text-xl font-semibold">{reward.place}</p>
                  <p className="text-lg">{reward.amount}</p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="w-[90%] mb-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Details</AccordionTrigger>
            <AccordionContent className="pt-3">
              <ul className="list-disc list-inside space-y-2">
                {eventData.details.split("\n").map((line, index) => (
                  <p key={index}>{line}</p> // Render each line as a <p> element
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {eventData.rules.length > 0 ? (
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
        ) : null}
      </div>

      {/* Modal for Group Event Team Registration */}
      {showTeamModal && (
        <TeamModal
          isOpen={showTeamModal}
          eventData={eventData}
          onClose={() => setShowTeamModal(false)}
          onTeamSubmit={handleTeamSubmit}
        />
      )}
    </div>
  );
};

export default Event;
