"use client";

import { toast } from "@/app/otp/hooks/use-toast";
import { useEffect, useState } from "react";
import styles from "./Otp.module.css";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp.jsx";

const Otp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(120);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleResend = () => {
        if (timer === 0) {
            toast({
                title: "OTP Resent",
                description: "A new OTP has been sent to your email.",
                variant: "success",
            });
            setTimer(120); // Reset timer
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.match(/^\d{4}$/)) {
            toast({
                title: "OTP Verified",
                description: "You have successfully verified your OTP.",
                variant: "success",
            });
        } else {
            toast({
                title: "Invalid OTP",
                description: "Please enter a valid 4-digit OTP.",
                variant: "destructive",
            });
        }
    };

    const handleOtpChange = (index, value) => {
        const updatedOtp = [...otp];
        updatedOtp[index] = value.replace(/[^0-9]/g, ""); // Allow only digits
        setOtp(updatedOtp);
    };

    return (
        <div className={styles.background}>
            <div className={styles.otpCard}>
                <h1 className={styles.title}>OTP Verification</h1>
                <p className={styles.subtitle}>Enter the 4-digit OTP sent to your email.</p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <InputOTP maxLength={4}>
                        <InputOTPGroup className={styles.otpInputGroup}>
                            {otp.map((char, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    value={char}
                                    onChange={(value) => handleOtpChange(index, value)}
                                    className={styles.otpInput}
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <p className={styles.timer}>
                        {timer > 0 ? (
                            `Resend OTP in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`
                        ) : (
                            <a className={styles.resendText} onClick={handleResend}>
                                Resend OTP
                            </a>
                        )}
                    </p>

                    <button type="submit" className={styles.submitButton}>
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Otp;