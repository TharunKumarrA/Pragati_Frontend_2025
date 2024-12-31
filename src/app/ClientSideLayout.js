"use client";

import "@/app/styles/globals.css";
import localFont from "next/font/local";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

const chicAvenue = localFont({
  src: "/fonts/ChicAvenue.woff",
  variable: "--font-chicavenue",
  weight: "400 700",
});

const poppins = localFont({
  src: "/fonts/Poppins.woff",
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
          ? {}
          : {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              backgroundRepeat: "no-repeat",
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
      <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
    </body>
  );
}
