"use client";

import axios from 'axios';
import { useEffect, useState } from "react";
import validator from 'validator';
import { Button } from '@/app/signup/components/button';
import { toast } from "@/app/_hooks/use-toast";
import { Input } from '@/app/signup/components/input';
import styles from "@/app/forgot_password/styles/forgot_password.module.css";

const ForgotPassword = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userEmail: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [spinnerSize, setSpinnerSize] = useState("small");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSpinnerSize("large");

    if (!validator.isEmail(formData.userEmail)) {
      toast({
        title: "Invalid email format.",
        description: "Enter a valid email address.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
    }

    if (!validator.isStrongPassword(formData.newPassword, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })) {
      toast({
        title: "Weak password.",
        description:
          "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/forgot-password`,
        {
          userEmail: formData.userEmail,
          newPassword: formData.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Success!",
          description: "Password reset successfully.",
          variant: "success",
        });
      } else {
        toast({
          title: "Submission failed.",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error occurred.",
        description: error.response?.data?.message || "An error occurred while submitting the form.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
      setSpinnerSize("small");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.forgotPasswordPage}>
      <div className={`${styles.forgotPasswordCard} sm:w-11/12 md:w-8/12 lg:w-1/2`}>
        <h2 className="text-center text-white mt-12 mb-5 z-20 text-2xl [font-family:var(--font-chicavenue)]">Forgot Password</h2>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={`${styles.loadingSpinner} ${styles[spinnerSize]}`}></div>
          </div>
        )}
        <form className="flex flex-col [font-family:var(--font-poppins)]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5 mt-8 mb-5">
            <div className="flex-1 flex flex-col">
              <label className="text-white mb-2 font-light" htmlFor="userEmail">Email</label>
              <Input
                className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                type="email"
                id="userEmail"
                name="userEmail"
                value={formData.userEmail}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-white mb-2 font-light" htmlFor="newPassword">New Password</label>
              <Input
                className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="Enter your new password"
                required
              />
            </div>
            <div className="flex-1 flex flex-col">
              <label className="text-white mb-2 font-light" htmlFor="confirmPassword">Confirm Password</label>
              <Input
                className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your new password"
                required
              />
            </div>
          </div>

          <Button type="submit" className={styles.submitBtn} disabled={loading}>
            {!loading && "Reset Password"}
          </Button>

          <div className="relative z-20 mt-8 text-center text-white">
            <p className="mb-10">
              Remember your password?{" "}
              <a
                href="/login"
                className="text-[#d4af37] no-underline hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;