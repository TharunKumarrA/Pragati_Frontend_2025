"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import {
  verifyOtp,
  reverifyUser,
  resetPassword,
} from "@/app/_utils/api_endpoint_handler";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "@/app/_toast/toast";
import { Toaster } from "@/app/_toast/toaster";
import { toast } from "@/app/_hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../component/input-otp";

const OtpNewPassword = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const email = secureLocalStorage.getItem("registeredEmail");
    if (email) setRegisteredEmail(email);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim().match(/^\d{4}$/) && newPassword === confirmNewPassword) {
      const token = secureLocalStorage.getItem("registerToken");
      try {
        const response = await resetPassword(newPassword, otp, token);
        console.log("Reset password response:", response);

        if (response?.status === 200) {
          toast({
            title: "Password Reset",
            description: "Your password has been reset successfully.",
            variant: "success",
          });
          router.push("/login");
        } else {
          toast({
            title: "Error",
            description: response.MESSAGE || "Failed to reset password.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        toast({
          title: "Error",
          description: "An error occurred while resetting password.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Invalid OTP or Password mismatch.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <ToastProvider>
        <Toaster />
        <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-4 text-center">
          <h1 className="text-2xl font-bold">OTP & Password Reset</h1>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex justify-center items-center">
              <InputOTP
                maxLength={4}
                value={otp}
                onChange={(val) => setOtp(val.replace(/[^0-9]/g, ""))}
              >
                <InputOTPGroup>
                  {[...Array(4)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              className="w-full px-4 py-2 border rounded-lg"
              type="password"
              placeholder="Confirm Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button
              className="w-full py-3 rounded-lg bg-gray-800 text-white font-bold hover:bg-gray-700"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        {/* Render the toasts */}
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
      </ToastProvider>
    </div>
  );
};

export default OtpNewPassword;
