import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISearch {
  type: "location" | "name";
  search: string;
  location: string;
}

const initialState: ISearch = {
  type: "name",
  search: "",
  location: "",
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    SET_TYPE: (state, action: PayloadAction<"location" | "name">) => {
      state.type = action.payload;
    },
    SET_NAME: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    SET_LOCATION: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
  },
});

export const { SET_LOCATION, SET_NAME, SET_TYPE } = searchSlice.actions;

export default searchSlice.reducer;
