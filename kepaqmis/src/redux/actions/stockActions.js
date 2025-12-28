import {
  FETCH_STOCK_REQUEST,
  FETCH_STOCK_SUCCESS,
  FETCH_STOCK_FAILURE,
} from "../actions/actionTypes";


export const fetchStockItems = () => async (dispatch) => {
  dispatch({ type: FETCH_STOCK_REQUEST });
  try {
    const response = await fetch("/api/stockRoutes/stockitems"); 
    const data = await response.json();
    dispatch({ type: FETCH_STOCK_SUCCESS, payload: data.data || [] });
  } catch (error) {
    dispatch({ type: FETCH_STOCK_FAILURE, payload: error.message });
  }
};
