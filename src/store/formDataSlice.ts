import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IFormData {
  errorModal: boolean;
  errorMessage: string;
  loader: boolean;
  successModal: boolean;
  successMessage: string;

  authData: {
    fullName: string;
    email: string;
    phoneNumber: string;
    referralCode: string;
    password: string;
    confirmPassword: string;
  };
}

const initialState: IFormData = {
  errorModal: false,
  errorMessage: "",
  loader: false,
  successModal: false,
  successMessage: "",

  authData: {
    fullName: "",
    email: "",
    phoneNumber: "",
    referralCode: "",
    password: "",
    confirmPassword: "",
  },
};

export const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    SET_ERROR: (state, action: PayloadAction<string>) => {
      state.errorModal = true;
      state.errorMessage = action.payload;
    },
    UNSET_ERROR: (state) => {
      state.errorModal = false;
      state.errorMessage = "";
    },
    SET_SUCCESS: (state, action: PayloadAction<string>) => {
      state.successModal = true;
      state.successMessage = action.payload;
    },
    UNSET_SUCCESS: (state) => {
      state.successModal = false;
      state.successMessage = "";
    },
    SET_LOADER: (state, action: PayloadAction<boolean>) => {
      state.loader = action.payload;
    },
    SET_PHONE_NUMBER: (state, action: PayloadAction<string>) => {
      state.authData.phoneNumber = action.payload;
    },
    SET_REFERRAL_CODE: (state, action: PayloadAction<string>) => {
      state.authData.referralCode = action.payload;
    },
    SET_FULL_NAME: (state, action: PayloadAction<string>) => {
      state.authData.fullName = action.payload;
    },
    SET_EMAIL: (state, action: PayloadAction<string>) => {
      state.authData.email = action.payload;
    },
    SET_PASSWORD: (state, action: PayloadAction<string>) => {
      state.authData.password = action.payload;
    },
    SET_CONFIRM_PASSWORD: (state, action: PayloadAction<string>) => {
      state.authData.confirmPassword = action.payload;
    },
  },
});

export const {
  SET_ERROR,
  SET_FULL_NAME,
  SET_LOADER,
  SET_PASSWORD,
  SET_CONFIRM_PASSWORD,
  SET_PHONE_NUMBER,
  SET_EMAIL,
  SET_REFERRAL_CODE,
  SET_SUCCESS,
  UNSET_ERROR,
  UNSET_SUCCESS,
} = formDataSlice.actions;

export default formDataSlice.reducer;
