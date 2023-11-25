import axios from "axios";
import { BASE_URL } from "./config";
import { store } from "../store";
import { LOGIN, SET_PROFILE, SET_TOKEN } from "../store/authSlice";

export const getRating = async (
  user_id: number,
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/ratings/${user_id}`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("auth-user", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const postRate = async (
  data: {
    user_id: string;
    description: string;
    rate: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
    const formData = new FormData()
    formData.append("user_id", data.user_id)
    formData.append("description", data.description)
    formData.append("rate", data.rate)
  var config = {
    method: "post",
    url: `${BASE_URL}/ratings`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
    data: formData
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("auth-user", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};
