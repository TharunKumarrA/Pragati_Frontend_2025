"use client";

import { useEffect, useState } from "react";
import { Button } from './button';
import { Checkbox } from './checkbox';
import { toast } from "./hooks/use-toast";
import { Input } from './input';
import styles from "./SignUp.module.css";

const Signup = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
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
  });
  const [spinnerSize, setSpinnerSize] = useState("small");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
  
    setFormData((prevData) => {
      const updatedData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      };
  
      
      if (name === "isAmrita" && checked) {
        updatedData.collegeName = "Amrita Vishwa Vidyapeetham";
  
        
        if (updatedData.userEmail.startsWith("cb.")) {
          updatedData.collegeCity = "Coimbatore";
        }
      } else if (name === "isAmrita" && !checked) {
        updatedData.collegeName = "";
        updatedData.collegeCity = "";
      }
  
      if (name === "userEmail" && updatedData.isAmrita && value.startsWith("cb.")) {
        updatedData.collegeCity = "Coimbatore";
      }
  
      return updatedData;
    });
  };

  const amritaRegex =
    /^[a-zA-Z0-9._%+-]+@(cb\.students\.amrita\.edu|cb\.amrita\.edu|av\.students\.amrita\.edu|av\.amrita\.edu)$/;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSpinnerSize("large");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (formData.isAmrita) {
      if (!amritaRegex.test(formData.userEmail)) {
        toast({
          title: "Invalid email format for Amrita student.",
          description: "Use an Amrita domain email (e.g., @cb.students.amrita.edu).",
          variant: "destructive",
        });
        setLoading(false);
        setSpinnerSize("small");
        return;
      }
    } else {
      if (!emailRegex.test(formData.userEmail)) {
        toast({
          title: "Invalid email format.",
          description: "Enter a valid email address.",
          variant: "destructive",
        });
        setLoading(false);
        setSpinnerSize("small");
        return;
      }
    }

    if (!phoneRegex.test(formData.phoneNumber)) {
      toast({
        title: "Phone number must be 10 digits.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
    }

    if (formData.userPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
    }

    if (!passwordRegex.test(formData.userPassword)) {
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

    if (!formData.termsAccepted) {
      toast({
        title: "Terms not accepted.",
        description: "You must accept the terms and conditions.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
    }

    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Form submitted successfully.",
        variant: "success",
      });
      setLoading(false);
      setSpinnerSize("small");
    }, 1500);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
    <div className={styles.signupPage}>
      <div className={`${styles.signupCard} sm:w-11/12 md:w-8/12 lg:w-1/2`}>
        <h2 className="text-center text-white mt-12 mb-5 z-20 text-2xl [font-family:var(--font-chicavenue)]">Sign Up</h2>
        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={`${styles.loadingSpinner} ${styles[spinnerSize]}`}></div>
          </div>
        )}
        <form className="flex flex-col [font-family:var(--font-poppins)]" onSubmit={handleSubmit}>
          <div className="flex justify-between gap-5 mt-8 mb-5">
            <div className="flex-1 flex flex-col gap-5">
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="userName">Name</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="userEmail">Email</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
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
                <label className="text-white mb-2 font-light" htmlFor="userPassword">Password</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="password"
                  id="userPassword"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="phoneNumber">Phone Number</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex items-center gap-2.5 mt-5 text-white">
                  <Checkbox
                    id="isAmrita"
                    name="isAmrita"
                    checked={formData.isAmrita}
                    onCheckedChange={(checked) =>
                      handleInputChange({ target: { name: "isAmrita", type: "checkbox", checked } })
                    }
                  />
                  <label htmlFor="isAmrita" className="text-[#d4af37] text-sm font-normal">
                    Are you an Amrita Student?
                  </label>
                </div>
              </div>
            </div>

            <div className="w-px bg-white mx-5"></div>

            <div className="flex-1 flex flex-col gap-5">
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="collegeName">College Name</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  placeholder="Enter your college name"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="collegeCity">College City</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="collegeCity"
                  name="collegeCity"
                  value={formData.collegeCity}
                  onChange={handleInputChange}
                  placeholder="Enter your college city"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="rollNumber">Roll Number</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your roll number"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="userDepartment">Department</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="userDepartment"
                  name="userDepartment"
                  value={formData.userDepartment}
                  onChange={handleInputChange}
                  placeholder="Enter your department"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="academicYear">Academic Year</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  placeholder="Enter your academic year"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-white mb-2 font-light" htmlFor="degree">Degree</label>
                <Input
                  className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
                  type="text"
                  id="degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  placeholder="Enter your degree"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mt-5 mb-1.5 ml-60  text-white text-sm gap-2.5">
        <Checkbox
          id="termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onCheckedChange={(checked) =>
            setFormData((prevData) => ({ ...prevData, termsAccepted: checked }))
          }
        />
        <label htmlFor="termsAccepted" className="text-[#d4af37] font-normal">
          I accept the <a href="/terms" className="text-[#ffcc00] no-underline hover:underline">Terms and Conditions</a>.
        </label>
      </div>

        <Button type="submit" className={styles.submitBtn} disabled={loading}>
          {!loading && "Sign Up"}
        </Button>

        {/* Footer */}
        <div className="relative z-20 mt-4 text-center text-white">
          <p className="mb-6">
            Already have an account? <a href="/login" className="text-[#d4af37] no-underline  hover:underline">Login</a>
          </p>
        </div>
      </form>
    </div>
  </div>

  <div className={styles.signupMobilePage}>
  <div className={styles.signupCard}>
    <h2 className="text-center text-white mt-12 mb-5 z-20 text-2xl [font-family:var(--font-chicavenue)]">Sign Up</h2>
    {loading && (
      <div className={styles.loadingOverlay}>
        <div className={`${styles.loadingSpinner} ${styles[spinnerSize]}`}></div>
      </div>
    )}
    <form className="flex flex-col [font-family:var(--font-poppins)]" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5 mt-3 mb-5">

        <div className="flex flex-col gap-5">
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="userName">Name</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleInputChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="userEmail">Email</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 placeholder:opacity-50 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
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
            <label className="text-white mb-2 font-light" htmlFor="userPassword">Password</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="password"
              id="userPassword"
              name="userPassword"
              value={formData.userPassword}
              onChange={handleInputChange}
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="phoneNumber">Phone Number</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="flex items-center gap-2.5 mt-1 mb-2 py-2 text-white">
            <Checkbox
              id="isAmrita"
              name="isAmrita"
              checked={formData.isAmrita}
              onCheckedChange={(checked) =>
                handleInputChange({ target: { name: "isAmrita", type: "checkbox", checked } })
              }
            />
            <label htmlFor="isAmrita" className="text-[#d4af37] text-sm font-normal">
              Are you an Amrita Student?
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="collegeName">College Name</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 placeholder:opacity-50 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="collegeName"
              name="collegeName"
              value={formData.collegeName}
              onChange={handleInputChange}
              placeholder="Enter your college name"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="collegeCity">College City</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white  placeholder:opacity-50 border-b-2 transition-all duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="collegeCity"
              name="collegeCity"
              value={formData.collegeCity}
              onChange={handleInputChange}
              placeholder="Enter your college city"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="rollNumber">Roll Number</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="rollNumber"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleInputChange}
              placeholder="Enter your roll number"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="userDepartment">Department</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="userDepartment"
              name="userDepartment"
              value={formData.userDepartment}
              onChange={handleInputChange}
              placeholder="Enter your department"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="academicYear">Academic Year</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="academicYear"
              name="academicYear"
              value={formData.academicYear}
              onChange={handleInputChange}
              placeholder="Enter your academic year"
              required
            />
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-white mb-2 font-light" htmlFor="degree">Degree</label>
            <Input
              className="w-full py-1.5 text-black text-base bg-white border-b-2 transition-all placeholder:opacity-50 duration-300 ease-in-out focus:border-b-2 focus:border-yellow-400 focus:scale-105 placeholder:text-black placeholder:focus:text-black hover:border-b-2 hover:border-yellow-400"
              type="text"
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleInputChange}
              placeholder="Enter your degree"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex items-center mt-0 mb-1.5 ml-15 text-white text-sm gap-2.5">
        <Checkbox
          id="termsAccepted"
          name="termsAccepted"
          checked={formData.termsAccepted}
          onCheckedChange={(checked) =>
            setFormData((prevData) => ({ ...prevData, termsAccepted: checked }))
          }
        />
        <label htmlFor="termsAccepted" className="text-[#d4af37] font-normal">
          I accept the <a href="/terms" className="text-[#ffcc00] no-underline hover:underline">Terms and Conditions</a>.
        </label>
      </div>

      <Button type="submit" className={styles.submitBtn} disabled={loading}>
        {!loading && "Sign Up"}
      </Button>

      <div className="relative z-20 mb-16 text-center text-white">
        <p className="mb-10">
          Already have an account? <a href="/login" className="text-[#d4af37] no-underline hover:underline">Login</a>
        </p>
      </div>
    </form>
  </div>
</div>

    </>
  );
};

export default Signup;