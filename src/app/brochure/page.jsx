
import Navbar from "../components/navbar";

const Page = () => {
  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center bg-fixed relative z-0"
      style={{
        backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')",
      }}
    >
      <Navbar />

      <h1 className="pt-[4.5rem] text-[2.5rem] text-white mx-auto text-center w-full">Brochure</h1>
      <iframe
        className="w-[90%] md:w-[80%] h-[80vh] mt-0 rounded-2xl overflow-visible"
        src="https://drive.google.com/file/d/1SANYrGrQqfs7WAOUIKKjMOZmOyVD1vSM/preview"
        allow="autoplay"
      ></iframe>
    </div>
  );
};

export default Page;
