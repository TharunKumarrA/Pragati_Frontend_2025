"use client"
import React, { useState } from "react";
import GodCard from "./god_card";
import { X } from "lucide-react"; 
import Image from "next/image"; 
import GodModal from "./god_modal";
function GodsGallery() {
  const gods = [
    {
      god_image_src: "/Images/know_your_gods/1a_athena.webp",
      emblems_src: ["/Images/Emblems/1a_athena.webp", "/Images/Emblems/1b_eirene.webp"],
      god_details: {
        god_name: "Athena",
        god_type: "Goddess of Wisdom",
        dept: "Human Resources",
        description: "I am Athena, goddess of wisdom and strategy, ruling Human Resources with intellect and precision. Alongside Eirene, goddess of peace and prosperity, we form an alliance that unites wisdom and harmony, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of greatness. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand sharp minds, bold strategies, and extraordinary vision.\n\nStand With Athena and Eirene\nCompete in events bearing our emblems and become part of a legacy defined by wisdom and peace. Together, we shall secure timeless victory!"
      }
    },    
    {
      god_image_src: "/Images/know_your_gods/1b_eirene.webp",
      emblems_src: ["/Images/Emblems/1a_athena.webp", "/Images/Emblems/1b_eirene.webp"],
      god_details: {
        god_name: "Eirene",
        god_type: "Goddess of Peace",
        dept: "Human Resources",
        description: "I am Eirene, goddess of peace and prosperity, ruling Human Resources with serenity and harmony. Alongside Athena, goddess of wisdom and strategy, we form an alliance that unites wisdom and harmony, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of greatness. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand sharp minds, bold strategies, and extraordinary vision.\n\nStand With Athena and Eirene\nCompete in events bearing our emblems and become part of a legacy defined by wisdom and peace. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/2a_apollo.webp",
      emblems_src: ["/Images/Emblems/2a_apollo.webp", "/Images/Emblems/2b_mnemosyne.webp"],
      god_details: {
        god_name: "Apollo",
        god_type: "God of Arts",
        dept: "Creative Arts",
        description: "I am Apollo, god of arts and music, ruling Creative Arts with creativity and inspiration. Alongside Mnemosyne, goddess of memory and language, we form an alliance that unites art and history, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of creativity. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand artistic vision, musical talent, and poetic flair.\n\nStand With Apollo and Mnemosyne\nCompete in events bearing our emblems and become part of a legacy defined by art and history. Together, we shall secure",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/2b_mnemosyne.webp",
      emblems_src: ["/Images/Emblems/2a_apollo.webp", "/Images/Emblems/2b_mnemosyne.webp"],
      god_details: {
        god_name: "Mnemosyne",
        god_type: "Goddess of Memory",
        dept: "Creative Arts",
        description: "I am Mnemosyne, goddess of memory and language, ruling Creative Arts with history and storytelling. Alongside Apollo, god of arts and music, we form an alliance that unites art and history, guiding us to triumph at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of creativity. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand artistic vision, musical talent, and poetic flair.\n\nStand With Apollo and Mnemosyne\nCompete in events bearing our emblems and become part of a legacy defined by art and history. Together, we shall secure",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/3_dionysus.webp",
      emblems_src: ["/Images/Emblems/3_dionysus.webp"],
      god_details: {
        god_name: "Dionysus",
        god_type: "God of Wine",
        dept: "Hospitality",
        description: "I am Dionysus, god of wine and festivity, ruling Hospitality with joy and celebration. Join me in the pursuit of merriment and revelry, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of festivity. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand creativity, enthusiasm, and a love for celebration.\n\nStand With Dionysus\nCompete in events bearing our emblems and become part of a legacy defined by joy and festivity. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/4a_plutus.webp",
      emblems_src: ["/Images/Emblems/4a_plutus.webp", "/Images/Emblems/4b_demeter.webp"],
      god_details: {
        god_name: "Plutus",
        god_type: "God of Wealth",
        dept: "Finance",
        description: "I am Plutus, god of wealth and prosperity, ruling Finance with abundance and affluence. Join me in the pursuit of riches and opulence, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of prosperity. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand financial acumen, strategic planning, and a keen eye for opportunity.\n\nStand With Plutus\nCompete in events bearing our emblems and become part of a legacy defined by wealth and success. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/4b_demeter.webp",
      emblems_src: ["/Images/Emblems/4a_plutus.webp", "/Images/Emblems/4b_demeter.webp"],
      god_details: {
        god_name: "Demeter",
        god_type: "Goddess of Agriculture",
        dept: "Sustainability",
        description: "I am Demeter, goddess of agriculture and fertility, ruling Sustainability with growth and abundance. Join me in the pursuit of sustainability and nourishment, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of growth. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand agricultural knowledge, environmental stewardship, and a commitment to sustainability.\n\nStand With Demeter\nCompete in events bearing our emblems and become part of a legacy defined by growth and abundance. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/5a_hermes.webp",
      emblems_src: ["/Images/Emblems/5a_hermes.webp", "/Images/Emblems/5b_peitho.webp"],
      god_details: {
        god_name: "Hermes",
        god_type: "God of Communication",
        dept: "Public Relations",
        description: "I am Hermes, god of communication and commerce, ruling Public Relations with eloquence and diplomacy. Join me in the pursuit of connection and influence, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of communication. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand persuasive skills, strategic thinking, and a flair for negotiation.\n\nStand With Hermes\nCompete in events bearing our emblems and become part of a legacy defined by communication and influence. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/5b_peitho.webp",
      emblems_src: ["/Images/Emblems/5a_hermes.webp", "/Images/Emblems/5b_peitho.webp"],
      god_details: {
        god_name: "Peitho",
        god_type: "Goddess of Persuasion",
        dept: "Public Relations",
        description: "I am Peitho, goddess of persuasion and seduction, ruling Public Relations with charm and allure. Join me in the pursuit of influence and diplomacy, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of persuasion. Each victory strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand persuasive skills, strategic thinking, and a flair for negotiation.\n\nStand With Peitho\nCompete in events bearing our emblems and become part of a legacy defined by charm and influence. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/6a_nike.webp",
      emblems_src: ["/Images/Emblems/6a_nike.webp", "/Images/Emblems/6b_hephaestus.webp"],
      god_details: {
        god_name: "Nike",
        god_type: "Goddess of Victory",
        dept: "Sports",
        description: "I am Nike, goddess of victory and triumph, ruling Sports with strength and agility. Join me in the pursuit of excellence and glory, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of victory. Each triumph strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand athletic prowess, competitive spirit, and a drive for success.\n\nStand With Nike\nCompete in events bearing our emblems and become part of a legacy defined by victory and triumph. Together, we shall secure timeless victory!",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/6b_hephaestus.webp",
      emblems_src: ["/Images/Emblems/6a_nike.webp", "/Images/Emblems/6b_hephaestus.webp"],
      god_details: {
        god_name: "Hephaestus",
        god_type: "God of Craftsmanship",
        dept: "Engineering",
        description: "I am Hephaestus, god of craftsmanship and technology, ruling Engineering with innovation and precision. Join me in the pursuit of creation and invention, and together we shall secure victory at the Olympian Conclave.\n\nWhy Join Us?\nBy choosing our events, you align with a legacy of innovation. Each creation strengthens our pursuit of glory, and your efforts will echo through Olympus. Our trials demand technical skills, creative thinking, and a passion for invention.\n\nStand With Hephaestus\nCompete in events bearing our emblems and become part of a legacy defined by craftsmanship and technology. Together, we shall secure timeless victory!",
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
      {/* Cards */}
      <div className="flex flex-wrap gap-1 justify-center items-start self-stretch mt-10 max-md:max-w-full cursor-pointer">
        {gods.map((god, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              index % 2 === 0 ? "mt-3" : "-mt-3"
            }`}
            onClick={() => openModal(god)}
          >
            <GodCard
              god_image_src={god.god_image_src}
              god_details={god.god_details}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedGod && (
        <GodModal god={selectedGod} closeModal={closeModal} /> 
      )}
    </div>
  );
}

export default GodsGallery;
