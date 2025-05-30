import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { purchaseReducer } from './purchaseReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  purchase:purchaseReducer,
});

export default rootReducer;