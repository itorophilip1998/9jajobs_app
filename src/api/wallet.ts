import axios from "axios";
import { BASE_URL } from "./config";
import { store } from "../store";
import { LOGIN, SET_PROFILE, SET_TOKEN } from "../store/authSlice";

export const getWalletDetails = async (
  purpose:
    | null
    | "verification"
    | "packages"
    | "top-up"
    | "withdrawal"
    | "referrals"
    | "boost"
    | "listing",
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/transaction?purpose=${purpose || ""}`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("Network error");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("auth-user", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const initiateWalletTransaction = async (
  form: {
    type: "credit" | "debit";
    status: "success" | "failed" | "pending";
    ref_number?: string;
    trans_id?: string;
    amount: number;
    description?: string;
    listing_id?: number;
    package_id?: string;
    referral_code?: string;
    purpose:
      | "verification"
      | "packages"
      | "top-up"
      | "withdrawal"
      | "referrals"
      | "boost";
  } | null,
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const data = new FormData();
  data.append("type", form?.type || "");
  data.append("status", form?.status || "");
  data.append("ref_number", form?.ref_number || "");
  data.append("trans_id", form?.trans_id || "");
  data.append("amount", form?.amount.toString() || "");
  data.append("description", form?.description || "");
  data.append("purpose", form?.purpose || "");
  data.append("listing_id", form?.listing_id?.toString() || "");
  data.append("package_id", form?.package_id || "");
  data.append("referral_code", form?.referral_code || "");
  var config = {
    method: "post",
    url: `${BASE_URL}/transaction/initiate`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("Network error");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("initiate-transaction", err?.response?.data);
    console.log(err?.response?.status);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getBanks = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `https://api.paystack.co/bank?country=nigeria`,
    headers: {
      Authorization: "Bearer sk_test_1a0d4738e93f6f24d394945aa3e29077adc196bf",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("Network error");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("get-banks", err?.response?.data);

    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getAccountName = async (
  data: {
    acct_no: string;
    bank_code: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `https://api.paystack.co/bank/resolve?account_number=${data.acct_no}&bank_code=${data.bank_code}`,
    headers: {
      Authorization: "Bearer sk_test_1a0d4738e93f6f24d394945aa3e29077adc196bf",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("Network error");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("verify-account", err?.response?.data?.message);
    if (typeof err?.response?.data?.message === "string") {
      error(err?.response?.data?.message);
    } else if (!err?.response?.data?.message || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.message === "object") {
      error(Object.values(err?.response?.data?.message).flat().join("\n"));
    }
  }
};

export const transfer = async (
  data: {
    type: string;
    name: string;
    account_number: string;
    bank_code: string;
    currency: "NGN";
    amount: number;
    email: string;
    description: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "post",
    url: `https://api.paystack.co/transferrecipient`,
    headers: {
      Authorization: "Bearer sk_test_1a0d4738e93f6f24d394945aa3e29077adc196bf",
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    const response = await axios(config);
    const transferRecipientCode = response.data.data.recipient_code;

    // Step 2: Initiate Transfer
    const transferData = {
      source: "balance",
      amount: data.amount,
      recipient: transferRecipientCode,
      reason: "Wallet withdrawal",
    };
    const response1 = await axios.post(
      `https://api.paystack.co/transfer`,
      transferData,
      {
        headers: {
          Authorization:
            "Bearer sk_test_1a0d4738e93f6f24d394945aa3e29077adc196bf",
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Transfer-recept", response1.data);
    execute(response1.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("Network error");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("verify-account", err?.response?.data);
    if (typeof err?.response?.data.message === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data?.message || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data.message === "object") {
      error(Object.values(err?.response?.data.message).flat().join("\n"));
    }
  }
};
