import {
  FETCH_INDENT_BILLS_REQUEST,
  FETCH_INDENT_BILLS_SUCCESS,
  FETCH_INDENT_BILLS_FAIL,
  CREATE_INDENT_BILL_REQUEST,
  CREATE_INDENT_BILL_SUCCESS,
  CREATE_INDENT_BILL_FAIL,
} from "../actions/actionTypes";

export const fetchIndentBills = (pen) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_INDENT_BILLS_REQUEST });

    const response = await fetch(`/api/indent-bills/user/${pen}`);
    const data = await response.json();

    dispatch({ type: FETCH_INDENT_BILLS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_INDENT_BILLS_FAIL,
      payload: error.message || "Failed to fetch indent bills",
    });
  }
};

export const createIndentBill = (billData) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_INDENT_BILL_REQUEST });

    const response = await fetch("/api/indent-bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(billData),
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.error || "Error creating bill");

    dispatch({ type: CREATE_INDENT_BILL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_INDENT_BILL_FAIL,
      payload: error.message || "Failed to create indent bill",
    });
  }
};
