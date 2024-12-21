import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import Navbar from "./navbar";

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
      <Navbar/>   
      <div
        ref={menuRef}
        className="flex-grow flex flex-col items-center text-center [font-family:var(--font-chicavenue)] text-[2.4rem] md:text-[2.6rem] justify-center bg-black bg-opacity-50"
      >
        {pages.map((page) => (
          <Link
            key={page.name}
            href={page.href}
            className="border-b-[1px] border-white p-1 w-full hover:bg-slate-50 hover:text-black hover:transition-all hover:duration-300"
            onClick={onClose}
          >
            {page.name}
          </Link>
        ))}
      </div>
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl font-bold"
      >
        ×
      </button>
    </div>
  );
};

export default FullPageMenu;
