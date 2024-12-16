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

        <button className="hidden md:block text-[1.2rem] text-black bg-white px-4 py-1 rounded-lg">
          Login / Sign Up
        </button>
      </div>
      <FullPageMenu isOpen={menuOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Navbar;
