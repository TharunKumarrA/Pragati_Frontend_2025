"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import { getUserProfile } from "@/app/_utils/api_endpoint_handler";
import secureLocalStorage from "react-secure-storage";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Generate a QR code from the provided data (using user's email here)
  const generateQRCode = async (data) => {
    try {
      const url = await QRCode.toDataURL(data);
      setQrCodeUrl(url);
    } catch (err) {
      console.error("Error generating QR Code", err);
    }
  };

  useEffect(() => {
    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "1" && isLoggedIn !== 1) {
      router.push("/login");
      return;
    }

    const registerToken = secureLocalStorage.getItem("registerToken");

    // Call getUserProfile; the API response has { DATA: { ... }, MESSAGE: "..." }
    getUserProfile(registerToken)
      .then((response) => {
        if (response && response.DATA) {
          const profileData = response.DATA;
          setUserDetails(profileData);
          if (profileData.userEmail) {
            generateQRCode(profileData.userEmail);
          }
          // Update registrations and transactions from the response
          setRegistrations(
            Array.isArray(profileData.registrations)
              ? profileData.registrations
              : []
          );
          setTransactions(
            Array.isArray(profileData.transactions)
              ? profileData.transactions
              : []
          );
        } else {
          console.error("Invalid profile data response:", response);
        }
      })
      .catch((err) => console.error("Error fetching user details:", err))
      .finally(() => setLoading(false));
  }, [router]);

  // A helper to determine the status color for transactions
  const getStatusColor = (status) => {
    switch (status) {
      case "2":
      case "Success":
        return "text-green-500";
      case "0":
      case "Failed":
        return "text-red-500";
      case "1":
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
        <div className="w-full max-w-6xl space-y-6">
          {/* Profile Section */}
          <div
            className="p-6 rounded-lg shadow-md border border-gray-300 flex flex-col md:flex-row items-center gap-6"
            style={{
              background: "linear-gradient(to bottom, #fffef5, #fdf2d0)",
            }}
          >
            {qrCodeUrl && (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-40 h-40 md:w-64 md:h-64"
              />
            )}
            <div className="text-gray-700 text-lg w-full">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                Profile Details
              </h1>
              {userDetails && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold">Name: </span>
                    {userDetails.userName}
                  </div>
                  <div>
                    <span className="font-semibold">Email: </span>
                    {userDetails.userEmail}
                  </div>
                  <div>
                    <span className="font-semibold">Phone: </span>
                    {userDetails.phoneNumber}
                  </div>
                  <div>
                    <span className="font-semibold">Department: </span>
                    {userDetails.userDepartment}
                  </div>
                  <div>
                    <span className="font-semibold">College: </span>
                    {userDetails.collegeName}, {userDetails.collegeCity}
                  </div>
                  <div>
                    <span className="font-semibold">Degree: </span>
                    {userDetails.degree}
                  </div>
                  <div>
                    <span className="font-semibold">Academic Year: </span>
                    {userDetails.academicYear}
                  </div>
                  <div>
                    <span className="font-semibold">Accommodation Day 1: </span>
                    {userDetails.needAccommodationDay1 ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-semibold">Accommodation Day 2: </span>
                    {userDetails.needAccommodationDay2 ? "Yes" : "No"}
                  </div>
                  <div>
                    <span className="font-semibold">Accommodation Day 3: </span>
                    {userDetails.needAccommodationDay3 ? "Yes" : "No"}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Registered Events Section */}
          <div
            className="p-6 rounded-lg shadow-md border border-gray-300"
            style={{
              background: "linear-gradient(to bottom, #fffef5, #fdf2d0)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Registered Events
            </h2>
            {registrations.length > 0 ? (
              registrations.map((reg) => (
                <div
                  key={reg.registrationID}
                  className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg mb-4 border border-amber-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold">
                      {reg.eventName || reg.teamName || "Event"}
                    </h3>
                    <span
                      className={`${
                        reg.registrationStatus === "2"
                          ? "text-green-500"
                          : "text-yellow-500"
                      } font-medium`}
                    >
                      {reg.registrationStatus === "2" ? "Verified" : "Pending"}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700">
                    <div>
                      <span className="font-semibold">Amount Paid: </span>
                      {reg.amountPaid}
                    </div>
                    <div>
                      <span className="font-semibold">Role: </span>
                      {reg.roleDescription}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-lg">No events registered.</p>
            )}
          </div>

          {/* Transactions Section */}
          <div
            className="p-6 rounded-lg shadow-md border border-gray-300"
            style={{
              background: "linear-gradient(to bottom, #fffef5, #fdf2d0)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Transactions
            </h2>
            {transactions.length > 0 ? (
              transactions.map((txn) => (
                <div
                  key={txn.txnID}
                  className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg mb-4 border border-amber-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="text-xl font-semibold">
                      {txn.eventName || "Unknown Event"}
                    </h3>
                    <span className={getStatusColor(txn.transactionStatus)}>
                      {txn.transactionStatus === "2"
                        ? "Success"
                        : txn.transactionStatus === "0"
                        ? "Failed"
                        : "Pending"}
                    </span>
                  </div>
                  <div className="mt-2 text-gray-700">
                    <p>
                      <span className="font-semibold">Amount: </span>
                      {txn.amount}
                    </p>
                    <p>
                      <span className="font-semibold">Transaction ID: </span>
                      {txn.txnID}
                    </p>
                  </div>
                  {(txn.transactionStatus === "1" ||
                    txn.transactionStatus === "Pending") && (
                    <button
                      className="text-[#1a1a1a] mt-2 px-4 py-1 rounded-full border-2 border-[#5b4711] bg-opacity-72 bg-[#fde6a8] transition-all duration-300 ease-in-out transform hover:shadow-lg hover:scale-105 active:scale-95"
                      onClick={() =>
                        router.push(`/transactions/verify/${txn.txnID}`)
                      }
                    >
                      Verify
                    </button>
                  )}
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
