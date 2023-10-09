import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  loggedIn: boolean;
  onBoarded: boolean;
  darkMode: boolean;
}

const initialState: IAuth = {
  loggedIn: false,
  onBoarded: false,
  darkMode: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LOGIN: (state) => {
      state.loggedIn = true;
    },
    LOGOUT: (state) => {
      state.loggedIn = false;
    },
    SET_ON_BOARD: (state, action: PayloadAction<boolean>) => {
      state.onBoarded = action.payload;
    },
    SET_DARK_MODE: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { LOGIN, LOGOUT, SET_ON_BOARD, SET_DARK_MODE } = authSlice.actions;

export default authSlice.reducer;
