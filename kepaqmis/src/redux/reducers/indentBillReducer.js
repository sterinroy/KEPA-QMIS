import {
  FETCH_INDENT_BILLS_REQUEST,
  FETCH_INDENT_BILLS_SUCCESS,
  FETCH_INDENT_BILLS_FAIL,
  CREATE_INDENT_BILL_REQUEST,
  CREATE_INDENT_BILL_SUCCESS,
  CREATE_INDENT_BILL_FAIL,
} from "../types/indentBillTypes";

const initialState = {
  bills: [],
  loading: false,
  error: null,
  createdBill: null,
};

const indentBillReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INDENT_BILLS_REQUEST:
    case CREATE_INDENT_BILL_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_INDENT_BILLS_SUCCESS:
      return { ...state, loading: false, bills: action.payload };

    case CREATE_INDENT_BILL_SUCCESS:
      return {
        ...state,
        loading: false,
        createdBill: action.payload,
        bills: [...state.bills, action.payload],
      };

    case FETCH_INDENT_BILLS_FAIL:
    case CREATE_INDENT_BILL_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default indentBillReducer;
