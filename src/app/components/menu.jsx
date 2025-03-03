"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { User, X } from "lucide-react";
import Image from "next/image";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";

const FullPageMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const router = useRouter();

  // Auth state and profile picture
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Animate links when menu opens
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

  // On mount, load auth state from secureLocalStorage
  useEffect(() => {
    const loggedIn = secureLocalStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "1" || loggedIn === 1);
    const storedProfilePic = secureLocalStorage.getItem("profilePic");
    setProfilePic(storedProfilePic);
  }, []);

  // Listen for custom "authUpdate" events
  useEffect(() => {
    const handleAuthUpdate = (e) => {
      setIsLoggedIn(e.detail.isLoggedIn);
      setProfilePic(e.detail.profilePic);
      setShowProfileMenu(false);
    };

    window.addEventListener("authUpdate", handleAuthUpdate);
    return () => {
      window.removeEventListener("authUpdate", handleAuthUpdate);
    };
  }, []);

  const toggleProfileMenu = () => {
    setShowProfileMenu((prev) => !prev);
  };

  const handleLogout = () => {
    secureLocalStorage.clear();
    setIsLoggedIn(false);
    // Dispatch auth update on logout
    window.dispatchEvent(
      new CustomEvent("authUpdate", {
        detail: { isLoggedIn: false, profilePic: null },
      })
    );
    router.push("/login");
  };

  // Define menu pages, conditionally adding Login/Sign Up if not logged in
  const pages = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Events", href: "/events" },
    { name: "Notifications", href: "/notifications" },
    { name: "Schedule", href: "/schedule" },
    { name: "Brochure", href: "/brochure" },
    {name: "Team", href: "/team"},
  ];

  if (!isLoggedIn) {
    pages.push({ name: "Login/Sign Up", href: "/login" });
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col text-white"
      style={{
        backgroundImage: "url(/Images/backgrounds/meteora_monasteries.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Header */}
      <div className="fixed top-0 left-0 w-full z-10 bg-white/5 backdrop-blur-sm border-white py-1 px-10 flex items-center justify-between">
        <button className="flex-shrink-0" onClick={onClose}>
          <X className="w-8 h-8 text-white" />
        </button>

        <Link href="/">
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
        </Link>

        {/* Conditionally show profile picture or login/signup button */}
        {isLoggedIn ? (
          <div className="relative">
            <button onClick={toggleProfileMenu}>
              <Image
                src={profilePic ? profilePic : "/Assets/default-profile.png"}
                alt="Profile Picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg">
                <Link href="/profile">
                  <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                    Profile
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-black hover:bg-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/login">
            <div className="hidden md:block text-[#1a1a1a] px-6 py-2 rounded-full border-2 border-[#5b4711] bg-opacity-72 bg-[#fde6a8] transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 active:scale-95">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Login/Sign Up
              </span>
            </div>
          </Link>
        )}
      </div>

      {/* Main Menu Links */}
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
