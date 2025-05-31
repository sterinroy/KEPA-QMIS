import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { purchaseReducer } from './purchaseReducer';
import superAdminReducer from "./superAdminReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  purchase:purchaseReducer,
  superAdmin: superAdminReducer,
});

export default rootReducer;
