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
    address_longitude: string;
    address_latitude: string;
    listing_email: string;
    listing_website: string;
    listing_oh_monday: string;
    listing_oh_tuesday: string;
    listing_oh_wednesday: string;
    listing_oh_thursday: string;
    listing_oh_friday: string;
    listing_oh_saturday: string;
    listing_oh_sunday: string;
    listing_featured_photo: any;
    listing_category_id: string;
    listing_status: string;
    is_featured: boolean;
    photo_list: any[];
    social_media: any[];
    video: any[];
    amenity: string[];
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("listing_name", data.listing_name);
  formData.append("listing_description", data.listing_description);
  formData.append("listing_phone", data.listing_phone);
  formData.append("listing_address", data.listing_address);
  formData.append("address_longitude", data.address_longitude);
  formData.append("address_latitude", data.address_latitude);
  formData.append("listing_email", data.listing_email);
  formData.append("listing_website", data.listing_website);
  formData.append("listing_oh_monday", data.listing_oh_monday);
  formData.append("listing_oh_tuesday", data.listing_oh_tuesday);
  formData.append("listing_oh_wednesday", data.listing_oh_wednesday);
  formData.append("listing_oh_thursday", data.listing_oh_thursday);
  formData.append("listing_oh_friday", data.listing_oh_friday);
  formData.append("listing_oh_saturday", data.listing_oh_saturday);
  formData.append("listing_oh_sunday", data.listing_oh_sunday);
  formData.append("listing_featured_photo", data.listing_featured_photo);
  formData.append("listing_category_id", data.listing_category_id);
  formData.append("listing_status", data.listing_status);
  formData.append("is_featured", data.is_featured.toString());
  data.photo_list.map((item) => formData.append("photo_list[]", item));
  data.video.map((item) => formData.append("video[]", item));
  data.amenity.map((item) => formData.append("amenity[]", item));

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
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error);
    } else if (!err?.response?.data?.error) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
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
