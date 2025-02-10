const { headers } = require("next/headers");
const base_url = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

{
  /* Password for now is not hashed !!!! */
}

const make_request = async (url, method, data = null) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const login = async (email, password) => {
  const url = `${base_url}/auth/login`;
  const data = { userEmail: email, userPassword: password };

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
  {
    /* Still unclear about accommodation data */
  }
  const data = {
    userName: userName,
    userEmail: userEmail,
    userPassword: userPassword,
    confirmPassword: confirmPassword,
    phoneNumber: phoneNumber,
    isAmrita: isAmrita,
    collegeName: collegeName,
    collegeCity: collegeCity,
    rollNumber: rollNumber,
    userDepartment: userDepartment,
    academicYear: academicYear,
    degree: degree,
    needAccommodation: needAccommodation,
  };

  return await make_request(url, "POST", data);
};
