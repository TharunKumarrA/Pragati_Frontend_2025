"use client";

import { toast } from "@/app/_hooks/use-toast.js";
import { useEffect, useState } from "react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./input-otp.jsx";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import { verifyOtp, reverifyUser } from "@/app/_utils/api_endpoint_handler.js";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const email = secureLocalStorage.getItem("registeredEmail");
    if (email) {
      setRegisteredEmail(email);
    }
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleResend = async () => {
    if (timer === 0) {
      await reverifyUser(registeredEmail); // Re-trigger OTP resend

      toast({
        title: "OTP Resent",
        description: "A new OTP has been sent to your email.",
        variant: "success",
        className: "bg-white text-black border border-gray-300 shadow-md",
      });

      setTimer(120);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting OTP:", otp);

    const sanitizedOTP = otp.trim();
    if (sanitizedOTP.match(/^\d{4}$/)) {
      const token = secureLocalStorage.getItem("registerToken");
      const result = await verifyOtp(sanitizedOTP, token);

      if (result && result.success) {
        toast({
          title: "OTP Verified",
          description: "You have successfully verified your OTP.",
          variant: "success",
          className: "bg-white text-black border border-gray-300 shadow-md",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setOtp("");
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid 4-digit OTP.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="bg-cover bg-center bg-fixed h-screen flex justify-center items-center"
      style={{
        backgroundImage: "url('/Images/backgrounds/mount_olympus_view.webp')",
      }}
    >
      <div className="bg-white/90 rounded-lg p-8 px-6 shadow-lg w-[90%] max-w-[400px] text-center font-poppins">
        <h1 className="text-[1.8rem] font-bold mb-4 font-chicavenue">
          OTP Verification
        </h1>
        {registeredEmail && (
          <p className="text-[1rem] text-[#555] mb-4">
            An OTP has been sent to <strong>{registeredEmail}</strong>.
          </p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <InputOTP
            maxLength={4}
            value={otp}
            onChange={(value) => setOtp(value.replace(/[^0-9]/g, ""))}
          >
            <InputOTPGroup>
              {[...Array(4)].map((_, index) => (
                <InputOTPSlot key={index} index={index} />
              ))}
            </InputOTPGroup>
          </InputOTP>
          <p className="text-[0.95rem] text-[#777] my-4">
            {timer > 0 ? (
              `Resend OTP in ${Math.floor(timer / 60)}:${String(
                timer % 60
              ).padStart(2, "0")}`
            ) : (
              <a
                className="text-[#007bff] underline cursor-pointer hover:text-[#0056b3]"
                onClick={handleResend}
              >
                Resend OTP
              </a>
            )}
          </p>
          <button
            type="submit"
            className="bg-[#1f2937] text-white py-3 px-5 rounded-full text-[1.1rem] w-full mt-4 hover:bg-[#16212a]"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Otp;
