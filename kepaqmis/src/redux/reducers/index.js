import { combineReducers } from "redux";
import authReducer from "./authReducer";
import superAdminReducer from "./superAdminReducer";
import { purchaseReducer } from "./purchaseReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  superAdmin: superAdminReducer,
  purchase:purchaseReducer
});

export default rootReducer;
