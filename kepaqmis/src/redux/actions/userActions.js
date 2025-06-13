import {
  SUBMIT_SEND_REQUEST_REQUEST,
  SUBMIT_SEND_REQUEST_SUCCESS,
  SUBMIT_SEND_REQUEST_FAILURE
} from './actionTypes';

export const submitSendRequest = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SUBMIT_SEND_REQUEST_REQUEST });

    const response = await fetch('/api/users/send-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    // Check if response is JSON before parsing
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error('Server response was not JSON');
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    dispatch({
      type: SUBMIT_SEND_REQUEST_SUCCESS,
      payload: data
    });

    return data;

  } catch (error) {
    // Handle non-JSON responses and network errors
    const errorMessage = error.message === 'Route not found' 
      ? 'Server endpoint not found'
      : error.message;

    dispatch({
      type: SUBMIT_SEND_REQUEST_FAILURE,
      payload: errorMessage
    });

    throw new Error(errorMessage);
  }
};