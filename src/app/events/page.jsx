'use client'
import { useState, useEffect } from "react";
import EventCard from "./components/EventCards";
import FilterSection from "./components/FilterSection";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const EventPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${baseURL}/event/all`)
      .then((response) => response.json())
      .then((data) => {
        console.log(`${baseURL}/event/all`)
        if (data.DATA) {
          const formattedEvents = data.DATA.map((event) => ({
            title: event.eventName,
            date: event.eventDate,
            time: event.time,
            venue: event.venue,
            price: event.eventFee,
            emblem1: "/Images/Emblems/5a_hermes.webp",
            emblem2: "/Images/Emblems/5b_peitho.webp",
            poster: "/Images/temp/4.png",
            eventid: event.eventID,
            tags: event.tags.map((tag) => tag.tagName),
            eventstatus: event.eventStatus
          }));
          setEvents(formattedEvents);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="py-5 bg-black bg-opacity-50 min-h-screen">
      <h1 className="text-white mt-10 text-[2rem] pt-5 md:text-[3rem] text-center">Events</h1>
      <div className="text-center my-5 mb-1 w-[95%] mx-auto">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-3 md:w-[70%] w-[80%] text-black rounded-xl focus:border-0 focus:outline-0"
        />
      </div>
      <FilterSection />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-10">
        {events.length > 0 ? (
          events.map((event, index) => (
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
              tags={event.tags}
              isDisabled={event.eventStatus==="0"}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-4">No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
