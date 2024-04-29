import axios from "axios";
import { store } from "../store";
import { LOGIN, SET_TOKEN, SET_PROFILE } from "../store/authSlice";
import { BASE_URL } from "./config";

export const verifyListing = async (
  data: {
    listing_id: string;
    reg_number: string;
    id_card_front: any;
    id_card_back: any;
    cac_document: any;
    skill_certificate: any;
    proof_address: any;
    services: string[];
  },
  execute: (e: any) => void,
  error: (e: string) => void
) => {
  const formData = new FormData();
  formData.append("listing_id", data.listing_id);
  formData.append("reg_number", data.reg_number);
  data.id_card_front && formData.append("id_card_front", data.id_card_front);
  data.id_card_back && formData.append("id_card_back", data.id_card_back);
  data.cac_document && formData.append("cac_document", data.cac_document);
  data.skill_certificate &&
    formData.append("skill_certificate", data.skill_certificate);
  data.proof_address && formData.append("proof_address", data.proof_address);
  data.services.map((item: string) => formData.append("services[]", item));
  var config = {
    method: "post",
    url: `${BASE_URL}/verification`,
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
      error("Network error");
      return;
      // Handle the case when there is no internet connection
    }
    console.log("verify-listing", err?.response?.data);
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
