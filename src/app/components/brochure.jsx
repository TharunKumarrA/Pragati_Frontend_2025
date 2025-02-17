"use client";
import React from "react";

export default function BrochurePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-1 backdrop-blur-sm rounded-xl">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">
        Our Brochure
      </h1>
      <div className="relative rounded overflow-hidden h-[80vh]">
        <iframe
          src="https://ga4uaouwxu.ufs.sh/f/s7BvCMQMnrE64VuoLz9CwUTzRhcMErvjYsWFQb8tGnf0DLop"
          title="Brochure"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
