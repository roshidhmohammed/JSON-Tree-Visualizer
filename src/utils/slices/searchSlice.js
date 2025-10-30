import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const searchSlice = createSlice({
  name: "jsonInput",
  initialState,
  reducers: {
    addSearch: (_state, action) => {
      return action.payload;
    },
    removeSearch: () => {
      return null;
    },
  },
});

export const { addSearch, removeSearch } = searchSlice.actions;
export default searchSlice.reducer;
