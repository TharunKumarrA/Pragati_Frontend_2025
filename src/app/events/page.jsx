"use client";
import { useState } from "react";
import EventCard from "../components/eventcards";
const events = [
  {
    title: "Athena's Debate Arena",
    date: "August 25, 2024",
    time: "5:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/1a_athena.webp",
    emblem2: "/Images/Emblems/1b_eirene.webp",
    poster: "/Images/3.png",
    eventid: "1"
  },
  {
    title: "Plutus' Financial Battle",
    date: "August 26, 2024",
    time: "4:00 PM IST",
    venue: "Auditorium, ABC",
    price: "199",
    emblem1: "/Images/Emblems/4a_plutus.webp",
    emblem2: "/Images/Emblems/4b_demeter.webp",
    poster: "/Images/2.png",
    eventid: "2"
  },
  {
    title: "Apollo's Innovation Challenge",
    date: "August 27, 2024",
    time: "3:00 PM IST",
    venue: "Innovation Hub, XYZ",
    price: "249",
    emblem1: "/Images/Emblems/2a_apollo.webp",
    emblem2: "/Images/Emblems/2b_mnemosyne.webp",
    poster: "/Images/temp/1.png",
    eventid: "3"
  },
  {
    title: "Hermes' Speed Quiz",
    date: "August 28, 2024",
    time: "6:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "150",
    emblem1: "/Images/Emblems/5a_hermes.webp",
    emblem2: "/Images/Emblems/5b_peitho.webp",
    poster: "/Images/temp/4.png",
eventid: "4"
  },
  {
    title: "Nike's Battle of Strength",
    date: "August 29, 2024",
    time: "7:00 PM IST",
    venue: "Outdoor Arena, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/6a_nike.webp",
    emblem2: "/Images/Emblems/6b_hephaestus.webp",
    poster: "/Images/temp/5.png",
    eventid: "5"
  },
  {
    title: "Athena's Debate Arena",
    date: "August 30, 2024",
    time: "5:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/1a_athena.webp",
    emblem2: "/Images/Emblems/1b_eirene.webp",
    poster: "/Images/temp/poster.webp",
    eventid: "6"
  },
  {
    title: "Hermes' Speed Quiz",
    date: "August 31, 2024",
    time: "6:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "150",
    emblem1: "/Images/Emblems/5a_hermes.webp",
    emblem2: "/Images/Emblems/5b_peitho.webp",
    poster: "/Images/temp/4.png",
    eventid: "7"
  },
  {
    title: "Nike's Battle of Strength",
    date: "September 1, 2024",
    time: "7:00 PM IST",
    venue: "Outdoor Arena, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/6a_nike.webp",
    emblem2: "/Images/Emblems/6b_hephaestus.webp",
    poster: "/Images/temp/5.png",
    eventid: "8"
  },
  {
    title: "Plutus' Financial Battle",
    date: "September 2, 2024",
    time: "4:00 PM IST",
    venue: "Auditorium, ABC",
    price: "199",
    emblem1: "/Images/Emblems/4a_plutus.webp",
    emblem2: "/Images/Emblems/4b_demeter.webp",
    poster: "/Images/2.png",
    eventid: "9"
  },
  {
    title: "Apollo's Innovation Challenge",
    date: "September 3, 2024",
    time: "3:00 PM IST",
    venue: "Innovation Hub, XYZ",
    price: "249",
    emblem1: "/Images/Emblems/2a_apollo.webp",
    emblem2: "/Images/Emblems/2b_mnemosyne.webp",
    poster: "/Images/temp/1.png",
    eventid: "10"
  },
  {
    title: "Athena's Debate Arena",
    date: "September 4, 2024",
    time: "5:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/1a_athena.webp",
    emblem2: "/Images/Emblems/1b_eirene.webp",
    poster: "/Images/3.png",
    eventid: "11"
  },
  {
    title: "Nike's Battle of Strength",
    date: "September 5, 2024",
    time: "7:00 PM IST",
    venue: "Outdoor Arena, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/6a_nike.webp",
    emblem2: "/Images/Emblems/6b_hephaestus.webp",
    poster: "/Images/temp/5.png",
    eventid: "12"
  },
  {
    title: "Hermes' Speed Quiz",
    date: "September 6, 2024",
    time: "6:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "150",
    emblem1: "/Images/Emblems/5a_hermes.webp",
    emblem2: "/Images/Emblems/5b_peitho.webp",
    poster: "/Images/temp/4.png",
    eventid: "13"
  },
  {
    title: "Plutus' Financial Battle",
    date: "September 7, 2024",
    time: "4:00 PM IST",
    venue: "Auditorium, ABC",
    price: "199",
    emblem1: "/Images/Emblems/4a_plutus.webp",
    emblem2: "/Images/Emblems/4b_demeter.webp",
    poster: "/Images/2.png",
    eventid: "14"
  },
  {
    title: "Athena's Debate Arena",
    date: "September 8, 2024",
    time: "5:00 PM IST",
    venue: "Conference Hall, XYZ",
    price: "299",
    emblem1: "/Images/Emblems/1a_athena.webp",
    emblem2: "/Images/Emblems/1b_eirene.webp",
    poster: "/Images/3.png",
    eventid: "15"
  }
];

const page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="py-5 bg-black bg-opacity-50 min-h-screen">
      <h1 className="text-white mt-10 text-[2rem] pt-5 md:text-[3rem] text-center">Events</h1>
      <div className="text-center my-5 mb-8 w-[95%] mx-auto">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-3 md:w-[70%] w-[80%] text-black rounded-xl focus:border-0 focus:outline-0"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-10">
      {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => ((
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            time={event.time}
            venue={event.venue}
            price={event.price}
            emblem1={event.emblem1}
            emblem2={event.emblem2}
            poster={event.poster}
            eventid={event.eventid}
          />
        ))
      )) : (
        <p className="text-white text-center col-span-4">No events found</p>
      )}
      </div>
    </div>
  );
};

export default page;
