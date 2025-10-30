import { configureStore } from "@reduxjs/toolkit";
import jsonInputReducer from "./slices/jsonInputSlice";
import searchReducer from "./slices/searchSlice";
const store = configureStore({
  reducer: {
    jsonInput: jsonInputReducer,
    search: searchReducer,
  },
});

export default store;
