import {
    FETCH_STOCK_REQUEST,
    FETCH_STOCK_SUCCESS,
    FETCH_STOCK_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  stocks: [],
  loading: false,
  error: null,
};

export const stockReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STOCK_REQUEST:
      return { ...state, loading: true };
    case FETCH_STOCK_SUCCESS:
      return { ...state, loading: false, stocks: action.payload };
    case FETCH_STOCK_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default stockReducer;
