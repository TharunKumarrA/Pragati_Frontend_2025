"use client";
import { useState, useEffect } from "react";
import EventCard from "./components/EventCards";
import FilterSection from "./components/FilterSection";
import { getEvents } from "../_utils/api_endpoint_handler";

// Mapping of god names to their emblem image paths
const godEmblemMapping = {
  Athena: ["/Images/Emblems/1a_athena.webp", "/Images/Emblems/1b_athena.webp"],
  Apollo: [
    "/Images/Emblems/2a_apollo.webp",
    "/Images/Emblems/2b_mnemosyne.webp",
  ],
  Dionysus: ["/Images/Emblems/3a_dionysus.webp"], // Only one emblem; duplicate if needed
  Plutus: ["/Images/Emblems/4a_plutus.webp", "/Images/Emblems/4b_demeter.webp"],
  Hermes: ["/Images/Emblems/5a_hermes.webp", "/Images/Emblems/5b_peitho.webp"],
  Zeus: ["/Images/Emblems/6a_nike.webp", "/Images/Emblems/6b_hephaestus.webp"],
};

const EventPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    tags: [], // Now an array of strings
    dates: [], // Now an array of strings
    status: null,
    type: null,
  });

  useEffect(() => {
    getEvents()
      .then((data) => {
        if (data.DATA) {
          const formattedEvents = data.DATA.map((event) => ({
            title: event.eventName,
            date: event.eventDate, // e.g., "1"
            time: event.time,
            venue: event.venue,
            price: event.eventFee,
            poster: event.eventImageUrl,
            eventid: event.eventID,
            tags: event.tags.map((tag) => tag.tagName),
            eventstatus: event.eventStatus,
            type: event.isGroup === 1 ? "Group" : "Individual",
            godName: event.godName, // Use godName from API
          }));
          setEvents(formattedEvents);
          console.log("Events:", formattedEvents);
        }
      })
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Filtering logic updated to work with strings directly
  const filteredEvents = events.filter((event) => {
    // Search filter (by title)
    if (
      searchQuery &&
      !event.title.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Tags filter (filters.tags is an array of strings)
    if (filters.tags.length > 0) {
      const selectedTagValues = filters.tags.map((tag) => tag.toLowerCase());
      if (
        !event.tags.some((tag) => selectedTagValues.includes(tag.toLowerCase()))
      ) {
        return false;
      }
    }

    // Date filter (filters.dates is an array of strings)
    if (filters.dates.length > 0) {
      if (!filters.dates.includes(event.date)) {
        return false;
      }
    }

    // Status filter
    if (filters.status) {
      if (
        (filters.status === "Open" && event.eventstatus === "0") ||
        (filters.status === "Closed" && event.eventstatus !== "0")
      ) {
        return false;
      }
    }

    // Group / Individual filter
    if (filters.type && event.type !== filters.type) {
      return false;
    }

    return true;
  });

  return (
    <div className="py-5 bg-black bg-opacity-50 min-h-screen">
      <h1 className="text-white mt-10 text-[2rem] pt-5 md:text-[3rem] text-center">
        Events
      </h1>
      <div className="text-center my-5 mb-1 w-[95%] mx-auto">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-3 py-3 md:w-[70%] w-[80%] text-black rounded-xl focus:border-0 focus:outline-0"
        />
      </div>
      <FilterSection onFilterChange={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-10">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => {
            // Use godName from the event to get the emblem paths
            const god = event.godName ? event.godName.trim() : "";
            const emblems = godEmblemMapping[god] || [];
            let emblem1 = "";
            let emblem2 = "";
            if (emblems.length === 1) {
              // Duplicate if only one emblem is available
              emblem1 = emblems[0];
              emblem2 = emblems[0];
            } else if (emblems.length >= 2) {
              emblem1 = emblems[0];
              emblem2 = emblems[1];
            }
            console.log(
              "God:",
              god,
              "=> Emblem1:",
              emblem1,
              "Emblem2:",
              emblem2
            );
            return (
              <EventCard
                key={index}
                title={event.title}
                date={event.date}
                time={event.time}
                venue={event.venue}
                price={event.price}
                poster={event.poster}
                eventid={event.eventid}
                tags={event.tags}
                isDisabled={event.eventstatus === "0"}
                emblem1={emblem1}
                emblem2={emblem2}
                type={event.type}
              />
            );
          })
        ) : (
          <p className="text-white text-center col-span-4">No events found</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
