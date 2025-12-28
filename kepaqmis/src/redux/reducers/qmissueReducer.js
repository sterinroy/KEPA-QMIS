import {
  FETCH_QM_ISSUE_ENTRIES_REQUEST,
  FETCH_QM_ISSUE_ENTRIES_SUCCESS,
  FETCH_QM_ISSUE_ENTRIES_FAILURE,
  APPROVE_ISSUE_ENTRY_REQUEST,
  APPROVE_ISSUE_ENTRY_SUCCESS,
  APPROVE_ISSUE_ENTRY_FAILURE,
  DELETE_ISSUE_ENTRY_REQUEST,
  DELETE_ISSUE_ENTRY_SUCCESS,
  DELETE_ISSUE_ENTRY_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  entries: [],
  error: null,
  approveLoading: false,
  approveError: null,
  deleteLoading: false,
  deleteError: null,
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
    case DELETE_ISSUE_ENTRY_REQUEST:
      return { ...state, deleteLoading: true, deleteError: null };
    case DELETE_ISSUE_ENTRY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
        entries: state.entries.filter((entry) => entry._id !== action.payload),
        deleteError: null,
      };
    case DELETE_ISSUE_ENTRY_FAILURE:
      return {
        ...state,
        deleteLoading: false,
        deleteError: action.payload,
      };
    default:
      return state;
  }
}

export default qmissueReducer;
