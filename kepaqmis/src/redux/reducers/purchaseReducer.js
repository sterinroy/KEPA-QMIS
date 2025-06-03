import {
  FETCH_PURCHASES_REQUEST,
  FETCH_PURCHASES_SUCCESS,
  FETCH_PURCHASES_FAILURE,
  SUBMIT_PURCHASE_REQUEST,
  SUBMIT_PURCHASE_SUCCESS,
  SUBMIT_PURCHASE_FAILURE
} from '../actions/actionTypes';

const initialState = {
  purchases: [],
  loading: false,
  error: null,
};

export const purchaseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PURCHASES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PURCHASES_SUCCESS:
      return { ...state, loading: false, purchases: action.payload };
    case FETCH_PURCHASES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SUBMIT_PURCHASE_REQUEST:
      return { ...state, loading: true, success: false, error: null };
    case SUBMIT_PURCHASE_SUCCESS:
      return { ...state, loading: false, success: true };
    case SUBMIT_PURCHASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
