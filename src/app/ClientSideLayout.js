"use client";

import "@/app/styles/globals.css";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Navbar from "./components/navbar";

const chicAvenue = localFont({
  src: "/_fonts/ChicAvenue.woff",
  variable: "--font-chicavenue",
  weight: "400 700",
});

const poppins = localFont({
  src: "/_fonts/Poppins.woff",
  variable: "--font-poppins",
  weight: "400 700",
});

export default function ClientSideLayout({ children, backgroundImage }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <body
      className={`${chicAvenue.variable} ${poppins.variable} antialiased`}
      style={{
        ...(isHomePage
          ? {
              background: `linear-gradient(to bottom, #fffef5, #fdf2d0)`,
              minHeight: "100vh",
            }
          : {
              background: `
                url(${backgroundImage}) center/cover no-repeat fixed,
                linear-gradient(to bottom, #fffef5, #fdf2d0)`,
              minHeight: "100vh",
            }),
      }}
    >
      {backgroundImage && !isImageLoaded && (
        <Image
          src={backgroundImage}
          alt="Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          onLoad={onImageLoad}
          style={{ display: "none" }}
        />
      )}
      <div style={{ position: "relative", zIndex: 2 }}>
        <Navbar/>
        {children}
        </div>
    </body>
  );
}
