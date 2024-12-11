{/*Components for Login and Page */}
"use client";
import styles from './styles/login.module.css';
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "./components/input";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
    }
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Login successful!");
      console.log("Form submitted successfully!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
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
  );
};

export default Page;
