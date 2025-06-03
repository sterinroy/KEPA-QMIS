import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { purchaseReducer } from "./reducers/purchaseReducer";
import superAdminReducer from "./reducers/superAdminReducer";
import tempReducer from "./reducers/tempReducer"; // 👈 Add this line


export const store = configureStore({
  reducer: {
    auth: authReducer,
    purchase:purchaseReducer,
    superAdmin: superAdminReducer,
    temp: tempReducer,
  },
});
export default store;
