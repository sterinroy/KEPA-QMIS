import {
  FETCH_QM_ISSUE_ENTRIES_REQUEST,
  FETCH_QM_ISSUE_ENTRIES_SUCCESS,
  FETCH_QM_ISSUE_ENTRIES_FAILURE,
  APPROVE_ISSUE_ENTRY_REQUEST,
  APPROVE_ISSUE_ENTRY_SUCCESS,
  APPROVE_ISSUE_ENTRY_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  entries: [],
  error: null,
  approveLoading: false,
  approveError: null,
};

function qmissueReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QM_ISSUE_ENTRIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_QM_ISSUE_ENTRIES_SUCCESS:
      return { ...state, loading: false, entries: action.payload, error: null };
    case FETCH_QM_ISSUE_ENTRIES_FAILURE:
      return { ...state, loading: false, entries: [], error: action.payload };
    case APPROVE_ISSUE_ENTRY_REQUEST:
      return { ...state, approveLoading: true, approveError: null };
    case APPROVE_ISSUE_ENTRY_SUCCESS:
      return {
        ...state,
        approveLoading: false,
        entries: state.entries.map((entry) =>
          entry._id === action.payload.stockItem.purchaseEntryId
            ? { ...entry, status: "Verified" }
            : entry
        ),
        approveError: null,
      };
    case APPROVE_ISSUE_ENTRY_FAILURE:
      return {
        ...state,
        approveLoading: false,
        approveError: action.payload,
      };
    default:
      return state;
  }
}

export default qmissueReducer;
