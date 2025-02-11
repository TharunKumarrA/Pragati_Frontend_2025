"use client";

import { useState, useEffect } from "react";
import { Menu, User } from "lucide-react";
import Image from "next/image";
import FullPageMenu from "./menu";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  // On mount, load auth state from secureLocalStorage.
  useEffect(() => {
    const loggedIn = secureLocalStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "1" || loggedIn === 1);
    const storedProfilePic = secureLocalStorage.getItem("profilePic");
    setProfilePic(storedProfilePic);
  }, []);

  // Listen for custom "authUpdate" events.
  useEffect(() => {
    const handleAuthUpdate = (e) => {
      setIsLoggedIn(e.detail.isLoggedIn);
      setProfilePic(e.detail.profilePic);
      // Always hide the dropdown when auth changes.
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
    // Dispatch an auth update event on logout.
    window.dispatchEvent(
      new CustomEvent("authUpdate", {
        detail: { isLoggedIn: false, profilePic: null },
      })
    );
    router.push("/login");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10 bg-black bg-opacity-20 backdrop-blur-sm border-white py-1 px-10 flex items-center">
        <button className="flex-shrink-0" onClick={toggleMenu}>
          <Menu className="w-8 h-8 text-white" />
        </button>
        <Link href="/" className="flex-grow">
          <div className="flex justify-center items-center gap-3 md:mr-[-6rem] cursor-pointer">
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
            <div className="hidden md:block text-[#8B6F47] bg-white px-6 py-2 rounded-full border-[3px] border-[#8B6F47] shadow-md transition-all duration-300 ease-in-out transform hover:bg-[#8B6F47] hover:text-white hover:shadow-lg hover:scale-105 hover:border-[#C2A27E] active:scale-95">
              <span className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Login/Sign Up
              </span>
            </div>
          </Link>
        )}
      </div>
      <FullPageMenu isOpen={menuOpen} onClose={toggleMenu} />
    </div>
  );
};

export default Navbar;
