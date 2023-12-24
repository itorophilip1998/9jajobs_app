import axios from "axios";
import { BASE_URL } from "./config";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";

export const getAmenities = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/amenities`,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("categories", err?.response?.data);
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getCategories = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/categories`,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("categories", err?.response?.data);
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getCategoryListing = async (
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/categories/listing`,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("category-listing", err?.response?.data);
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getAllListing = async (
  data: {
    address_longitude?: string | null;
    address_latitude?: string | null;
    listing_category_id?: number;
    listing_name?: string;
    listing_city?: string;
    is_trending?: boolean;
    is_nearest?: boolean;
  } | null,
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/categories/all-listing?address_longitude=${
      store.getState().auth.lng !== 0 ? store.getState().auth.lng : ""
    }&address_latitude=${
      store.getState().auth.lat !== 0 ? store.getState().auth.lat : ""
    }&listing_category_id=${data?.listing_category_id || ""}&listing_name=${
      data?.listing_name || ""
    }&listing_city=${data?.listing_city || ""}&is_trending=${
      data?.is_trending || ""
    }&is_nearest=${data?.is_nearest || ""}`,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("all-listing", err?.response?.data);
    if (typeof err?.response?.data === "string") {
      error(err?.response?.data);
    } else if (!err?.response?.data || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data === "object") {
      error(Object.values(err?.response?.data).flat().join("\n"));
    }
  }
};

export const getUserListing = async (
  data: {
    address_longitude?: string | null;
    address_latitude?: string | null;
    listing_category_id?: number;
    listing_name?: string;
    listing_city?: string;
    is_trending?: boolean;
    is_nearest?: boolean;
  } | null,
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "get",
    url: `${BASE_URL}/categories/my-listing?address_longitude=${
      data?.address_longitude || ""
    }&address_latitude=${data?.address_latitude || ""}&listing_category_id=${
      data?.listing_category_id || ""
    }&listing_name=${data?.listing_name || ""}&listing_city=${
      data?.listing_city || ""
    }&is_trending=${data?.is_trending || ""}&is_nearest=${
      data?.is_nearest || ""
    }`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("user-listings", err?.response?.data);
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
