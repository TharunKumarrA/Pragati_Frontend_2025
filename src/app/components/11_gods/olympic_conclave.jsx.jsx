import GodsGallery from "./gods_gallery";

function OlympicConclave() {
  return (
    <div className="flex flex-col items-center px-16 pt-16 pb-8 bg-[linear-gradient(180deg, #FFF 0%, #E8D096 100%)] w-full h-screen max-md:px-5 overflow-hidden">
      <div className="text-3xl tracking-wider text-center text-black">
        know your
      </div>
      <div className="text-5xl tracking-wider text-center text-black max-md:max-w-full max-md:text-4xl">
        GODS & GODDESS
      </div>
      <GodsGallery />
      <div className="mt-8 text-base tracking-wide text-center text-black w-[353px]">
        Register to events and help your God win the Olympic Conclave
      </div>
      <button 
        className="mt-6 px-12 py-3 text-3xl tracking-wider text-center text-black border-2 border-black bg-[linear-gradient(90deg, #FACC15, #E8D096)] rounded-full hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        tabIndex={0}
      >
        EVENTS
      </button>
    </div>
  );
}

export default OlympicConclave;
