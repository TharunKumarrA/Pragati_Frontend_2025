"use client";

import BrochurePage from "../components/brochure";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

export default function Brochure() {
  return (
    <div>
      <Navbar />
      <div className="mt-16 mb-8">
        <BrochurePage />
      </div>
      <Footer />
    </div>
  )
}