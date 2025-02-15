"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import {
  getUserProfile,
  getUserTransactions,
  getUserEvents,
} from "@/app/_utils/api_endpoint_handler";
import secureLocalStorage from "react-secure-storage";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [events, setEvents] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Helper function to generate QR code from user email (or any data)
  const generateQRCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Error generating QR Code", err);
    }
  };

  useEffect(() => {
    // Verify if user is logged in using secure local storage.
    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
    console.log("isLoggedIn", isLoggedIn);

    // Redirect only if isLoggedIn is neither "1" nor 1.
    if (isLoggedIn !== "1" && isLoggedIn !== 1) {
      router.push("/login");
      return;
    }

    // Get the bearer token from secure local storage.
    const registerToken = secureLocalStorage.getItem("registerToken");
    console.log("registerToken", registerToken);

    // Fetch user profile
    getUserProfile(registerToken)
      .then((data) => {
        setUserDetails(data);
        if (data?.email) {
          generateQRCode(data.email);
        }
      })
      .catch((err) => console.error("Error fetching user details", err));

    // Fetch transactions
    getUserTransactions(registerToken)
      .then((data) => setTransactions(data || []))
      .catch((err) => console.error("Error fetching transactions", err));

    // Fetch events
    getUserEvents(registerToken)
      .then((data) => setEvents(data || []))
      .catch((err) => console.error("Error fetching events", err))
      .finally(() => setLoading(false));
  }, [router]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Success":
        return "text-green-500";
      case "Failed":
        return "text-red-500";
      case "Pending":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center pt-20">
      {loading ? (
        <p className="text-lg">Loading...</p>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {/* Profile Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 flex flex-col md:flex-row items-center gap-6">
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-40 h-40 md:w-64 md:h-64"
              />
            )}
            <div className="text-gray-700 text-lg">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Profile Details
              </h1>
              {userDetails && (
                <div className="space-y-2">
                  <p>
                    <strong>Name:</strong> {userDetails.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {userDetails.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {userDetails.phone}
                  </p>
                  <p>
                    <strong>Accommodation Opted:</strong>{" "}
                    <span
                      className={
                        userDetails.accommodation
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {userDetails.accommodation ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Events Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Registered Events
            </h2>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4 flex items-center gap-4"
                >
                  <img
                    src={event.poster}
                    alt={event.title}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="text-lg">
                    <p className="font-semibold">{event.title}</p>
                    <p>{event.date}</p>
                    <p>{event.venue}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">No events registered.</p>
            )}
          </div>

          {/* Transactions Section */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Transactions
            </h2>
            {Array.isArray(transactions) && transactions.length > 0 ? (
              transactions.map((txn) => (
                <div
                  key={txn.id}
                  className="bg-gray-200 p-4 rounded-lg shadow-sm mb-4"
                >
                  <p className="text-lg font-semibold">{txn.event}</p>
                  <p>Amount: {txn.amount}</p>
                  <p className={getStatusColor(txn.status)}>
                    Status: {txn.status}
                  </p>
                  <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded">
                    Verify
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">No transactions found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
