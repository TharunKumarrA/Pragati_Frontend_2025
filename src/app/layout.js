import Head from "next/head";
import localFont from "next/font/local";
import "./styles/globals.css";

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </Head>
      <body
        className={`${chicAvenue.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
