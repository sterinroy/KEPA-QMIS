// actions/qmissueActions.js
import {
  FETCH_QM_ISSUE_ENTRIES_REQUEST,
  FETCH_QM_ISSUE_ENTRIES_SUCCESS,
  FETCH_QM_ISSUE_ENTRIES_FAILURE,
  APPROVE_ISSUE_ENTRY_REQUEST,
  APPROVE_ISSUE_ENTRY_SUCCESS,
  APPROVE_ISSUE_ENTRY_FAILURE,
} from "../actions/actionTypes";

export const fetchQMIssueEntries = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_QM_ISSUE_ENTRIES_REQUEST });
    try {
      const response = await fetch("/api/stockRoutes/purchase/entries");

      const data = await response.json();
      console.log("QMIssue entries API response:", data.data);

      if (!response.ok) {
        dispatch({
          type: FETCH_QM_ISSUE_ENTRIES_FAILURE,
          payload: data.data.error || "Failed to fetch entries",
        });
        return;
      }

      dispatch({ type: FETCH_QM_ISSUE_ENTRIES_SUCCESS, payload: data.data || [] });
    } catch (error) {
      console.error("Error fetching QMIssue entries:", error.message);
      dispatch({
        type: FETCH_QM_ISSUE_ENTRIES_FAILURE,
        payload: error.message,
      });
    }
  };
};

export const approveIssueEntry = (id, issueData) => {
  return async (dispatch) => {
    dispatch({ type: APPROVE_ISSUE_ENTRY_REQUEST });
    try {
      const response = await fetch(`/api/stockRoutes/issue/approve/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data.issueData),
      });

      const data = await response.json();
      console.log("Approve issue entry API response:", data.data);

      if (!response.ok) {
        dispatch({
          type: APPROVE_ISSUE_ENTRY_FAILURE,
          payload: data.error || "Failed to approve entry",
        });
        return;
      }

      dispatch({ type: APPROVE_ISSUE_ENTRY_SUCCESS, payload: data.data });
    } catch (error) {
      console.error("Error approving issue entry:", error.message);
      dispatch({
        type: APPROVE_ISSUE_ENTRY_FAILURE,
        payload: error.message,
      });
    }
  };
};

