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
        <div
            className="bg-cover bg-center bg-fixed h-screen flex justify-center items-center"
            style={{ backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')" }}
        >
            <div className="bg-white/90 rounded-lg p-8 px-6 shadow-lg w-[90%] max-w-[400px] text-center font-poppins">
                <h1 className="text-[1.8rem] font-bold mb-4 font-chicavenue">OTP Verification</h1>
                <p className="text-[1rem] text-[#555] mb-6">Enter the 4-digit OTP sent to your email.</p>

                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <InputOTP maxLength={4}>
                        <InputOTPGroup >
                            {otp.map((char, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    value={char}
                                    onChange={(value) => handleOtpChange(index, value)}
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>

                    <p className="text-[0.95rem] text-[#777] my-4">
                        {timer > 0 ? (
                            `Resend OTP in ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, "0")}`
                        ) : (
                            <a
                                className="text-[#007bff] underline cursor-pointer transition-colors duration-300 hover:text-[#0056b3]"
                                onClick={handleResend}
                            >
                                Resend OTP
                            </a>
                        )}
                    </p>

                    <button type="submit" className="bg-[#1f2937] text-white border-0 py-3 px-5 rounded-full cursor-pointer text-[1.1rem] w-full mt-4 transition-colors duration-300 hover:bg-[#16212a]">
                        Verify OTP
                    </button>
                </form>
            </div>
    </div>
    );
};

export default Otp;
