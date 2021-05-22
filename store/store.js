import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "../components/library/librarySlice";
import padReducer from "../components/pad/padSlice";

export default configureStore({
  reducer: {
    library: libraryReducer,
    pad: padReducer,
  },
});