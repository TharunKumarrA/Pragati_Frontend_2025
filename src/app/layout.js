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
      <body className={`${chicAvenue.variable} ${poppins.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
