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
  { value: "2nd", label: "02" },
  { value: "3rd", label: "03" },
];

const FilterSection = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);

  return (
    <div className="mx-auto w-full px-2 py-4 pb-6 flex flex-wrap items-center justify-center gap-1 sm:gap-2">
      {/* MultiSelect Filters */}
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
        placeholder="Select Dates"
        variant="inverted"
        animation={2}
        maxCount={3}
      />

      {/* Single Select Filters */}
      <SingleSelectFilter option1="Management" option2="Non Management" className="shrink-0" />
      <SingleSelectFilter option1="Event" option2="Workshop" className="shrink-0" />
      <SingleSelectFilter option1="Group" option2="Individual" className="shrink-0" />
      <SingleSelectFilter option1="Registered" option2="Not Registered" className="shrink-0" />
    </div>
  );
};

export default FilterSection;
