"use client";

import React, { useState, useEffect } from "react";
import md5 from "blueimp-md5"; // Client-friendly MD5 library
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./styles/login.module.css";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/app/_toast/toast";
import { login, reverifyUser } from "@/app/_utils/api_endpoint_handler";
import { Input } from "./components/input";
import validator from "validator";

/**
 * Returns a Gravatar URL for the given email.
 * If the user does not have a Gravatar, the `identicon` is used.
 */
const getGravatarUrl = (email, size = 200) => {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = md5(trimmedEmail);
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon&r=pg`;
};

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    secureLocalStorage.clear();
  }, []);

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

    if (!validator.isEmail(email)) {
      addToast("Error", "Please enter a valid email address.", "destructive");
      return;
    }

    if (!password) {
      addToast("Error", "Please enter your password.", "destructive");
      return;
    }

    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (response && response.MESSAGE === "Login successful") {
        // Use the user's custom profilePic if it exists;
        // otherwise generate one using Gravatar.
        const profilePic =
          response.DATA.USER.profilePic ||
          getGravatarUrl(response.DATA.USER.userEmail);

        secureLocalStorage.setItem("registerToken", response.DATA.TOKEN);
        secureLocalStorage.setItem(
          "studentFullName",
          response.DATA.USER.userName
        );
        secureLocalStorage.setItem(
          "registerEmail",
          response.DATA.USER.userEmail
        );
        secureLocalStorage.setItem("rollNumber", response.DATA.USER.rollNumber);
        secureLocalStorage.setItem("isLoggedIn", "1");
        secureLocalStorage.setItem("profilePic", profilePic);

        window.dispatchEvent(
          new CustomEvent("authUpdate", {
            detail: {
              isLoggedIn: true,
              profilePic,
            },
          })
        );

        addToast("Success", "Login successful!");
        setTimeout(() => {
          router.push("/events");
        }, 1500);
      }
    } catch (error) {
      console.error("Error logging in:", error);

      if (error.status === 403) {
        try {
          const reverifyResponse = await reverifyUser(email);
          if (reverifyResponse.status === 200) {
            secureLocalStorage.setItem(
              "registerToken",
              reverifyResponse.DATA.TOKEN
            );
            secureLocalStorage.setItem("registerEmail", email);

            addToast("Success", "OTP sent successfully!");
            router.push("/otp");
          } else {
            addToast(
              "Error",
              reverifyResponse.MESSAGE || "Failed to send OTP.",
              "destructive"
            );
          }
        } catch (reverifyError) {
          console.error("Error sending reverify request:", reverifyError);
          addToast(
            "Error",
            "An error occurred while resending OTP.",
            "destructive"
          );
        }
      } else {
        addToast(
          "Error",
          error.message || "An unexpected error occurred. Please try again.",
          "destructive"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div className="bg-cover bg-center h-screen flex items-center justify-center relative bg-black bg-opacity-50 bg-blend-darken">
        <div className={styles.loginBox}>
          <h2 className="text-[24px] text-center mt-[30px] mb-[20px] [font-family:var(--font-chicavenue)]">
            Sign In
          </h2>
          <form
            onSubmit={handleSubmit}
            className="[font-family:var(--font-poppins)]"
          >
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
              <Link
                href="/resetPassword"
                className="text-[#E5C055] no-underline"
              >
                Forgot Password?
              </Link>
            </div>
            <p className="mt-[10px] text-[14px]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#E5C055] no-underline">
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#E5C055] text-black text-[16px] border-none rounded-[5px] py-[15px] px-[20px] cursor-pointer w-full mt-[20px] relative"
              disabled={isLoading}
            >
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
