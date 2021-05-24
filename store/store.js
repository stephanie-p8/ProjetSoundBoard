import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "../components/library/librarySlice";
import padReducer from "../components/pad/padSlice";
/**
 * Give reducers to store
 * @author Stephanie PERAFAN
 * @version 1.0.0
 * @see {@link https://redux-toolkit.js.org/usage/usage-with-typescript#configurestore | Configure the store - Redux toolkit }
 */
export default configureStore({
  reducer: {
    library: libraryReducer,
    pad: padReducer,
  },
});
