import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { X } from "lucide-react"; 
import Image from "next/image";

const FullPageMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      const links = menuRef.current.querySelectorAll("a");
      gsap.fromTo(
        links,
        { y: "10%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Events", href: "/events" },
    { name: "Schedule", href: "/schedule" },
    { name: "Brochure", href: "/brochure" },
    { name: "Login/Sign Up", href: "/login" },
  ];

  return (
    <div
      className="fixed inset-0 z-20 flex flex-col text-white"
      style={{
        backgroundImage: 'url(/Images/backgrounds/meteora_monasteries.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed top-0 left-0 w-full z-10 bg-white/5 backdrop-blur-sm border-white py-1 px-10 flex items-center justify-between">
        <button className="flex-shrink-0" onClick={onClose}>
          <X className="w-8 h-8 text-white" />
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

      <div
        ref={menuRef}
        className="flex-grow flex flex-col items-center text-center [font-family:var(--font-chicavenue)] text-[2.4rem] md:text-[2.6rem] justify-center bg-black bg-opacity-50"
      >
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="border-b-[1px] border-white p-2 w-full hover:bg-slate-50 hover:text-black hover:transition-all hover:duration-300"
            onClick={onClose} 
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FullPageMenu;
