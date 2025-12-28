import {
  FETCH_PENDING_USERS_REQUEST,
  FETCH_PENDING_USERS_SUCCESS,
  FETCH_PENDING_USERS_FAILURE,
  APPROVE_USER_REQUEST,
  APPROVE_USER_SUCCESS,
  APPROVE_USER_FAILURE,
  REJECT_USER_REQUEST,
  REJECT_USER_SUCCESS,
  REJECT_USER_FAILURE,
  FETCH_LOGS_REQUEST,
  FETCH_LOGS_SUCCESS,
  FETCH_LOGS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from "./actionTypes";

export const fetchPendingUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_PENDING_USERS_REQUEST });
    try {
      const response = await fetch(
        "/api/superadmin/pending-registrations"
      );
      const data = await response.json();
      dispatch({ type: FETCH_PENDING_USERS_SUCCESS, payload: data.data || [] });
    } catch (error) {
      dispatch({ type: FETCH_PENDING_USERS_FAILURE, payload: error.message });
    }
  };
};

export const approveUser = (id, role) => {
  return async (dispatch) => {
    dispatch({ type: APPROVE_USER_REQUEST });
    try {
      const response = await fetch(
        `/api/superadmin/approve/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        }
      );
      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: APPROVE_USER_FAILURE,
          payload: data.msg || "Approval failed",
        });
        return;
      }

      dispatch({ type: APPROVE_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: APPROVE_USER_FAILURE, payload: error.message });
    }
  };
};


export const rejectUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: REJECT_USER_REQUEST });
    try {
      await fetch(`/api/superadmin/reject/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: REJECT_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: REJECT_USER_FAILURE, payload: error.message });
    }
  };
};

export const fetchLogs = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOGS_REQUEST });
    try {
      const response = await fetch("/api/superadmin/logs");
      const data = await response.json();
      dispatch({ type: FETCH_LOGS_SUCCESS, payload: data.data.logs || [] });
    } catch (error) {
      dispatch({ type: FETCH_LOGS_FAILURE, payload: error.message });
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });
    try {
      const response = await fetch(
        "/api/superadmin/all-users"
      );
      const data = await response.json();
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data.data || [] });
    } catch (error) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });
    try {
      await fetch(`/api/superadmin/delete-user/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: DELETE_USER_SUCCESS, payload: id });
    } catch (error) {
      dispatch({ type: DELETE_USER_FAILURE, payload: error.message });
    }
  };
};


export const createUser = (pen, name, phone, password, role) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_USER_REQUEST });

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pen, name, phone, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({
          type: CREATE_USER_FAILURE,
          payload: data.msg || "User creation failed",
        });
        throw new Error(data.msg || "User creation failed");
      }

      dispatch({ type: CREATE_USER_SUCCESS, payload: data.data || [] });
      // Optionally, refresh users list:
      dispatch(fetchUsers());
      return data;
    } catch (error) {
      dispatch({
        type: "CREATE_USER_FAILURE",
        payload: error.message,
      });
      throw error;
    }
  };
};
