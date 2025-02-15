"use client";
import { useState } from "react";
import Otp from "../component/otp";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastViewport,
} from "@/app/_toast/toast";

export default function NewPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [toasts, setToasts] = useState([]);

  // Helper function to add a new toast
  const addToast = (title, description, variant = "default") => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, title, description, variant },
    ]);
  };

  // Helper function to remove a toast when dismissed
  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Validate that the passwords match
    if (newPassword !== confirmNewPassword) {
      addToast("Error", "Passwords do not match.", "destructive");
      return;
    }

    // TODO: Add your password update API call here
    console.log("New password submitted:", newPassword);
    addToast("Success", "Password updated successfully!", "success");
  };

  return (
    <main>
      <ToastProvider>
        {/* Display the toast notifications */}
        <ToastViewport />
        <Otp />
        <div style={{ marginTop: "2rem" }}>
          <form onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input
                id="confirmNewPassword"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit">Submit New Password</button>
          </form>
        </div>
        {/* Map through and render the toasts */}
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
    </main>
  );
}
