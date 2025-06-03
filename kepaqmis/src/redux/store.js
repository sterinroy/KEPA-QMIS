import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import superAdminReducer from "./reducers/superAdminReducer";
import tempReducer from "./reducers/tempReducer"; // 👈 Add this line
import { purchaseReducer } from "./reducers/purchaseReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    superAdmin: superAdminReducer,
    temp: tempReducer,
    purchase:purchaseReducer,
  },
});
