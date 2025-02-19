const { headers } = require("next/headers");
const base_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
import hash from "./hash";
import secureLocalStorage from "react-secure-storage";

// Helper function to clear storage and redirect
const redirectToLogin = () => {
  secureLocalStorage.clear();
  window.location.href = "/login";
};

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

    // Check for unauthorized response
    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const responseData = await response.json();

    if (!response.ok) {
      console.log("Request error:", responseData);
      const error = new Error(responseData.MESSAGE || response.statusText);
      error.status = response.status;
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("Request error:", error);
    throw error;
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
  needAccommodationDay1,
  needAccommodationDay2,
  needAccommodationDay3
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
    academicYear: parseInt(academicYear, 10),
    degree: degree,
    needAccommodationDay1: needAccommodationDay1,
    needAccommodationDay2: needAccommodationDay2,
    needAccommodationDay3: needAccommodationDay3,
  };

  return await make_request(url, "POST", data);
};

export const verifyOtp = async (otp, otpToken) => {
  const url = `${base_url}/auth/verifyUser`;
  const data = { otp: hash.hashPassword(otp) };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const json = await response.json();

    if (response.ok) {
      return { success: true, ...json };
    } else {
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

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const responseData = await response.json();

    return { status: response.status, ...responseData };
  } catch (error) {
    console.error("Error sending reverify request:", error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  const url = `${base_url}/auth/forgotPassword`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userEmail: email }),
    });

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const responseData = await response.json();

    return { status: response.status, ...responseData };
  } catch (error) {
    console.error("Error sending forgot password request:", error);
    throw error;
  }
};

export const resetPassword = async (newPassword, otp, otpToken) => {
  const url = `${base_url}/auth/resetPassword`;
  const data = {
    otp: hash.hashPassword(otp),
    userPassword: hash.hashPassword(newPassword),
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${otpToken}`,
      },
      body: JSON.stringify(data),
    });

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const responseData = await response.json();

    return { status: response.status, ...responseData };
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
};

export const getNotifications = async () => {
  const url = `${base_url}/notification/`;
  return await make_request(url, "GET");
};

export const getUserProfile = async (authToken) => {
  const url = `${base_url}/profile`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getEvents = async () => {
  const url = `${base_url}/event/all`;
  let token = null;
  if (typeof window !== "undefined") {
    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
    if (isLoggedIn === "1") {
      token = secureLocalStorage.getItem("registerToken");
    }
  }

  const options = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("getEvents: No bearer token added");
  }

  try {
    const response = await fetch(url, options);
    if (response.status === 401) {
      redirectToLogin();
      return;
    }
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.MESSAGE || response.statusText);
    }

    return responseData;
  } catch (error) {
    console.error("getEvents: Request error:", error);
    throw error;
  }
};

export const getEvent = async (eventId) => {
  const url = `${base_url}/event/${eventId}`;

  let token = null;
  if (typeof window !== "undefined") {
    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
    if (isLoggedIn === "1") {
      token = secureLocalStorage.getItem("registerToken");
    }
  }

  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("getEvent: No bearer token added");
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers,
    });
    if (response.status === 401) {
      redirectToLogin();
      return;
    }
    const responseData = await response.json();

    if (!response.ok) {
      console.log("getEvent: Request error:", responseData);
      const error = new Error(responseData.MESSAGE || response.statusText);
      error.status = response.status;
      throw error;
    }

    return responseData;
  } catch (error) {
    console.error("getEvent: Request error:", error);
    throw error;
  }
};

export const registerTeam = async (teamData) => {
  const url = `${base_url}/registration/event`;

  let token = null;
  if (typeof window !== "undefined") {
    const isLoggedIn = secureLocalStorage.getItem("isLoggedIn");
    if (isLoggedIn === "1") {
      token = secureLocalStorage.getItem("registerToken");
    }
  }

  if (token) {
    console.log("registerTeam: Bearer token available");
  } else {
    console.log("registerTeam: No bearer token found");
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(teamData),
    });
    if (response.status === 401) {
      redirectToLogin();
      return;
    }
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.MESSAGE || response.statusText);
    }
    return responseData;
  } catch (error) {
    console.error("registerTeam: Request error:", error);
    throw error;
  }
};

export const verifyTransaction = async (transactionId) => {
  const url = `${base_url}/transaction/verify`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ txnID: transactionId }),
    });

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const responseData = await response.json();
    return { status: response.status, ...responseData };
  } catch (error) {
    console.error("Verify transaction error:", error);
    throw error;
  }
};

export const getTags = async () => {
  const url = `${base_url}/tag`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 401) {
      redirectToLogin();
      return;
    }

    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.MESSAGE || response.statusText);
    }

    return responseData;
  } catch (error) {
    console.error("getTags: Request error:", error);
    throw error;
  }
};
