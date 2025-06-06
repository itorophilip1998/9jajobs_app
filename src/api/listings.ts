import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";
import moment from "moment";

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
    listing_creation_amount: string;
    listing_oh_sunday: string;
    listing_featured_photo: any;
    listing_category_id: string;
    listing_status: string;
    is_featured: boolean;
    photo_list: any[];
    social_media: (false | { url: string; icon: string })[];
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
  formData.append(
    "start_date",
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  formData.append(
    "end_date",
    moment(
      new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
    ).format("YYYY-MM-DD")
  );
  formData.append("listing_status", data.listing_status);
  formData.append("listing_creation_amount", data.listing_creation_amount);
  formData.append("is_featured", data.is_featured.toString());
  data.photo_list.map((item, idx) =>
    formData.append("photo_list[" + idx + "]", item)
  );
  data.video.map((item, idx) => formData.append("video[" + idx + "]", item));
  data.amenity.map((item, idx) =>
    formData.append("amenity[" + idx + "]", item)
  );
  data.social_media
    .filter((item) => typeof item === "object" && item !== null)
    .map((item, index) =>
      Object.entries(item).forEach(([key, value]) => {
        formData.append(`social_media[${index}][${key}]`, value);
      })
    );

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
    if (err?.message === "Network Error") {
     
      return;
      // Handle the case when there is no internet connection
    }
    console.log("report-listing", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error);
    } else if (!err?.response?.data?.error || err?.response?.status === 500) {
      error("Something went wrong. Try again.");
    } else if (typeof err?.response?.data?.error === "object") {
      error(Object.values(err?.response?.data?.error).flat().join("\n"));
    }
  }
};

export const editListing = async (
  data: {
    listing_id: string;
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
    social_media: (false | { url: string; icon: string })[];
    video: any[];
    amenity: string[];
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  // formData.append("listing_id", data.listing_id);
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
  data.listing_featured_photo &&
    formData.append("listing_featured_photo", data.listing_featured_photo);
  formData.append("listing_category_id", data.listing_category_id);
  formData.append("listing_status", data.listing_status);
  formData.append("is_featured", data.is_featured.toString());
  data.photo_list.map((item, idx) =>
    formData.append("photo_list[" + idx + "]", item)
  );
  data.video.map((item, idx) => formData.append("video[" + idx + "]", item));
  data.amenity.map((item, idx) =>
    formData.append("amenity[" + idx + "]", item)
  );
  data.social_media
    .filter((item) => typeof item === "object" && item !== null)
    .map((item, index) =>
      Object.entries(item).forEach(([key, value]) => {
        formData.append(`social_media[${index}][${key}]`, value);
      })
    );

  var config = {
    method: "post",
    url: `${BASE_URL}/update-listings/${data.listing_id}`,
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
     
      return;
      // Handle the case when there is no internet connection
    }
    console.log("edit-listing", err?.response?.data);
    if (err?.response?.status === 401) {
      store.dispatch(LOGIN(false));
      store.dispatch(SET_TOKEN(null));
      store.dispatch(SET_PROFILE(null));
    }
    if (typeof err?.response?.data?.error === "string") {
      error(err?.response?.data?.error);
    } else if (!err?.response?.data?.error || err?.response?.status === 500) {
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
    if (err?.message === "Network Error") {
     
      return;
      // Handle the case when there is no internet connection
    }
    console.log("delete-listing", err?.response?.data);
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

export const renewListing = async (
  data: {
    listing_id: string;
    listing_creation_amount: string;
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("listing_id", data.listing_id);
  formData.append("listing_creation_amount", data.listing_creation_amount);
  formData.append(
    "start_date",
    moment(new Date().toISOString()).format("YYYY-MM-DD")
  );
  formData.append(
    "end_date",
    moment(
      new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
    ).format("YYYY-MM-DD")
  );
  var config = {
    method: "post",
    url: `${BASE_URL}/renew-listings`,
    headers: {
      Authorization: `Bearer ${store.getState().auth.access_token}`,
    },
    data: formData,
  };

  try {
    const response = await axios(config);
    execute(response.data);
  } catch (err: any) {
    if (err?.message === "Network Error") {
     
      return;
      // Handle the case when there is no internet connection
    }
    console.log("delete-listing", err?.response?.data);
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
