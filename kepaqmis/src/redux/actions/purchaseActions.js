import {
  FETCH_PURCHASES_REQUEST,
  FETCH_PURCHASES_SUCCESS,
  FETCH_PURCHASES_FAILURE,
  SUBMIT_PURCHASE_REQUEST,
  SUBMIT_PURCHASE_SUCCESS,
  SUBMIT_PURCHASE_FAILURE,
} from './actionTypes';


export const submitPurchaseStock = (payload) => async (dispatch) => {
  dispatch({ type: SUBMIT_PURCHASE_REQUEST });

  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/purchasestockdetailentry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    let data;
    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      throw new Error(text);
    }

    if (!res.ok) {
      throw new Error(data.message || 'Failed to submit');
    }

    dispatch({ type: SUBMIT_PURCHASE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: SUBMIT_PURCHASE_FAILURE, payload: err.message });
  }
};

export const fetchPurchases = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PURCHASES_REQUEST });
    try {
      const response = await fetch('http://localhost:3000/api/purchasestransfer');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch purchases');
      }

      dispatch({ type: FETCH_PURCHASES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_PURCHASES_FAILURE, payload: error.message });
    }
  };
};
