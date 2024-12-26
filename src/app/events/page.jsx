"use client";
import Navbar from "../components/navbar";
import EventCard from "./components/EventCards";

const events = [
  {
    title: "Athena's Debate Arena",
    date: "19th Feb",
    type: "Individual",
    price: "₹200",
    image: "/Images/backgrounds/owlcard.png",
    symbols: [
      "/Images/Emblems/4b_demeter.webp",
      "/Images/Emblems/4a_plutus.webp",
    ],
  },
  {
    title: "Athena's Debate Arena",
    date: "19th Feb",
    type: "Individual",
    price: "₹200",
    image: "/Images/backgrounds/owlcard.png",
    symbols: [
      "/Images/Emblems/4b_demeter.webp",
      "/Images/Emblems/4a_plutus.webp",
    ],
  },
  {
    title: "Athena's Debate Arena",
    date: "19th Feb",
    type: "Individual",
    price: "₹200",
    image: "/Images/backgrounds/owlcard.png",
    symbols: [
      "/Images/Emblems/4b_demeter.webp",
      "/Images/Emblems/4a_plutus.webp",
    ],
  },
  {
    title: "Athena's Debate Arena",
    date: "19th Feb",
    type: "Individual",
    price: "₹200",
    image: "/Images/backgrounds/owlcard.png",
    symbols: [
      "/Images/Emblems/4b_demeter.webp",
      "/Images/Emblems/4a_plutus.webp",
    ],
  },
  {
    title: "Athena's Debate Arena",
    date: "19th Feb",
    type: "Individual",
    price: "₹200",
    image: "/Images/backgrounds/owlcard.png",
    symbols: [
      "/Images/Emblems/4b_demeter.webp",
      "/Images/Emblems/4a_plutus.webp",
    ],
  },
  {
    title: "Athena's Debate Arena",
    date: "19th Feb",
    type: "Individual",
    price: "₹200",
    image: "/Images/backgrounds/owlcard.png",
    symbols: [
      "/Images/Emblems/4b_demeter.webp",
      "/Images/Emblems/4a_plutus.webp",
    ],
  }
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center bg-fixed relative z-0" style={{ backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')" }}>
      <Navbar/>
      <h1 className="pt-[4.5rem] pb-[1rem] text-[2.5rem] text-white mx-auto text-center w-full">Events</h1>
      <div className="px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center">
        {events.map((event, index) => (
          <EventCard
            key={index}
            title={event.title}
            date={event.date}
            type={event.type}
            price={event.price}
            image={event.image}
            symbols={event.symbols}
          />
        ))}
      </div>
    </div>
  );
}
