// qmpurchaseReducer.js
import {
  QMPURCHASE_SUBMIT_REQUEST,
  QMPURCHASE_SUBMIT_SUCCESS,
  QMPURCHASE_SUBMIT_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  successMessage: null,
  errorMessage: null,
  purchaseEntry: null,
};

function qmpurchaseReducer(state = initialState, action) {
  switch (action.type) {
    case QMPURCHASE_SUBMIT_REQUEST:
      return {
        ...state,
        loading: true,
        successMessage: null,
        errorMessage: null,
      };
    case QMPURCHASE_SUBMIT_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload.message,
        purchaseEntry: action.payload.entry,
      };
    case QMPURCHASE_SUBMIT_FAILURE:
      return { ...state, loading: false, errorMessage: action.payload };
    default:
      return state;
  }
}

export default qmpurchaseReducer;
