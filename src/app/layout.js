import "@/app/styles/globals.css";
import localFont from "next/font/local";
import Head from "next/head";

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

export const metadata = {
  title: "Pragati 2025",
  description: "ASB fest",
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
  const randomBackgroundImage = getRandomBackgroundImage();

  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="preload" as="image" href={randomBackgroundImage} />
      </Head>
      <body
        className={`${chicAvenue.variable} ${poppins.variable} antialiased`}
        style={{
          backgroundImage: `url(${randomBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
            if ("loading" in HTMLImageElement.prototype) {
              const img = new Image();
              img.src = "${randomBackgroundImage}";
            } else {
              const script = document.createElement("script");
              script.src = "https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js";
              document.body.appendChild(script);
            }
          `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
