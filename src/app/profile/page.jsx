"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserDetails = localStorage.getItem("userDetails");

      if (storedUserDetails) {
        const parsedDetails = JSON.parse(storedUserDetails);
        setUserDetails(parsedDetails);

        //generate QR code
        QRCode.toDataURL(parsedDetails.email)
          .then((url) => setQrCodeUrl(url))
          .catch((err) => console.error("QR Code generation failed:", err));

        //fetch registered events
        fetch("/api/events")
          .then((response) => response.json())
          .then((data) => setEvents(data))
          .catch((error) => console.error("Fetching events failed:", error))
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    }
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!userDetails)
    return <p className="text-center">No user details found. Please log in.</p>;

  return (
    <div className="flex flex-col items-center min-h-screen p-6 gap-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Profile Details</h2>
        <p><strong>Name:</strong> {userDetails.name}</p>
        <p><strong>Email:</strong> {userDetails.email}</p>
        <p><strong>Phone:</strong> {userDetails.phone}</p>
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold">QR Code for Attendance</h2>
        {qrCodeUrl ? (
          <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 mx-auto" />
        ) : (
          <p>Generating QR Code...</p>
        )}
      </div>

      <div className="text-center">
        <h2 className="text-xl font-semibold">Registered Events</h2>
        {events.length > 0 ? (
          <ul className="list-disc list-inside">
            {events.map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        ) : (
          <p>No events registered.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
