import Head from "next/head";
import ClientSideLayout from "./ClientSideLayout";
import localFont from "next/font/local";
import "@/app/styles/globals.css";
import { ChatPopup } from "./components/chat-popup";

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

export const metadata = {
  title: "Pragati 2025",
  description: "ASB fest",
  keywords: [
    "Pragati 2025",
    "ASB fest",
    "Amrita",
    "fest",
    "celebration",
  ],
  authors: [{ name: "Pragati Team", url: "https://pragati.amrita.edu" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://pragati.amrita.edu",
  },
  icons: {
    icon: "/Assets/Logo.ico", 
    shortcut: "/Assets/Logo.ico",
    apple: "/Assets/Logo.ico",
  },
  openGraph: {
    title: "Pragati 2025",
    description: "ASB fest",
    url: "https://pragati.amrita.edu",
    images: [
      {
        url: "/Assets/logo.png",
        width: 800,
        height: 600,
        alt: "Pragati Logo",
      },
    ],
    siteName: "Pragati 2025",
    locale: "en_US",
    type: "website",
  },  
};

const backgroundImages = [
  "/Images/backgrounds/aegean_seascape.webp",
  "/Images/backgrounds/ancient_battleground.webp",
  "/Images/backgrounds/ancient_olive_grove.webp",
  "/Images/backgrounds/ancient_shrine_atop_mountain.webp",
  "/Images/backgrounds/athens_agora.webp",
  "/Images/backgrounds/atlantis_ruins.webp",
  "/Images/backgrounds/coastal_cliffs_with_ancient_ruins.webp",
  "/Images/backgrounds/meteora_monasteries.webp",
  "/Images/backgrounds/minoan_palace_ruins.webp",
  "/Images/backgrounds/mount_olympus_view.webp",
  "/Images/backgrounds/mycenaean_ruins.webp",
  "/Images/backgrounds/santorini_island.webp",
  "/Images/backgrounds/spartan_military_training_grounds.webp",
  "/Images/backgrounds/temple_of_zeus_in_olympia.webp",
  "/Images/backgrounds/the_oracle_of_delphi.webp",
  "/Images/backgrounds/the_parthenon_in_athens.webp",
  "/Images/backgrounds/theatres_of_epidaurus.webp",
];

function getRandomBackgroundImage() {
  const randomIndex = Math.floor(Math.random() * backgroundImages.length);
  return backgroundImages[randomIndex];
}

export default function RootLayout({ children }) {
  const randomBackground = getRandomBackgroundImage();

  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link
          rel="preload"
          as="script"
          href="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
        />
        <script
          src="https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js"
          async
        ></script>
      </Head>
      <ClientSideLayout backgroundImage={randomBackground}>
        {children}
        <ChatPopup />
      </ClientSideLayout>
    </html>
  );
}
