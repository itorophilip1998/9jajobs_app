import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";

export const addListing = async (
  data: {
    listing_name: string;
    listing_description: string;
    listing_phone: string;
    listing_address: string;
    listing_category_id: string;
    photo_list: File[];
    video_list: File[];
    amenity: string[];
    listing_featured_photo: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("listing_name", data.listing_name);
  formData.append("is_featured", "true");
  var config = {
    method: "post",
    url: `${BASE_URL}/add-listings`,
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
    console.log("report-listing", err?.response?.data);
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

export const deleteListing = async (
  data: {
    id: number;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  var config = {
    method: "delete",
    url: `${BASE_URL}/delete-listings/${data.id}`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    console.log("delete-listing", err?.response?.data);
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
