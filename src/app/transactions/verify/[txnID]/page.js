"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import dynamic from "next/dynamic";
import animationData from "@/app/_utils/lotties/transactionVerify";
import { verifyTransaction } from "@/app/_utils/api"; // Adjust the path as needed

// Dynamically import react-lottie with SSR disabled
const Lottie = dynamic(() => import("react-lottie"), { ssr: false });

export default function PaymentVerify() {
  const { txnId } = useParams();
  const router = useRouter();

  useEffect(() => {
    verifyTransaction(txnId)
      .then((res) => {
        if (res.status === 200) {
          setTimeout(() => {
            router.push("/transactions/success");
          }, 4000);
        } else if (res.status === 202) {
          setTimeout(() => {
            router.push("/transactions/failure");
          }, 4000);
        } else {
          setTimeout(() => {
            router.push("/transactions/pending");
          }, 4000);
        }
      })
      .catch((err) => {
        console.error(err);
        router.push("/transactions/pending");
      });
  }, [router, txnId]);

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
      <div className="text-[#1a1a1a] items-center justify-center bg-white rounded-3xl px-8 py-8 z-10 mx-auto my-auto">
        <Lottie options={defaultOptions} height={250} width={250} />
        <h1 className="mt-8 text-center justify-center text-2xl font-bold">
          Hold On while we verify your payment.
        </h1>
        <p className="text-gray-700 text-sm text-center">
          Your transaction id is <span className="font-bold">{txnId}</span>
        </p>
        <p className="text-gray-700 text-sm text-center">
          Please do not close this page or go back.
        </p>
      </div>
    </main>
  );
}
