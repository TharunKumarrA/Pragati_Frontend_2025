import { useState } from "react";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import FullPageMenu from "./menu";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);  
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10 bg-white/5 backdrop-blur-sm border-white py-1 px-10 flex items-center">
        <button className="flex-shrink-0" onClick={toggleMenu}>
            <Menu className="w-8 h-8 text-white" /> 
        </button>
        <div className="flex-grow flex justify-center items-center gap-3 md:mr-[-6rem]">
          <Image
            src="/Assets/logo.png"
            width={100}
            height={100}
            alt="logo"
            className="w-12 h-12"
          />
          <h1 className="text-[2rem] text-white">PRAGATI</h1>
        </div>
        <Link href="/login">
        <div className="hidden md:block text-[#8B6F47] bg-white px-6 py-2 rounded-full border-[3px] border-[#8B6F47] shadow-md transition-all duration-300 ease-in-out transform hover:bg-[#8B6F47] hover:text-white hover:shadow-lg hover:scale-105 hover:border-[#C2A27E] active:scale-95">
          <span className="flex items-center gap-2">
          <User className="w-5 h-5" /> 
            Login/Sign Up
          </span>
        </div>
        </Link>
      </div>
      <FullPageMenu isOpen={menuOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Navbar;
