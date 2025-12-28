// src/redux/reducers/officeReducer.js
import {
  FETCH_OFFICES_REQUEST,
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_FAILURE,
  ADD_OFFICE_SUCCESS,
  DELETE_OFFICE_SUCCESS
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  offices: [],
  error: null,
};

const officeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_OFFICES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_OFFICES_SUCCESS:
      return { ...state, loading: false, offices: action.payload };
    case FETCH_OFFICES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_OFFICE_SUCCESS:
        return {
            ...state,
            offices: [...state.offices, action.payload],
            error: null,
        };
    case DELETE_OFFICE_SUCCESS:
        return {
            ...state,
            offices: state.offices.filter(office => office.name !== action.payload),
            error: null,
        };      
    default:
      return state;
  }
};

export default officeReducer;
