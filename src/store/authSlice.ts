import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IAuth {
  loggedIn: boolean;
  onBoarded: boolean;
}

const initialState: IAuth = {
  loggedIn: false,
  onBoarded: false,
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
  },
});

export const { LOGIN, LOGOUT, SET_ON_BOARD } = authSlice.actions;

export default authSlice.reducer;
