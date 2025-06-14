import { combineReducers } from "redux";
import authReducer from "./authReducer";
import superAdminReducer from "./superAdminReducer";
import stockReducer from "./stockReducer";

const rootReducer = combineReducers({
  stock: stockReducer,
  auth: authReducer,
  superAdmin: superAdminReducer,
});

export default rootReducer;
