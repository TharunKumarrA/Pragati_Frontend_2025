const { headers } = require("next/headers");
const base_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
import hash from "./hash";

const make_request = async (url, method, data = null) => {
  try {
    const options = {
      method,
      headers: { "Content-Type": "application/json" },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      // Include status in the thrown error
      console.log("Request error:", responseData);
      const error = new Error(responseData.MESSAGE || response.statusText);
      error.status = response.status;
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("Request error:", error);
    throw error; // Rethrow to be caught in handleSubmit
  }
};

export const login = async (email, password) => {
  const url = `${base_url}/auth/login`;
  const data = { userEmail: email, userPassword: hash.hashPassword(password) };

  return await make_request(url, "POST", data);
};

export const signup = async (
  userName,
  userEmail,
  userPassword,
  confirmPassword,
  phoneNumber,
  isAmrita,
  collegeName,
  collegeCity,
  rollNumber,
  userDepartment,
  academicYear,
  degree,
  needAccommodation
) => {
  const url = `${base_url}/auth/signup`;
  const data = {
    userName: userName,
    userEmail: userEmail,
    userPassword: hash.hashPassword(userPassword),
    confirmPassword: hash.hashPassword(confirmPassword),
    phoneNumber: phoneNumber,
    isAmrita: isAmrita,
    collegeName: collegeName,
    collegeCity: collegeCity,
    rollNumber: rollNumber,
    userDepartment: userDepartment,
    academicYear: parseInt(academicYear, 10), // Convert academicYear to a number
    degree: degree,
    needAccommodation: needAccommodation,
  };

  return await make_request(url, "POST", data);
};

export const verifyOtp = async (otp, otpToken) => {
  const url = `${base_url}/auth/verifyUser`;
  const data = { otp: hash.hashPassword(otp) }; // Hash the OTP

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpToken}`, // Send OTP Token as Bearer token
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      // Wrap the response with a success flag
      return { success: true, ...json };
    } else {
      // Optionally, include an error flag or message here
      return { success: false, ...json };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const reverifyUser = async (email) => {
  const url = `${base_url}/auth/reverifyUser`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: email }),
    });

    const responseData = await response.json();

    return { status: response.status, ...responseData }; // Include status code
  } catch (error) {
    console.error("Error sending reverify request:", error);
    throw error;
  }
};

export const getNotifications = async () => {
  const url = `${base_url}/notification/`;
  return await make_request(url, "GET");
};

export const getEvents = async () => {
  const url = `${base_url}/event/all`;

  // Check if we're in a browser environment and if the user is logged in
  let token = null;
  if (typeof window !== "undefined") {
    const isLoggedIn = localStorage.getItem("isloggedin");
    if (isLoggedIn === "1") {
      token = localStorage.getItem("token");
    }
  }

  // Construct the request options, adding the Authorization header if a token exists
  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.MESSAGE || response.statusText);
    }

    return responseData;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
  }
};
