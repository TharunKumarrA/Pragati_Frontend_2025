import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import FullPageMenu from "./menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10 bg-white/5 backdrop-blur-sm border-white py-1 px-10 flex items-center">
        <button className="flex-shrink-0" onClick={toggleMenu}>
          {menuOpen ? (
            <X className="w-8 h-8 text-white" />
          ) : (
            <Menu className="w-8 h-8 text-white" />
          )}
        </button>
        <div className="flex-grow flex justify-center items-center gap-3">
          <Image
            src="/Assets/logo.png"
            width={100}
            height={100}
            alt="logo"
            className="w-12 h-12"
          />
          <h1 className="text-[2rem] text-white">PRAGATI</h1>
        </div>
        <button className="hidden md:block text-[#8B6F47] bg-white px-6 py-2 rounded-full border-[3px] border-[#8B6F47] shadow-md transition-all duration-300 ease-in-out transform hover:bg-[#8B6F47] hover:text-white hover:shadow-lg hover:scale-105 hover:border-[#C2A27E] active:scale-95">
          <span className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 21v-2a4 4 0 10-8 0v2m8-10a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            Login / Sign Up
          </span>
        </button>
      </div>
      <FullPageMenu isOpen={menuOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Navbar;
