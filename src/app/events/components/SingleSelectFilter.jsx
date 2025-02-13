import { useState } from "react";

export default function SingleSelectFilter({ option1 = "Option 1", option2 = "Option 2", onToggle }) {
  const [selected, setSelected] = useState({ [option1]: false, [option2]: false });

  const toggle = (option) => {
    const newSelection = { ...selected, [option]: !selected[option] };
    setSelected(newSelection);
    onToggle && onToggle(newSelection);
  };

  return (
    <div className="inline-flex min-w-max border border-[#5b4711] rounded-lg overflow-hidden">
      <button
        onClick={() => toggle(option1)}
        className={`py-3 px-2 md:px-3 md:py-3 text-sm  font-semibold transition ${
          selected[option1] ? "bg-[#E5C14E] text-[#5b4711]" : "bg-white text-[#5b4711]"
        } border-r border-[#5b4711]`}
      >
        {option1}
      </button>
      <button
        onClick={() => toggle(option2)}
        className={`py-3 px-2 md:px-2 md:py-3 text-sm  font-semibold transition ${
          selected[option2] ? "bg-[#E5C14E] text-[#5b4711]" : "bg-white text-[#5b4711]"
        }`}
      >
        {option2}
      </button>
    </div>
  );
}
