// actions/qmissueActions.js
import {
  FETCH_QM_ISSUE_ENTRIES_REQUEST,
  FETCH_QM_ISSUE_ENTRIES_SUCCESS,
  FETCH_QM_ISSUE_ENTRIES_FAILURE,
} from "../actions/actionTypes";

export const fetchQMIssueEntries = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_QM_ISSUE_ENTRIES_REQUEST });
    try {
      const response = await fetch("/api/stockRoutes/purchase/entries");

      const data = await response.json();
      console.log("QMIssue entries API response:", data);

      if (!response.ok) {
        dispatch({
          type: FETCH_QM_ISSUE_ENTRIES_FAILURE,
          payload: data.error || "Failed to fetch entries",
        });
        return;
      }

      dispatch({ type: FETCH_QM_ISSUE_ENTRIES_SUCCESS, payload: data });
    } catch (error) {
      console.error("Error fetching QMIssue entries:", error.message);
      dispatch({
        type: FETCH_QM_ISSUE_ENTRIES_FAILURE,
        payload: error.message,
      });
    }
  };
};
