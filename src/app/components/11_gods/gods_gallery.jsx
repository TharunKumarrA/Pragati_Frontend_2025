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
      god_details: {
        god_name: "Athena",
        god_type: "Goddess of Wisdom",
        dept: "Human Resources",
        description: "Athena is the goddess of wisdom, strategy, and warcraft. She is known for her intelligence and rational approach to conflict.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/1b_eirene.webp",
      god_details: {
        god_name: "Eirene",
        god_type: "Goddess of Peace",
        dept: "Human Resources",
        description: "Eirene, the goddess of peace, symbolizes harmony and goodwill among people. Her presence ensures tranquility.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/2a_apollo.webp",
      god_details: {
        god_name: "Apollo",
        god_type: "God of Arts",
        dept: "Creative Arts",
        description: "Apollo, the god of music and arts, inspires creativity and brings light to the world through his talents.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/2b_mnemosyne.webp",
      god_details: {
        god_name: "Mnemosyne",
        god_type: "Goddess of Memory",
        dept: "Creative Arts",
        description: "Mnemosyne is the goddess of memory and the inventor of language and words. She preserves the stories of the past.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/3_dionysus.webp",
      god_details: {
        god_name: "Dionysus",
        god_type: "God of Wine",
        dept: "Hospitality",
        description: "Dionysus, the god of wine and festivities, brings joy and celebration to those who follow his path.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/4a_plutus.webp",
      god_details: {
        god_name: "Plutus",
        god_type: "God of Wealth",
        dept: "Finance",
        description: "Plutus, the god of wealth, ensures prosperity and abundance for those who honor him.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/4b_demeter.webp",
      god_details: {
        god_name: "Demeter",
        god_type: "Goddess of Agriculture",
        dept: "Sustainability",
        description: "Demeter is the goddess of agriculture and the harvest. She nurtures the earth to provide sustenance.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/5a_hermes.webp",
      god_details: {
        god_name: "Hermes",
        god_type: "God of Communication",
        dept: "Public Relations",
        description: "Hermes, the messenger god, facilitates communication and guides souls to the underworld.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/5b_peitho.webp",
      god_details: {
        god_name: "Peitho",
        god_type: "Goddess of Persuasion",
        dept: "Public Relations",
        description: "Peitho, the goddess of persuasion, uses her charm and rhetoric to influence others.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/6a_nike.webp",
      god_details: {
        god_name: "Nike",
        god_type: "Goddess of Victory",
        dept: "Sports",
        description: "Nike, the goddess of victory, empowers those who strive for success and triumph.",
      },
    },
    {
      god_image_src: "/Images/know_your_gods/6b_hephaestus.webp",
      god_details: {
        god_name: "Hephaestus",
        god_type: "God of Craftsmanship",
        dept: "Engineering",
        description: "Hephaestus, the god of craftsmanship, creates tools and artifacts with unmatched skill and precision.",
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
      <div className="flex flex-wrap gap-4 justify-center items-start self-stretch mt-10 max-md:max-w-full cursor-pointer">
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
