import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";

export const getNotification = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/notification`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("get-notification", err?.response?.data);
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

export const getNotificationCount = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/notification/counts`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("get-notification-count", err?.response?.data);
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

export const markReadNotification = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "post",
    url: `${BASE_URL}/notification/read-all`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
      "Content-Type": "multipart/form-data",
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("mark-notification", err?.response?.data);
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
