const UPDATE_FIELD = "directIssue/updateField";
const RESET_FORM = "directIssue/resetForm";

const SUBMIT_START = "directIssue/submitStart";
const SUBMIT_SUCCESS = "directIssue/submitSuccess";
const SUBMIT_FAILURE = "directIssue/submitFailure";

const getTodayDateISO = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const initialState = {
  dateOfIssue: getTodayDateISO(),
  dateOfPurchased: getTodayDateISO(),
  item: "",
  category: "",
  subCategory: "",
  make: "",
  model: "",
  modelNo: "",
  serialNumber: "",
  qty: "",
  unit: "",
  fromChiefDistrictOrOther: "",
  indentNo: "",

  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // error message string if any
  successMessage: "", // success message string
};

export default function directIssueReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FIELD:
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case RESET_FORM:
      return {
        ...initialState,
        dateOfIssue: getTodayDateISO(),
        dateOfPurchased: getTodayDateISO(),
      };
    case SUBMIT_START:
      return {
        ...state,
        status: "loading",
        error: null,
        successMessage: "",
      };
    case SUBMIT_SUCCESS:
      return {
        ...state,
        status: "succeeded",
        error: null,
        successMessage: "Form submitted successfully!",
      };
    case SUBMIT_FAILURE:
      return {
        ...state,
        status: "failed",
        error: action.payload,
        successMessage: "",
      };
    default:
      return state;
  }
}

export const updateField = (field, value) => ({
  type: UPDATE_FIELD,
  payload: { field, value },
});

export const resetForm = () => ({
  type: RESET_FORM,
});

export const setInitialDates = () => (dispatch) => {
  const today = getTodayDateISO();
  dispatch(updateField("dateOfIssue", today));
  dispatch(updateField("dateOfPurchased", today));
};

export const submitDirectIssue = (formData) => async (dispatch) => {
  dispatch({ type: SUBMIT_START });
  try {
    // Replace with real API endpoint
    const response = await fetch("/api/direct-issue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to submit form");
    }

    // If success:
    dispatch({ type: SUBMIT_SUCCESS });
    dispatch(resetForm());
    dispatch(setInitialDates());
  } catch (error) {
    dispatch({ type: SUBMIT_FAILURE, payload: error.message });
  }
};
