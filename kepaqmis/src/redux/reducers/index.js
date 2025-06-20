import { combineReducers } from "redux";
import authReducer from "./authReducer";
import superAdminReducer from "./superAdminReducer";
import stockReducer from "./stockReducer";
import qmpurchaseReducer from "./qmpurchaseReducer";
import qmissueReducer from "./qmissueReducer";
import categoryReducer from "./categoryReducer";
import officeReducer from "./officeReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  superAdmin: superAdminReducer,
  stock: stockReducer,
  qmpurchase: qmpurchaseReducer,
  qmissue: qmissueReducer,
  category: categoryReducer,
  office: officeReducer,
});

export default rootReducer;
