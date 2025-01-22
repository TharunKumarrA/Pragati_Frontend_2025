"use client";
import EventCard from "../components/eventcards";

const page = () => {
  return (
      <div className="py-5 bg-black bg-opacity-50 min-h-screen">
        <h1 className="text-white mt-10 text-[2rem] pt-5 md:text-[3rem] text-center">Events</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-10">
          <EventCard
            title="Athena's Debate Arena"
            date="August 25, 2024"
            time="5:00 PM IST"
            venue="Conference Hall, XYZ"
            price="299"
            emblem1="/Images/Emblems/1a_athena.webp"
            emblem2="/Images/Emblems/1b_eirene.webp"
            poster="/Images/3.png"
  
          />
          <EventCard
            title="Athena's Debate Arena"
            date="August 25, 2024"
            time="5:00 PM IST"
            venue="Conference Hall, XYZ"
            price="299"
            emblem1="/Images/Emblems/4a_plutus.webp"
            emblem2="/Images/Emblems/4b_demeter.webp"
            poster="/Images/2.png"
          />
          <EventCard
            title="Athena's Debate Arena"
            date="August 25, 2024"
            time="5:00 PM IST"
            venue="Conference Hall, XYZ"
            price="299"
            emblem1="/Images/Emblems/2a_apollo.webp"
            emblem2="/Images/Emblems/2b_mnemosyne.webp"
            poster="/Images/1.png"
          />
          <EventCard
            title="Athena's Debate Arena"
            date="August 25, 2024"
            time="5:00 PM IST"
            venue="Conference Hall, XYZ"
            price="299"
            emblem1="/Images/Emblems/5a_hermes.webp"
            emblem2="/Images/Emblems/5b_peitho.webp"
            poster="/Images/4.png"
          />
          <EventCard
            title="Athena's Debate Arena"
            date="August 25, 2024"
            time="5:00 PM IST"
            venue="Conference Hall, XYZ"
            price="299"
            emblem1="/Images/Emblems/6a_nike.webp"
            emblem2="/Images/Emblems/6b_hephaestus.webp"
            poster="/Images/5.png"
          />
          <EventCard
            title="Athena's Debate Arena"
            date="August 25, 2024"
            time="5:00 PM IST"
            venue="Conference Hall, XYZ"
            price="299"
            emblem1="/Images/Emblems/5a_hermes.webp"
            emblem2="/Images/Emblems/5b_peitho.webp"
            poster="/Images/poster.webp"
          />
        </div>
      </div>
  );
};

export default page;
