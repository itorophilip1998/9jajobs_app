import axios from "axios";
import { BASE_URL } from "./config";
import { store } from "../store";
import { LOGIN, SET_PROFILE, SET_TOKEN } from "../store/authSlice";

export const refreshToken = async (
  data: {
    expo_token?: string | null;
  },
  execute: (arg: any) => void,
  error: (arg: string) => void
) => {
  const formData = new FormData();
  data.expo_token && formData.append("expo_token", data.expo_token);
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/refresh`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("refresh", err?.response?.data);
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const signUp = async (
  data: {
    name: string;
    email: string;
    phone: string;
    referrer_code: any;
    password: string;
    re_password: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("phone_number", data.phone);
  formData.append("referrer_code", data.referrer_code);
  formData.append("password", data.password);
  formData.append("re_password", data.re_password);
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/register`,
    data: data,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("register", err?.response?.data);
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error || "Something went wrong. Try again.");
    } else if (!err?.response?.data?.error || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const signIn = async (
  data: {
    email: string;
    password: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("password", data.password);
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/login`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("login", err?.response?.data);
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error || err?.response?.status === 500);
    } else if (!err?.response?.data?.error) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const forgot = async (
  data: {
    email: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("email", data.email);
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/forgot-password`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("forgot-password", err?.response?.data);
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error || err?.response?.status === 500);
    } else if (!err?.response?.data?.error) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const verifyAndReset = async (
  data: {
    email: string;
    otp: string;
    password: string;
    re_password: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("email", data.email);
  formData.append("otp", data.otp);
  formData.append("password", data.password);
  formData.append("re_password", data.re_password);
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/reset-password`,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("verify-reset-error", err?.response?.data);
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error || err?.response?.status === 500);
    } else if (!err?.response?.data?.error) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const logout = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/logout`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("logout", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data || "Something went wrong. Try again.");
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const deleteAccount = async (
  data: { user_id: string; status: "active" | "inactive" },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData()
  formData.append("user_id", data.user_id);
  formData.append("status", data.status);

  var config = {
    method: "post",
    url: `${BASE_URL}/auth/de-activate-account`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
    data: formData
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("delete", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data || "Something went wrong. Try again.");
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getData = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `https://9jajob.sfo3.cdn.digitaloceanspaces.com/assets/data.ts`,
  };

  try {
    const response = await axios(config);
    execute(eval(response.data));
  } catch (err: any) {
    if (err?.message === "Network Error") {
      error("No internet connection");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("data", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data || "Something went wrong. Try again.");
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};
