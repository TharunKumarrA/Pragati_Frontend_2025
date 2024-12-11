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

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]); // Manage toasts

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addToast = (title, description, variant = "default") => {
    const id = Math.random().toString(36).substr(2, 9); // Unique ID for each toast
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
  
    // Clear all toasts before adding new ones
    setToasts([]);
  
    // Validate email
    if (!validateEmail(email)) {
      addToast("Error", "Please enter a valid email address.", "destructive");
      return;
    }
  
    // Validate password
    if (!password) {
      addToast("Error", "Please enter your password.", "destructive");
      return;
    }
  
    setIsLoading(true);
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      addToast("Success", "Login successful!");
      console.log("Form submitted successfully!");
    } catch (error) {
      addToast("Error", "Login failed. Please try again.", "destructive");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <ToastProvider>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.hamburger}>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <h1 className={styles.title}>PRAGATI</h1>
          <div className={styles.profile}></div>
        </div>
        <div className={styles.separator}></div>
        <div className={styles.loginBox}>
          <h2 className={styles.signInTitle}>Sign In</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className={styles.label}>
              Email ID
            </label>
            <Input
              type="email"
              id="email"
              className={styles.input}
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
              className={styles.input}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className={styles.linkContainer}>
              <a href="#" className={styles.forgotPassword}>
                Forgot Password?
              </a>
            </div>
            <p className={styles.register}>
              {/*Link to route to the sign-up page*/}
              Don’t have an account? <a href="#">Register</a>
            </p>
            <button type="submit" className={styles.signInButton} disabled={isLoading}>
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
