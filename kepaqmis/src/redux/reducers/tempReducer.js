import {
  TEMP_STOCK_SUBMIT_REQUEST,
  TEMP_STOCK_SUBMIT_SUCCESS,
  TEMP_STOCK_SUBMIT_FAILURE,
  TEMP_STOCK_FETCH_REQUEST,
  TEMP_STOCK_FETCH_SUCCESS,
  TEMP_STOCK_FETCH_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  loading: false,
  error: null,
  issuedList: [],
  successMessage: null,
};

const tempReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEMP_STOCK_SUBMIT_REQUEST:
    case TEMP_STOCK_FETCH_REQUEST:
      return { ...state, loading: true, error: null };

    case TEMP_STOCK_SUBMIT_SUCCESS:
      return { ...state, loading: false, successMessage: action.payload };

    case TEMP_STOCK_SUBMIT_FAILURE:
    case TEMP_STOCK_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case TEMP_STOCK_FETCH_SUCCESS:
      return { ...state, loading: false, issuedList: action.payload };

    default:
      return state;
  }
};

export default tempReducer;
