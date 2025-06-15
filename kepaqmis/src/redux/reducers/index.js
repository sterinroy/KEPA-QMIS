import { combineReducers } from "redux";
import authReducer from "./authReducer";
import superAdminReducer from "./superAdminReducer";
import qmpurchaseReducer from "./qmPurchaseReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  superAdmin: superAdminReducer,
  qmpurchase: qmpurchaseReducer,
});

export default rootReducer;
