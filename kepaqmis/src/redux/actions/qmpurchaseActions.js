import {
  QMPURCHASE_SUBMIT_REQUEST,
  QMPURCHASE_SUBMIT_SUCCESS,
  QMPURCHASE_SUBMIT_FAILURE,
} from "./actionTypes";

export const submitQMPurchase = (purchaseData) => {
  return async (dispatch) => {
    dispatch({ type: QMPURCHASE_SUBMIT_REQUEST });
    console.log("Submitting QMPurchase data:", purchaseData);
    try {
      const response = await fetch("/api/stockRoutes/purchase/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "QMPurchase submission failed:",
          data.error || "Submission failed"
        );
        dispatch({
          type: QMPURCHASE_SUBMIT_FAILURE,
          payload: data.error || "Submission failed",
        });
        return;
      } 
      console.log("QMPurchase submission successful:", data);
      dispatch({ type: QMPURCHASE_SUBMIT_SUCCESS, payload: data });
    } catch (error) {
      console.error("QMPurchase submission failed with error:", error.message);
      dispatch({ type: QMPURCHASE_SUBMIT_FAILURE, payload: error.message });
    }
  };
};
