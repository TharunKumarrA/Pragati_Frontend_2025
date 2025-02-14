import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const eventsData = [
  {
    id: 1,
    title: "Food Fest Extravaganza",
    date: "10/01/23 to 10/31/23",
    description:
      "Eos vero eos eos consectetur. Quis dolor at dolor et Lorem lorem ipsum lorem et Lorem clita elit. Pariatur clam sed takimata dolor eos clita nonumy justo. Rebum et ut diam sanctus sed dolores. Justo sed te.", 
  },
  {
    id: 2,
    title: "New Event Disclaimer",
    description:
      "Eos vero eos eos consectetur. Quis dolor at dolor et Lorem lorem ipsum lorem et Lorem clita elit takimata dolor eos clita nonumy justo. Rebum et ut diam sanctus sed occueum eos. Justo sed te.",
    
  },
];

const WhatsHappening = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, #fffef5, #fdf2d0)",
        }}
      />
      <div className="relative z-50">
        <Navbar />
      </div>
      <div className="fixed right-0 top-0 h-full w-48 pointer-events-none z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url('/Images/vine.png')`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "right top",
            backgroundSize: "contain",
            transform: "scale(1.5)", 
            transformOrigin: "right top", 
          }}
        />
      </div>
      <main className="relative z-20 md:w-[80%] mx-auto flex-grow">
        <div className="container mx-auto px-4 pt-20 pb-14">
          <h1 className="text-3xl text-center mb-12">
            What&apos;s Happening?
          </h1>

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-400" />
            <div className="space-y-12">
              {eventsData.map((event) => (
                <div key={event.id} className="relative pl-12">
                  <div className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-400" />
                  <div className="relative overflow-hidden rounded-lg shadow-md">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
                    <div className="relative bg-[#FBE9CB]/90 backdrop-blur-sm p-6">
                      <h2 className="text-xl font-semibold mb-1">
                        {event.title}
                      </h2>
                      {event.date && (
                        <p className="text-sm text-gray-600 mb-2">
                          {event.date}
                        </p>
                      )}
                      {event.imageUrl && (
                        <img
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-48 object-cover mb-4 rounded-lg"
                        />
                      )}
                      <p className="text-gray-700">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default WhatsHappening;