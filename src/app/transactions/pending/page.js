"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import { VERIFY_TRANSACTIONS_URL } from "@/app/_utils/consts";
import animationData from "@/app/_utils/lotties/transactionPending";

export default function PaymentPending() {
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
      <div className="text-[#1a1a1a] items-center justify-center mx-auto my-auto bg-white rounded-3xl px-8 py-8 z-10 sm:scale-75 md:scale-90 lg:scale-100 xl:scale-100 2xl:scale-110">
        <>
          <div className="flex items-center justify-center">
            <Lottie options={defaultOptions} height={250} width={250} />
          </div>
          <h1 className="mt-8 text-center justify-center text-4xl font-bold mb-4">
            Payment Pending
          </h1>
          <p className="text-gray-700 text-sm text-center">
            {
              "Wait For 10 minutes and head over to your Profile then click on My Transactions."
            }
          </p>
          <p className="text-gray-700 text-sm text-center">
            {
              "Click on Verify Now to the corresponding transaction to complete the registration."
            }
          </p>
        </>

        <Link href={"/"} className="flex justify-center">
          <button className="text-[#1a1a1a] px-6 py-2 rounded-full border-2 border-[#5b4711] bg-opacity-72 bg-[#fde6a8] transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 active:scale-95">
            Back to Home
          </button>
        </Link>
      </div>
    </main>
  );
}
