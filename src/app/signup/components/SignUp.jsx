"use client";

import { useEffect, useState } from "react";
import { toast } from "./hooks/use-toast";
import { Input } from './input';
import { Button } from './button';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Checkbox } from './checkbox';
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
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSpinnerSize("large");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(formData.userEmail)) {
      toast({
        title: "Invalid email format.",
        variant: "destructive",
      });
      setLoading(false);
      setSpinnerSize("small");
      return;
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
    <div className={styles.signupPage}>
    <div className={styles.signupCard}>
      <h2 className={styles.cardTitle}>Sign Up</h2>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={`${styles.loadingSpinner} ${styles[spinnerSize]}`}></div>
        </div>
      )}
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.row}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="userName">Name</label>
                <Input
                  className={styles.inputField}
                  id="userName"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="userEmail">Email</label>
                <Input
                  className={styles.inputField}
                  type="email"
                  id="userEmail"
                  name="userEmail"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="userPassword">Password</label>
                <Input
                  className={styles.inputField}
                  type="password"
                  id="userPassword"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="confirmPassword">Confirm Password</label>
                <Input
                  className={styles.inputField}
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phoneNumber">Phone Number</label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Are you an Amrita Student?</label>
                <RadioGroup
                  value={formData.isAmrita ? "yes" : "no"}
                  onValueChange={(value) => setFormData((prevData) => ({ ...prevData, isAmrita: value === "yes" }))}>
                  <div className={styles.radioGroup}>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="yes" id="yes" />
                      <label htmlFor="yes">Yes</label>
                    </div>
                    <div className={styles.radioItem}>
                      <RadioGroupItem value="no" id="no" />
                      <label htmlFor="no">No</label>
                    </div>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className={styles.separator}></div>


            <div className={styles.rightColumn}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="collegeName">College Name</label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  placeholder="Enter your college name"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="collegeCity">College City</label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="collegeCity"
                  name="collegeCity"
                  value={formData.collegeCity}
                  onChange={handleInputChange}
                  placeholder="Enter your college city"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="rollNumber">Roll Number</label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="rollNumber"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your roll number"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="userDepartment">Department</label>
                  <Input
                    className={styles.inputField}
                    type="text"
                    id="userDepartment"
                    name="userDepartment"
                    value={formData.userDepartment}
                    onChange={handleInputChange}
                    placeholder="Enter your department"
                    required
                  />
                </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="academicYear">Academic Year</label>
                <Input
                  className={styles.inputField}
                  type="text"
                  id="academicYear"
                  name="academicYear"
                  value={formData.academicYear}
                  onChange={handleInputChange}
                  placeholder="Enter your academic year"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="degree">Degree</label>
                <Input
                  className={styles.inputField}
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


          <div className={styles.termsGroup}>
            <Checkbox
              id="termsAccepted"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onCheckedChange={(checked) => setFormData((prevData) => ({
                ...prevData,
                termsAccepted: checked,
              }))} />
            <label htmlFor="termsAccepted" className={styles.termsLabel}>
              I accept the <a href="/terms" className={styles.link}>Terms and Conditions</a>.
            </label>
          </div>

          <Button type="submit" className={styles.submitBtn} disabled={loading}>
            {!loading && "Sign Up"}
          </Button>

          {/* Footer */}
          <div className={styles.footer}>
            <p>
              Already have an account? <a href="/login">Login</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
