"use client";

import styles from "./styles/login.module.css";
import React, { useState, useEffect } from "react";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "./components/tcomponents/ui/toast";
import { Input } from "./components/input";
import Link from "next/link";
import axios from "axios"; // Import axios

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToasts([]);

    if (!validateEmail(email)) {
      addToast("Error", "Please enter a valid email address.", "destructive");
      return;
    }

    if (!password) {
      addToast("Error", "Please enter your password.", "destructive");
      return;
    }

    setIsLoading(true);

    try {
      // Using axios to send the POST request
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        JSON.stringify({
            userEmail: email,
            userPassword: password,
        }),
        { headers: { "Content-Type": "application/json" } }
      );

      // Handling successful response
      addToast("Success", "Login successful!");
      console.log("Login Response:", response.data);
    } catch (error) {
      // Handling error
      if (error.response) {
        // If the error has a response (i.e., 4xx, 5xx errors)
        const errorMessage = error.response.data.MESSAGE || "Login failed. Please try again.";
        addToast("Error", errorMessage, "destructive");
        console.log("Error Response:", error.response.data);
      } else {
        // For network errors, timeouts, etc.
        console.error("Error logging in:", error);
        addToast("Error", "An unexpected error occurred. Please try again.", "destructive");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div
        className="bg-cover bg-center h-screen flex items-center justify-center relative bg-black bg-opacity-50 bg-blend-darken"
        style={{ backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')" }}
      >
        {/* Updated box with smaller size for mobile */}
        <div className={`${styles.loginBox} `}>
          <h2 className="text-[24px] text-center mt-[30px] mb-[20px] [font-family:var(--font-chicavenue)]">Sign In</h2>
          <form onSubmit={handleSubmit} className="[font-family:var(--font-poppins)]">
            <label htmlFor="email" className={styles.label}>
              Email ID
            </label>
            <Input
              type="email"
              id="email"
              className="w-full py-1.5 text-black"
              placeholder="Enter your registered Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <Input
              type="password"
              id="password"
              className="w-full py-1.5 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="text-right mt-[15px] mb-[25px]">
              <Link href="/forgot-password" className="text-[#E5C055] no-underline">
                Forgot Password?
              </Link>
            </div>
            <p className="mt-[10px] text-[14px]">
              Don’t have an account? <Link href="/register" className="text-[#E5C055] no-underline">Register</Link>
            </p>
            <button type="submit" className="bg-[#E5C055] text-black text-[16px] border-none rounded-[5px] py-[15px] px-[20px] cursor-pointer w-full mt-[20px] relative" disabled={isLoading}>
              {isLoading ? <div className={styles.loader}></div> : "Sign In"}
            </button>
          </form>
        </div>
      </div>
      <ToastViewport />
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant} onOpenChange={() => removeToast(id)}>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{description}</ToastDescription>
          <ToastClose />
        </Toast>
      ))}
    </ToastProvider>
  );
};

export default Page;
