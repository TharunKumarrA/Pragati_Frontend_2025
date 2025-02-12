const StatsBox = ({ title, value }) => {
  return (
    <div className="cursor-default flex flex-col items-center justify-center px-4 py-2 md:py-4 rounded-xl border-2 border-[#5b4711] bg-[#fde6a8] bg-opacity-72 text-center transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#f3e5c0]/50 shadow-md backdrop-filter backdrop-blur-sm">
      <p className="text-xl leading-[80%] md:leading-[70%] mt-2 md:text-2xl font-bold text-[#1a1a1a] shadow-sm">
        {value}
      </p>
      <h2 className="text-lg md:text-xl font-normal text-[#1a1a1a]/90 shadow-sm">
        {title}
      </h2>
    </div>
  );
};

export default StatsBox;
