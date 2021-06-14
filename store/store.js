import libraryReducer from "../components/library/librarySlice";
import padReducer from "../components/pad/padSlice";
import { combineReducers,configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

/**
 * Combine reducers
 * @see {@link https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#combinereducers | Combine reducers - Redux tollkit }
 */
const reducers = combineReducers({ library: libraryReducer, pad: padReducer });
const persistedReducer = persistReducer(
  { key: "root", storage: AsyncStorage },
  reducers
);

/**
 * Give reducers to store
 * @author Stephanie PERAFAN
 * @version 1.0.0
 * @see {@link https://redux-toolkit.js.org/usage/usage-with-typescript#configurestore | Configure the store - Redux toolkit }
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);