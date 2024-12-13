import GodsGallery from "./gods_gallery";

function OlympicConclave() {
  return (
    <div className="flex flex-col items-center px-16 pt-8 pb-8 bg-[linear-gradient(180deg, #FFF 0%, #E8D096 100%)] w-full h-screen max-md:px-5">
      <div className="h-3/4 cursor-default">
        <div className="text-3xl tracking-wider text-center text-black">
          know your
        </div>
        <div className="text-5xl tracking-wider text-center text-black max-md:max-w-full max-md:text-4xl">
          GODS & GODDESS
        </div>
          <GodsGallery />
      </div>
      <div className="mt-8 text-base tracking-wide text-center text-black w-1/4 [font-family:var(--font-poppins)] cursor-default">
        Register to events and help your God win the Olympic Conclave
      </div>
      <button 
        className="mt-4 px-12 py-3 text-3xl tracking-wider text-center text-black border-2 border-black bg-[linear-gradient(90deg, #FACC15, #E8D096)] rounded-full hover:bg-opacity-80"
        tabIndex={0}
      >
        EVENTS
      </button>
    </div>
  );
}

export default OlympicConclave;
