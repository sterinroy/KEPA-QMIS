import {
  FETCH_QM_ISSUE_ENTRIES_REQUEST,
  FETCH_QM_ISSUE_ENTRIES_SUCCESS,
  FETCH_QM_ISSUE_ENTRIES_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  entries: [],
  error: null,
};

function qmissueReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QM_ISSUE_ENTRIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_QM_ISSUE_ENTRIES_SUCCESS:
      return { ...state, loading: false, entries: action.payload, error: null };
    case FETCH_QM_ISSUE_ENTRIES_FAILURE:
      return { ...state, loading: false, entries: [], error: action.payload };
    default:
      return state;
  }
}

export default qmissueReducer;
