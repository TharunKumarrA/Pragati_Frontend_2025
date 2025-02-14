export const payU_Key =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === "0"
    ? process.env.NEXT_PUBLIC_PAY_U_KEY_TEST
    : process.env.NEXT_PUBLIC_PAY_U_KEY_PROD ?? "gtKFFx"; // Dummy test Key
export const payU_Action =
  process.env.NEXT_PUBLIC_IS_PRODUCTION === "0"
    ? "https://test.payu.in/_payment"
    : "https://secure.payu.in/_payment";
