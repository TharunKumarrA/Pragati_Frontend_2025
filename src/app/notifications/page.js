"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { getNotifications } from "../_utils/api_endpoint_handler";

// React Component: WhatsHappening
const WhatsHappening = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch notifications from API on component mount
  useEffect(() => {
    getNotifications()
      .then((response) => {
        if (response && response.DATA) {
          setNotifications(response.DATA);
        } else {
          setError("Failed to fetch notifications");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "An error occurred");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Background wrapper */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(to bottom, #fffef5, #fdf2d0)" }}
      />

      {/* NAVBAR - Highest z-index */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* DECORATIVE VINE - Behind content but above background */}
      <div className="fixed right-0 top-0 h-full w-48 pointer-events-none z-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url('/Images/vine.png')`,
            backgroundRepeat: "repeat-y",
            backgroundPosition: "right top",
            backgroundSize: "contain",
            transform: "scale(1.5)",
            transformOrigin: "right top",
          }}
        />
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-20 md:w-[80%] mx-auto flex-grow">
        <div className="container mx-auto px-4 pt-20 pb-14">
          <h1 className="text-3xl text-center mb-12">What&apos;s Happening?</h1>

          <div className="relative">
            {/* TIMELINE LINE */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-orange-400" />
            <div className="space-y-12">
              {loading ? (
                <p>Loading notifications...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : notifications.length > 0 ? (
                notifications
                  .slice()
                  .reverse()
                  .map((notification) => (
                    <div
                      key={notification.notificationID}
                      className="relative pl-12"
                    >
                      {/* TIMELINE DOT */}
                      <div className="absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full bg-orange-400" />

                      {/* Notification Card */}
                      <div className="relative overflow-hidden rounded-lg shadow-md">
                        {/* Glossy overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

                        {/* Card content */}
                        <div className="relative bg-[#FBE9CB]/90 backdrop-blur-sm p-6">
                          <h2 className="text-xl font-semibold mb-1">
                            {notification.title}
                          </h2>
                          {notification.startDate && (
                            <p className="text-sm text-gray-600 mb-2">
                              {new Date(
                                notification.startDate
                              ).toLocaleDateString()}
                              {notification.endDate &&
                              new Date(notification.endDate).getTime() !==
                                new Date(notification.startDate).getTime()
                                ? ` to ${new Date(
                                    notification.endDate
                                  ).toLocaleDateString()}`
                                : ""}
                            </p>
                          )}
                          <p className="text-gray-700">
                            {notification.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No notifications available.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default WhatsHappening;
