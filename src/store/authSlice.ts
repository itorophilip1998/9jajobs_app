import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  loggedIn: boolean;
  onBoarded: boolean;
  darkMode: boolean;
  access_token: string | null;
  profile: any;
  lat: number;
  lng: number;
  data: any;
}

const initialState: IAuth = {
  loggedIn: false,
  onBoarded: false,
  darkMode: true,
  access_token: null,
  profile: null,
  lat: 0,
  lng: 0,
  data: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    SET_ON_BOARD: (state, action: PayloadAction<boolean>) => {
      state.onBoarded = action.payload;
    },
    SET_DARK_MODE: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    SET_TOKEN: (state, action: PayloadAction<string | null>) => {
      state.access_token = action.payload;
    },
    SET_PROFILE: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    SET_COORDINATE: (
      state,
      action: PayloadAction<Partial<{ lat: number; lng: number }>>
    ) => {
      state.lat = action.payload?.lat || state.lat;
      state.lng = action.payload?.lng || state.lng;
    },
    SET_DATA: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const {
  LOGIN,
  SET_ON_BOARD,
  SET_DARK_MODE,
  SET_TOKEN,
  SET_PROFILE,
  SET_COORDINATE,
  SET_DATA,
} = authSlice.actions;

export default authSlice.reducer;
