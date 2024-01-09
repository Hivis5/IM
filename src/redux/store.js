import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "./reducers/locationReducers";

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
});

export default store;
