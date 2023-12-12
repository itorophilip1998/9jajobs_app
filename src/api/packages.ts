import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";
import moment, { duration } from "moment";

export const getPackages = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/package`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("get-packages", err?.response?.data);
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

export const subscribePackage = async (
  data: { package_id: string; duration: string },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("package_id", data.package_id);
  formData.append("package_start_date", new Date().toISOString());
  formData.append(
    "package_end_date",
    new Date(
      new Date().getTime() + Number(data.duration) * 24 * 60 * 60 * 1000
    ).toISOString()
  );
  var config = {
    method: "post",
    url: `${BASE_URL}/package/purchase`,
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
    console.log("get-packages", err?.response?.data);
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

export const subscribeBoosting = async (
  data: { listing_id: string; duration: number; amount: number },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("listing_id", data.listing_id);
  formData.append("amount", data.amount.toString());
  formData.append("duration", data.duration.toString());
  formData.append("start_date", moment(new Date().toISOString()).format("YYYY-MM-DD"));
  formData.append(
    "end_date",
    moment(new Date(
      new Date().getTime() + Number(data.duration) * 31 * 24 * 60 * 60 * 1000
    ).toISOString()).format("YYYY-MM-DD")
  );
  var config = {
    method: "post",
    url: `${BASE_URL}/boosting`,
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
    console.log("boost-listing", err?.response?.data);
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
