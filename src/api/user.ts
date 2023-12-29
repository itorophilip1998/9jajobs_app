import axios from "axios";
import { BASE_URL } from "./config";
import { store } from "../store";
import { LOGIN, SET_PROFILE, SET_TOKEN } from "../store/authSlice";

export const getUser = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/auth/auth-user`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
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

export const editUser = async (
  data: {
    name?: string;
    phone?: string;
    address?: string;
    country?: string;
    state?: string;
    city?: string;
    photo?: any;
    password?: string | null;
    re_password?: string | null;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  data.name && formData.append("name", data.name);
  data.phone && formData.append("phone", data.phone);
  data.address && formData.append("address", data.address);
  data.country && formData.append("country", data.country);
  data.state && formData.append("state", data.state);
  data.city && formData.append("city", data.city);
  data.photo && formData.append("photo", data.photo);
  data.password && formData.append("password", data.password);
  data.re_password && formData.append("re_password", data.re_password);
  var config = {
    method: "post",
    url: `${BASE_URL}/auth/edit-user`,
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
    console.log("edit-user", err?.response?.data);
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
