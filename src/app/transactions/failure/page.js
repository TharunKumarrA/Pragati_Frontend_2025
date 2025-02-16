"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import animationData from "@/app/_utils/lotties/transactionFailed";

// Dynamically import react-lottie with SSR disabled
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

export default function PaymentFailure() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="absolute inset-0 bg-black opacity-50 -z-10"></div>
      <div className="text-[#1a1a1a] items-center justify-center my-auto md:mx-auto bg-white rounded-3xl px-8 py-8 z-10 sm:scale-75 md:scale-90 lg:scale-100 xl:scale-100 2xl:scale-110">
        <div className="flex items-center justify-center px-28 py-8">
          {mounted && (
            <Lottie options={defaultOptions} height={150} width={150} />
          )}
        </div>

        <h1 className="text-center justify-center text-4xl font-bold">
          Payment Failed
        </h1>
        <p className="text-gray-700 text-sm text-center">
          Please try again later after sometime.
        </p>

        <Link href={"/profile"} className="flex justify-center mt-8">
          <button className="text-[#1a1a1a] px-6 py-2 rounded-full border-2 border-[#5b4711] bg-opacity-72 bg-[#fde6a8] transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 active:scale-95">
            Back to Site
          </button>
        </Link>
      </div>
    </main>
  );
}
