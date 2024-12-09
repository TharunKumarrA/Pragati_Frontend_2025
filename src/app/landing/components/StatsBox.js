import React from 'react';

const StatsBox = ({ title, value }) => {
  return (
    <div className="flex  flex-col text-[#352B1E]/90 items-center justify-center p-6 bg-[#EBE3BC]/80 shadow-md rounded-lg">
      <p className="text-5xl heading font-semibold">{value}</p>
      <h2 className="text-2xl font-normal">{title}</h2>
    </div>
  );
};

export default StatsBox;
