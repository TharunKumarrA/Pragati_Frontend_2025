import SingleSelectFilter from "./SingleSelectFilter"

const FilterSection = () => {
  return (
    <div className="mx-auto w-fit pt-4 pb-10 flex gap-2">
      <SingleSelectFilter option1="Management" option2="Non Management"/>
      <SingleSelectFilter option1="Event" option2="Workshop"/>
      <SingleSelectFilter option1="Group" option2="Individual"/>
      <SingleSelectFilter option1="Registered" option2="Not Registered"/>
    </div>
  )
}

export default FilterSection
