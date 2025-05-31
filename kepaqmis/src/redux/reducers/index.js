import { combineReducers } from "redux";
import authReducer from "./authReducer";
import superAdminReducer from "./superAdminReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  superAdmin: superAdminReducer,
});

export default rootReducer;
