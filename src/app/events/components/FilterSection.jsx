import { useState } from "react";
import SingleSelectFilter from "./SingleSelectFilter";
import MultiSelect from "@/app/components/events/multi-select";

const tags = [
  { value: "networking", label: "Networking" },
  { value: "leadership", label: "Leadership" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "technology", label: "Technology" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "strategy", label: "Strategy" },
];

const dates = [
  { value: "3rd", label: "01" },
  { value: "4th", label: "02" },
];

const FilterSection = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <div className="mx-auto w-full px-2 py-4 pb-6 flex flex-wrap items-center justify-center gap-2">
      <MultiSelect
        options={tags}
        onValueChange={setSelectedTags}
        defaultValue={selectedTags}
        placeholder="Select Tags"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      <MultiSelect
        options={dates}
        onValueChange={setSelectedDates}
        defaultValue={selectedDates}
        placeholder="Select Day"
        variant="inverted"
        animation={2}
        maxCount={3}
      />

      <SingleSelectFilter option1="Management" option2="Non Management" className="" />
      <SingleSelectFilter option1="Open" option2="Closed" className="" />
      <SingleSelectFilter option1="Group" option2="Individual" className="" />
      
    </div>
  );
};

export default FilterSection;
