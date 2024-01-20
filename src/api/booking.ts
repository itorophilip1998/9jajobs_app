import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";

export const bookListing = async (
  data: {
    listing_id: string;
    date: string;
    time: string;
    location: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("listing_id", data.listing_id);
  formData.append("date", data.date);
  formData.append("time", data.time);
  formData.append("location", data.location);
  var config = {
    method: "post",
    url: `${BASE_URL}/bookings`,
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
    console.log("Book-Listing", err?.response?.data);
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

export const getAllBookings = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/bookings`,
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
    console.log("all-booking", err?.response?.data);
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

export const updateBooking = async (
  data: {
    booking_id: string;
    status: "pending" | "completed" | "cancelled" | "accepted" | "declined";
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("booking_id", data.booking_id);
  formData.append("status", data.status);

  var config = {
    method: "post",
    url: `${BASE_URL}/bookings/update-status`,
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
    console.log("update-booking", err?.response?.data);
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
