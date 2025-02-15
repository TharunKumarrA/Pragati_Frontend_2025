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
} from "@/app/_toast/toast";
import { Input } from "./components/input";
import Link from "next/link";
import { login } from "@/app/_utils/api_endpoint_handler";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/navigation";
import {EyeInvisibleOutlined , EyeOutlined} from "@ant-design/icons";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [visible,setVisible] = useState(false);

  // Dynamically require validator
  const validator = require("validator");

  const router = useRouter();

  // Clear secure storage on mount
  useEffect(() => {
    secureLocalStorage.clear();
  }, []);

  const validateEmail = (email) => validator.isEmail(email);

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
      const response = await login(email, password);

      // Check for a successful login.
      if (response && response.MESSAGE === "Login successful") {
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
        secureLocalStorage.setItem("isLoggedIn", 1);
        secureLocalStorage.setItem(
          "profilePic",
          response.DATA.USER.profilePic || null
        );

        // Dispatch a single custom auth update event.
        window.dispatchEvent(
          new CustomEvent("authUpdate", {
            detail: {
              isLoggedIn: true,
              profilePic: response.DATA.USER.profilePic || null,
            },
          })
        );

        addToast("Success", "Login successful!");
        setTimeout(() => {
          router.push("/events");
        }, 1500);
      } else {
        throw new Error(response?.MESSAGE || "Login failed");
      }
    } catch (error) {
      console.log("Error logging in:", error);
      addToast(
        "Error",
        error.message || "An unexpected error occurred. Please try again.",
        "destructive"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToastProvider>
      <div className="bg-cover bg-center h-screen flex items-center justify-center relative bg-black bg-opacity-50 bg-blend-darken">
        <div className={`${styles.loginBox}`}>
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
            <div className="relative w-full">
            <Input
              type={visible ? "text" : "password"}
              id="password"
              className="w-full py-1.5 pr-10 text-black"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-2 flex items-center cursor-pointer text-gray-600"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </div>
          </div>
            <div className="text-right mt-[15px] mb-[25px]">
              <Link
                href="/forgot-password"
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
              className="w-full bg-[#D4AF37] text-white py-3 px-6 rounded-md hover:bg-[#B4941F] transition-colors mt-4"
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