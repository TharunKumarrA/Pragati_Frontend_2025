const StatsBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 md:py-4 border-2 border-white sm:p-6 bg-[#EBE3BC]/80 shadow-md rounded-lg">
      <p className="text-[1.3rem] leading-[80%] md:leading-[70%] mt-2 md:text-3xl font-bold  text-[#352B1E]/90">
        {value}
      </p>
      <h2 className="text-xl font-normal text-[#352B1E]/90">
        {title}
      </h2>
    </div>
  );
};

export default StatsBox;
