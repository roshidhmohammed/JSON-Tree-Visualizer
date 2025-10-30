import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const jsonInputSlice = createSlice({
  name: "jsonInput",
  initialState,
  reducers: {
    addJsonInput: (_state, action) => {
      return action.payload;
    },
    removeJsonInput: () => {
      return null;
    },
  },
});

export const { addJsonInput, removeJsonInput } = jsonInputSlice.actions;
export default jsonInputSlice.reducer;
