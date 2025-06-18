import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY_SUCCESS,
  ADD_SUBCATEGORY_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  categories: [],
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_CATEGORY_SUCCESS:
    case ADD_SUBCATEGORY_SUCCESS:
      return state; 
    default:
      return state;
  }
};

export default categoryReducer;
