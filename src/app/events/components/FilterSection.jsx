import { useState, useEffect } from "react";
import SingleSelectFilter from "./SingleSelectFilter";
import MultiSelect from "@/app/components/events/multi-select";

// Tag options (each option has a value and label)
const tags = [
  { value: "artificial intelligence", label: "Artificial Intelligence" },
  { value: "leadership", label: "Leadership" },
  { value: "marketing", label: "Marketing" },
  { value: "finance", label: "Finance" },
  { value: "technology", label: "Technology" },
  { value: "entrepreneurship", label: "Entrepreneurship" },
  { value: "strategy", label: "Strategy" },
];

// Date options (should match event.eventDate format)
const dates = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  // Add more as needed
];

const FilterSection = ({ onFilterChange }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [status, setStatus] = useState(null);
  const [type, setType] = useState(null);

  // When any filter changes, update the parent.
  // We convert each selected value to a string by extracting the value if needed.
  useEffect(() => {
    onFilterChange({
      tags: selectedTags.map((tag) =>
        typeof tag === "string" ? tag : tag.value
      ),
      dates: selectedDates.map((date) =>
        typeof date === "string" ? date : date.value
      ),
      status,
      type,
    });
  }, [selectedTags, selectedDates, status, type, onFilterChange]);

  const handleStatusToggle = (selection) => {
    if (selection["Open"]) {
      setStatus("Open");
    } else if (selection["Closed"]) {
      setStatus("Closed");
    } else {
      setStatus(null);
    }
  };

  const handleTypeToggle = (selection) => {
    if (selection["Group"]) {
      setType("Group");
    } else if (selection["Individual"]) {
      setType("Individual");
    } else {
      setType(null);
    }
  };

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
        placeholder="Select Date"
        variant="inverted"
        animation={2}
        maxCount={3}
      />
      <SingleSelectFilter
        option1="Open"
        option2="Closed"
        onToggle={handleStatusToggle}
      />
      <SingleSelectFilter
        option1="Group"
        option2="Individual"
        onToggle={handleTypeToggle}
      />
    </div>
  );
};

export default FilterSection;
