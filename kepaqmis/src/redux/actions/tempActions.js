import {
  TEMP_STOCK_SUBMIT_REQUEST,
  TEMP_STOCK_SUBMIT_SUCCESS,
  TEMP_STOCK_SUBMIT_FAILURE,
  TEMP_STOCK_FETCH_REQUEST,
  TEMP_STOCK_FETCH_SUCCESS,
  TEMP_STOCK_FETCH_FAILURE
} from './actionTypes';

export const submitTempStock = (formData) => {
  return async (dispatch) => {
    dispatch({ type: TEMP_STOCK_SUBMIT_REQUEST });

    const payload = {
      slNo: formData.slNo,
      PENNo: formData.PENNo,
      toWhom: formData.toWhom,
      name: formData.name,
      mobile: formData.mobile,
      dateOfissue: formData.dateOfissue,
      amount: parseFloat(formData.amount),
      itemDescription: formData.itemDescription,
      purpose: formData.purpose,
      qty: parseInt(formData.qty, 10),
    };

    try {
      const response = await fetch('/api/tempstock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Submission failed');
      }

      dispatch({ type: TEMP_STOCK_SUBMIT_SUCCESS, payload: data.message });
      return data.message; // You can use this to navigate
    } catch (error) {
      dispatch({ type: TEMP_STOCK_SUBMIT_FAILURE, payload: error.message });
      throw error;
    }
  };
};
export const fetchTemphistory = () => {
  return async (dispatch) => {
    dispatch({ type: TEMP_STOCK_FETCH_REQUEST });
    try {
      const response = await fetch('/api/tempstock');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch issued temp stock');
      }

      dispatch({ type: TEMP_STOCK_FETCH_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: TEMP_STOCK_FETCH_FAILURE, payload: error.message });
    }
  };
};
export const fetchLatestTemphistory = () => {
  return async (dispatch) => {
    dispatch({ type: TEMP_STOCK_FETCH_REQUEST });
    try {
      const response = await fetch('/api/tempstock');
      const data = await response.json();

      if (!Array.isArray(data)) throw new Error('Invalid response');

      const latest = data[data.length - 1];
      dispatch({ type: TEMP_STOCK_FETCH_SUCCESS, payload: [latest] }); // store as array
    } catch (error) {
      dispatch({ type: TEMP_STOCK_FETCH_FAILURE, payload: error.message });
    }
  };
};