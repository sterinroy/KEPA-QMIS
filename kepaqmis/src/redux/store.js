import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import { purchaseReducer } from "./reducers/purchaseReducer";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    purchase:purchaseReducer,
  },
});
export default store;
