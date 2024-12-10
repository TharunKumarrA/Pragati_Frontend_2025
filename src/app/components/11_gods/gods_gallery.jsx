import GodCard from "./god_card";

function GodsGallery() {
  const gods = [
    {
      god_image_src: "/Images/know_your_gods/1a_athena.webp",
      god_details: { god_name: "Athena", god_type: "Goddess of Wisdom", dept: "Human Resources" },
    },
    {
      god_image_src: "/Images/know_your_gods/1b_eirene.webp",
      god_details: { god_name: "Eirene", god_type: "Goddess of Peace", dept: "Human Resources" },
    },
    {
      god_image_src: "/Images/know_your_gods/2a_apollo.webp",
      god_details: { god_name: "Apollo", god_type: "God of Music & Arts", dept: "Creative Arts" },
    },
    {
      god_image_src: "/Images/know_your_gods/2b_mnemosyne.webp",
      god_details: { god_name: "Mnemosyne", god_type: "Goddess of Memory", dept: "Creative Arts" },
    },
    {
      god_image_src: "/Images/know_your_gods/3_dionysus.webp",
      god_details: { god_name: "Dionysus", god_type: "God of Wine & Festivity", dept: "Hospitality" },
    },
    {
      god_image_src: "/Images/know_your_gods/4a_plutus.webp",
      god_details: { god_name: "Plutus", god_type: "God of Wealth", dept: "Finance" },
    },
    {
      god_image_src: "/Images/know_your_gods/4b_demeter.webp",
      god_details: { god_name: "Demeter", god_type: "Goddess of Agriculture", dept: "Sustainability" },
    },
    {
      god_image_src: "/Images/know_your_gods/5a_hermes.webp",
      god_details: { god_name: "Hermes", god_type: "God of Communication", dept: "Public Relations" },
    },
    {
      god_image_src: "/Images/know_your_gods/5b_peitho.webp",
      god_details: { god_name: "Peitho", god_type: "Goddess of Persuasion", dept: "Public Relations" },
    },
    {
      god_image_src: "/Images/know_your_gods/6a_nike.webp",
      god_details: { god_name: "Nike", god_type: "Goddess of Victory", dept: "Sports" },
    },
    {
      god_image_src: "/Images/know_your_gods/6b_hephaestus.webp",
      god_details: { god_name: "Hephaestus", god_type: "God of Craftsmanship", dept: "Engineering" },
    },
  ];
  

  return (
    <div className="flex flex-wrap gap-2.5 justify-center items-center self-stretch mt-10 max-md:max-w-full">
      {gods.map((god, index) => (
        <GodCard
          key={index}
          god_image_src={god.god_image_src}
          god_details={god.god_details}
        />
      ))}
    </div>
  );
}

export default GodsGallery;
