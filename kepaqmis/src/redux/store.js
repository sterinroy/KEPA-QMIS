import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { purchaseReducer } from "./reducers/purchaseReducer";
import superAdminReducer from "./reducers/superAdminReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    purchase:purchaseReducer,
    superAdmin: superAdminReducer,
  },
});
export default store;
