import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import superAdminReducer from "./reducers/superAdminReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    superAdmin: superAdminReducer,
  },
});
