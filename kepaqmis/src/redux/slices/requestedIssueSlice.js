import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Constants for action types
export const UPDATE_FIELD = 'requestedIssue/updateField';
export const RESET_FORM = 'requestedIssue/resetForm';
export const SUBMIT_START = 'requestedIssue/submit/pending';
export const SUBMIT_SUCCESS = 'requestedIssue/submit/fulfilled';
export const SUBMIT_FAILURE = 'requestedIssue/submit/rejected';

const API_URL = '/api/requested-issues';

// ✅ Async Thunk for submission
export const submitRequestedIssue = createAsyncThunk(
  'requestedIssue/submit',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Submission failed');
    }
  }
);

// ✅ Initial state
const initialState = {
  formData: {
    qmSiNo: '',
    dateOfPurchased: '',
    item: '',
    category: '',
    subCategory: '',
    make: '',
    model: '',
    modelNo: '',
    productNo: '',
    qty: '',
    quantityUnit: '',
    purchaseOrderNo: '',
    reqNo: '',
    typeOfFund: '',
    amount: '',
    perishableType: 'non-perishable',
  },
  status: 'idle',
  error: null,
  successMessage: '',
};

// ✅ Slice
const requestedIssueSlice = createSlice({
  name: 'requestedIssue',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    resetForm: (state) => {
      state.formData = { ...initialState.formData };
      state.status = 'idle';
      state.error = null;
      state.successMessage = '';
    },
    setLoadingState: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRequestedIssue.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.successMessage = '';
      })
      .addCase(submitRequestedIssue.fulfilled, (state) => {
        state.status = 'succeeded';
        state.successMessage = 'Request submitted successfully!';
        state.formData = { ...initialState.formData };
      })
      .addCase(submitRequestedIssue.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

// ✅ Export actions and reducer
export const {
  updateField,
  resetForm,
  setLoadingState,
  setSuccessMessage,
} = requestedIssueSlice.actions;

export default requestedIssueSlice.reducer;
