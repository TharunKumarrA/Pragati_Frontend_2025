"use client";

import { toast } from "@/app/otp/hooks/use-toast";
import { useEffect, useState } from "react";
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
            setTimer(120);
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
        updatedOtp[index] = value.replace(/[^0-9]/g, "");
        setOtp(updatedOtp);
    };

    return (
        <div className="bg-cover bg-center bg-fixed h-screen flex justify-center items-center"
            style={{ backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')" }}>
            <div className="bg-white bg-opacity-90 rounded-lg p-8 sm:p-10 w-[90%] sm:w-[400px] md:w-[450px] shadow-lg text-center [font-family:var(--font-poppins)]">
                <h1 className="text-[1.8rem] sm:text-[2.2rem] font-bold mb-4 [font-family:var(--font-chicavenue)]">OTP Verification</h1>
                <p className="text-[1rem] sm:text-[1.1rem] text-gray-600 mb-8">Enter the 4-digit OTP sent to your email.</p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <InputOTP maxLength={4}>
                        <InputOTPGroup className="flex justify-center mb-6">
                            {otp.map((char, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    value={char}
                                    onChange={(value) => handleOtpChange(index, value)}
                                    className="w-[3.5rem] h-[3.5rem] text-[1.5rem] text-center border border-gray-300 rounded-lg mx-[0.75rem] bg-[#f9f9f9]"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="text-[1rem] sm:text-[1.1rem] text-[#777] my-6">
                        {timer > 0 ? (
                            `Resend OTP in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`
                        ) : (
                            <a className="text-[#007bff] underline cursor-pointer text-[1rem] sm:text-[1.1rem] transition-colors duration-300 hover:text-[#0056b3]" onClick={handleResend}>
                                Resend OTP
                            </a>
                        )}
                    </p>

                    <button type="submit" className="bg-[#1f2937] text-white border-0 py-4 px-5 rounded-full cursor-pointer text-[1.2rem] sm:text-[1.3rem] transition-colors duration-300 w-full mt-6 hover:bg-[#16212a]">
                        Verify OTP
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Otp;
