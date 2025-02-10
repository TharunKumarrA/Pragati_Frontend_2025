"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper and SwiperSlide components
import { Pagination } from "swiper/modules"; // Correct way to import Pagination module
import "swiper/css";
import "swiper/css/pagination";
import GodCard from "./god_card";
import GodModal from "./god_modal";

function GodsGallery() {
  const gods = [
    {
      god_image_src: "/Images/know_your_gods/1a_athena.webp",
      emblems_src: [
        "/Images/Emblems/1a_athena.webp",
        "/Images/Emblems/1b_eirene.webp",
      ],
      god_details: {
        god_name: "Athena",
        god_type: "Goddess of Wisdom",
        dept: "Human Resources",
        description:
          "I am Athena, goddess of wisdom and strategy, ruling Human Resources with intellect and precision. Alongside Eirene, goddess of peace and prosperity, we form an alliance that unites wisdom and harmony, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of greatness. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand sharp minds, bold strategies, and extraordinary vision.\n\nStand With Athena and Eirene\nCompete in events bearing our emblems and become part of a legacy defined by wisdom and peace. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/1b_eirene.webp",
      emblems_src: [
        "/Images/Emblems/1a_athena.webp",
        "/Images/Emblems/1b_eirene.webp",
      ],
      god_details: {
        god_name: "Eirene",
        god_type: "Goddess of Peace",
        dept: "Human Resources",
        description:
          "I am Eirene, goddess of peace and prosperity, ruling Human Resources with serenity and harmony. Alongside Athena, goddess of wisdom and strategy, we form an alliance that unites wisdom and harmony, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of greatness. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand sharp minds, bold strategies, and extraordinary vision.\n\nStand With Athena and Eirene\nCompete in events bearing our emblems and become part of a legacy defined by wisdom and peace. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/2a_apollo.webp",
      emblems_src: [
        "/Images/Emblems/2a_apollo.webp",
        "/Images/Emblems/2b_mnemosyne.webp",
      ],
      god_details: {
        god_name: "Apollo",
        god_type: "God of Arts",
        dept: "Analytics",
        description:
          "I am Apollo, god of arts and music, ruling Analytics with a fusion of creativity and data-driven precision. Alongside Mnemosyne, goddess of memory and language, we form an alliance that unites artistic expression with analytical insight, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of innovation. Each victory strengthens our pursuit of excellence, and your efforts will echo through Olympus. Our trials demand creative vision, analytical prowess, and strategic flair.\n\nStand With Apollo and Mnemosyne\nCompete in events bearing our emblems and become part of a legacy defined by innovation and insight. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/2b_mnemosyne.webp",
      emblems_src: [
        "/Images/Emblems/2a_apollo.webp",
        "/Images/Emblems/2b_mnemosyne.webp",
      ],
      god_details: {
        god_name: "Mnemosyne",
        god_type: "Goddess of Memory",
        dept: "Analytics",
        description:
          "I am Mnemosyne, goddess of memory and language, ruling Analytics with a blend of historical insight and creative storytelling. Alongside Apollo, god of arts and music, we form an alliance that unites analytical precision with artistic expression, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of innovation. Each victory strengthens our pursuit of excellence, and your efforts will echo through Olympus. Our trials demand analytical acumen, creative vision, and a passion for strategic thinking.\n\nStand With Apollo and Mnemosyne\nCompete in events bearing our emblems and become part of a legacy defined by innovation and insight. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/3_dionysus.webp",
      emblems_src: ["/Images/Emblems/3_dionysus.webp"],
      god_details: {
        god_name: "Dionysus",
        god_type: "God of Wine",
        dept: "Cultural Synergy",
        description:
          "I am Dionysus, god of wine and festivity, ruling Cultural Synergy with creativity and communal spirit. Join me in the pursuit of cultural connection and celebration, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of cultural vibrancy. Each victory strengthens our pursuit of unity, and your efforts will echo through Olympus. Our trials demand creative expression, enthusiastic participation, and a passion for cultural collaboration.\n\nStand With Dionysus\nCompete in events bearing our emblems and become part of a legacy defined by unity and festivity. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/4a_plutus.webp",
      emblems_src: [
        "/Images/Emblems/4a_plutus.webp",
        "/Images/Emblems/4b_demeter.webp",
      ],
      god_details: {
        god_name: "Plutus",
        god_type: "God of Wealth",
        dept: "Finance",
        description:
          "I am Plutus, god of wealth and prosperity, ruling Finance with abundance and affluence. Join me in the pursuit of riches and opulence, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of prosperity. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand financial acumen, strategic planning, and a keen eye for opportunity.\n\nStand With Plutus\nCompete in events bearing our emblems and become part of a legacy defined by wealth and success. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/4b_demeter.webp",
      emblems_src: [
        "/Images/Emblems/4a_plutus.webp",
        "/Images/Emblems/4b_demeter.webp",
      ],
      god_details: {
        god_name: "Demeter",
        god_type: "Goddess of Agriculture",
        dept: "Finance",
        description:
          "I am Demeter, goddess of agriculture and fertility, ruling Finance with strategic insight and abundance. Join me in the pursuit of financial growth and stability, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of prosperity. Each victory strengthens our pursuit of success, and your efforts will echo through Olympus. Our trials demand financial knowledge, strategic planning, and a commitment to excellence.\n\nStand With Demeter\nCompete in events bearing our emblems and become part of a legacy defined by wealth and success. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/5a_hermes.webp",
      emblems_src: [
        "/Images/Emblems/5a_hermes.webp",
        "/Images/Emblems/5b_peitho.webp",
      ],
      god_details: {
        god_name: "Hermes",
        god_type: "God of Communication",
        dept: "Marketing",
        description:
          "I am Hermes, god of communication and commerce, ruling Marketing with innovation and connection. Join me in the pursuit of influence and engagement, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of strategic communication. Each victory strengthens our pursuit of success, and your efforts will echo through Olympus. Our trials demand creative thinking, persuasive skills, and a knack for building networks.\n\nStand With Hermes\nCompete in events bearing our emblems and become part of a legacy defined by marketing and influence. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/5b_peitho.webp",
      emblems_src: [
        "/Images/Emblems/5a_hermes.webp",
        "/Images/Emblems/5b_peitho.webp",
      ],
      god_details: {
        god_name: "Peitho",
        god_type: "Goddess of Persuasion",
        dept: "Marketing",
        description:
          "I am Peitho, goddess of persuasion and seduction, ruling Marketing with charm and strategic finesse. Join me in the pursuit of influence and impactful communication, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of creative persuasion. Each victory strengthens our pursuit of success, and your efforts will echo through Olympus. Our trials demand persuasive skills, strategic insight, and a flair for innovation.\n\nStand With Peitho\nCompete in events bearing our emblems and become part of a legacy defined by marketing and influence. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/6a_nike.webp",
      emblems_src: [
        "/Images/Emblems/6a_nike.webp",
        "/Images/Emblems/6b_hephaestus.webp",
      ],
      god_details: {
        god_name: "Nike",
        god_type: "Goddess of Victory",
        dept: "Operations",
        description:
          "I am Nike, goddess of victory and triumph, ruling Operations with efficiency and determination. Join me in the pursuit of excellence and seamless execution, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of operational excellence. Each triumph strengthens our pursuit of success, and your efforts will echo through Olympus. Our trials demand strategic planning, meticulous execution, and unwavering commitment.\n\nStand With Nike\nCompete in events bearing our emblems and become part of a legacy defined by operational success. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/6b_hephaestus.webp",
      emblems_src: [
        "/Images/Emblems/6a_nike.webp",
        "/Images/Emblems/6b_hephaestus.webp",
      ],
      god_details: {
        god_name: "Hephaestus",
        god_type: "God of Craftsmanship",
        dept: "Operations",
        description:
          "I am Hephaestus, god of craftsmanship and technology, ruling Operations with inventive solutions and precision. Join me in the pursuit of efficient creation and strategic innovation, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of operational innovation. Each creation strengthens our pursuit of success, and your efforts will echo through Olympus. Our trials demand technical prowess, creative problem-solving, and a passion for excellence.\n\nStand With Hephaestus\nCompete in events bearing our emblems and become part of a legacy defined by operational ingenuity. Together, we shall secure timeless victory!",
      },
    },
  ];

  const [selectedGod, setSelectedGod] = useState(null);

  const openModal = (god) => {
    setSelectedGod(god);
  };

  const closeModal = () => {
    setSelectedGod(null);
  };

  return (
    <div>
      {/* Cards for larger screens */}
      <div className="hidden md:flex flex-nowrap gap-1 justify-center mt-10 w-full">
        {gods.map((god, index) => (
          <div
            key={index}
            className={`transition-transform duration-300 transform ${
              index % 2 === 0 ? "mt-3" : "-mt-3"
            } cursor-pointer`}
            onClick={() => openModal(god)}
          >
            <GodCard
              god_image_src={god.god_image_src}
              god_details={god.god_details}
            />
          </div>
        ))}
      </div>

      {/* Carousel for small screens */}
      <div className="block md:hidden mt-5">
        <Swiper
          modules={[Pagination]}
          spaceBetween={15} // Reduced spacing for better mobile fit
          slidesPerView={1}
          pagination={{ clickable: true }}
          className="w-full max-w-screen-md mx-auto"
        >
          {gods.map((god, index) => (
            <SwiperSlide key={index}>
              <div
                className="flex justify-center items-center h-full p-4" // Added padding for proper spacing
                onClick={() => openModal(god)}
              >
                <GodCard
                  god_image_src={god.god_image_src}
                  god_details={god.god_details}
                  className="max-w-[90%] mx-auto" // Ensure the card stays responsive
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal */}
      {selectedGod && (
        <GodModal
          god={selectedGod}
          closeModal={closeModal}
          className="z-50" // Ensure the modal overlays correctly
        />
      )}
    </div>
  );
}

export default GodsGallery;
