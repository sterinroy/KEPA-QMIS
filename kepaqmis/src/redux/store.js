import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import superAdminReducer from "./reducers/superAdminReducer";
import tempReducer from "./reducers/tempReducer";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token", "role", "pen"]
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    superAdmin: superAdminReducer,
    temp: tempReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);