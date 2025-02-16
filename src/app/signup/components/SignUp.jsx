"use client";

import React, { useState } from "react";
import {
  ToastProvider,
  Toast,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/app/_toast/toast";
import { Input } from "./input";
import Link from "next/link";
import Image from "next/image";
import validator from "validator";
import { signup } from "@/app/_utils/api_endpoint_handler";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [toasts, setToasts] = useState([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
    phoneNumber: "",
    isAmrita: false,
    collegeName: "",
    collegeCity: "",
    rollNumber: "",
    userDepartment: "",
    academicYear: "",
    degree: "",
    termsAccepted: false,
    needAccommodation: { day1: false, day2: false, day3: false },
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => {
      if (name === "needAccommodation") {
        return {
          ...prevData,
          needAccommodation: {
            ...prevData.needAccommodation,
            [value]: checked,
          },
        };
      }
      return {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const validateForm = () => {
    if (!formData.userName) {
      addToast("Error", "Name is required.", "destructive");
      return false;
    }
    if (!validator.isEmail(formData.userEmail)) {
      addToast("Error", "Please enter a valid email address.", "destructive");
      return false;
    }
    if (!validator.isMobilePhone(formData.phoneNumber, "en-IN")) {
      addToast("Error", "Please enter a valid phone number.", "destructive");
      return false;
    }
    if (formData.userPassword !== formData.confirmPassword) {
      addToast("Error", "Passwords do not match.", "destructive");
      return false;
    }
    if (
      !validator.isStrongPassword(formData.userPassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      addToast(
        "Error",
        "Password must be 8+ characters with uppercase, lowercase, numbers, and symbols.",
        "destructive"
      );
      return false;
    }
    if (!formData.termsAccepted) {
      addToast(
        "Error",
        "You must accept the terms and conditions.",
        "destructive"
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToasts([]);

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      console.log(formData);
      const response = await signup(
        formData.userName,
        formData.userEmail,
        formData.userPassword,
        formData.confirmPassword,
        formData.phoneNumber,
        formData.isAmrita,
        formData.collegeName,
        formData.collegeCity,
        formData.rollNumber,
        formData.userDepartment,
        formData.academicYear,
        formData.degree,
        formData.needAccommodation
      );

      if (response && response.DATA) {
        secureLocalStorage.setItem("registerToken", response.DATA);
        secureLocalStorage.setItem("registeredEmail", formData.userEmail);

        addToast("Success", "OTP Sent to email");
        setTimeout(() => {
          router.push("/otp");
        }, 1500);
      }
    } catch (error) {
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
      <div
        className="bg-cover bg-center min-h-screen flex items-center justify-center relative bg-[url('/Assets/background.jpg')] bg-black bg-opacity-50 bg-blend-darken py-8"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        <div className="w-full max-w-3xl mx-4 relative">
          <div className="bg-[#352B1F] text-white rounded-lg p-8 relative">
            <div className="absolute -top-6 sm:-top-16 left-0 w-full">
              <Image
                src="/Assets/border_style_1.jpg"
                alt=""
                className="w-full object-cover"
                width={1200}
                height={200}
              />
            </div>

            <h2 className="text-[24px] text-center mb-6 [font-family:var(--font-chicavenue)]">
              Sign Up
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-y-4 [font-family:var(--font-poppins)] relative md:grid-cols-2 gap-6"
            >
              {/* Single Column for Mobile */}
              <div>
                <label className="block text-sm mb-2">Name</label>
                <Input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Email</label>
                <Input
                  type="email"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Phone Number</label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Roll Number</label>
                <Input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your roll number"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Password</label>
                <Input
                  type="password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Confirm Password</label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Confirm your password"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">College Name</label>
                <Input
                  type="text"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your college name"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">College City</label>
                <Input
                  type="text"
                  name="collegeCity"
                  value={formData.collegeCity}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your college city"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Department</label>
                <Input
                  type="text"
                  name="userDepartment"
                  value={formData.userDepartment}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your department"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Degree</label>
                <Input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your degree"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Academic Year</label>
                <Input
                  type="text"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  className="w-full py-2 px-3 rounded-md text-black bg-white"
                  placeholder="Enter your academic year"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Need Accommodation:
                </label>
                <div className="flex gap-6">
                  {Object.keys(formData.needAccommodation)
                    .filter((day, index) => index < 2) // Only show first 2 days
                    .map((day) => (
                      <label key={day} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="needAccommodation"
                          value={day}
                          checked={formData.needAccommodation[day]}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="text-sm">Day {day.slice(-1)}</span>
                      </label>
                    ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isAmrita"
                    checked={formData.isAmrita}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Are you an Amrita student?</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="termsAccepted"
                    checked={formData.termsAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">
                    I agree to the terms and conditions
                  </span>
                </label>
              </div>

              {/* Sign Up Button - Full Width */}
              <div className="mt-6 md:col-span-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#D4AF37] text-white py-3 px-6 rounded-md hover:bg-[#B4941F] transition-colors duration-200 disabled:opacity-50"
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </button>
              </div>

              <div className="md:col-span-2 text-center mt-2">
                <p className="text-sm text-gray-300">
                  Already registered?{" "}
                  <Link
                    href="/login"
                    className="text-[#D4AF37] hover:text-[#B4941F] transition-colors duration-200"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          <div className="absolute -bottom-6 sm:-bottom-12 left-0 w-full">
            <Image
              src="/Assets/border_style_2.jpg"
              alt=""
              className="w-full object-cover"
              width={1200}
              height={200}
            />
          </div>
        </div>

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
      </div>
    </ToastProvider>
  );
};

export default Signup;
