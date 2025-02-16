"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // FIX: Import router
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "@/app/_toast/toast";
import { Toaster } from "@/app/_toast/toaster";
import { forgotPassword } from "../_utils/api_endpoint_handler";
import secureLocalStorage from "react-secure-storage";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [toasts, setToasts] = useState([]);
  const router = useRouter(); // FIX: Initialize router

  const addToast = (title, description, variant = "default") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant },
    ]);
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setToasts([]);
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    console.log("Submitted email:", email);

    try {
      const response = await forgotPassword(email);
      console.log("Reverify response:", response);

      if (response?.status === 200) {
        secureLocalStorage.setItem("registerToken", response.DATA.TOKEN);
        addToast(
          "OTP Resent",
          "A new OTP has been sent to your email.",
          "success"
        );
        router.push("/resetPassword/newPassword"); // FIX: router.push used correctly
      } else {
        addToast(
          "Error",
          response.MESSAGE || "Failed to resend OTP.",
          "destructive"
        );
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      addToast(
        "Error",
        "An error occurred while resending OTP.",
        "destructive"
      );
    }
  };

  return (
    <main
      className="bg-cover bg-center bg-fixed h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')",
      }}
    >
      <ToastProvider>
        <Toaster />
        <div className="bg-white/90 rounded-lg p-8 px-6 shadow-lg w-[90%] max-w-[400px] text-center font-poppins">
          <h1 className="text-[1.8rem] font-bold mb-4 font-chicavenue">
            Enter Your Email
          </h1>
          <form onSubmit={handleEmailSubmit} className="flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-[1rem] text-[#555] mb-2"
              >
                Email to send reset OTP
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#1f2937] text-white py-3 rounded-full text-[1.1rem] hover:bg-[#16212a]"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Render the toasts */}
        <ToastViewport />
        {toasts.map(({ id, title, description, variant }) => (
          <Toast
            key={id}
            variant={variant}
            onOpenChange={() => removeToast(id)}
          >
            <ToastTitle>{title}</ToastTitle>
            <ToastDescription>{description}</ToastDescription>
            <ToastClose />
          </Toast>
        ))}
      </ToastProvider>
    </main>
  );
}
