import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  loggedIn: boolean;
  onBoarded: boolean;
  darkMode: boolean;
  access_token: string | null;
  profile: any;
}

const initialState: IAuth = {
  loggedIn: false,
  onBoarded: false,
  darkMode: true,
  access_token: null,
  profile: null,
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
  },
});

export const {
  LOGIN,
  SET_ON_BOARD,
  SET_DARK_MODE,
  SET_TOKEN,
  SET_PROFILE,
} = authSlice.actions;

export default authSlice.reducer;
