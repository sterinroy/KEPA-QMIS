import {
  FETCH_OFFICES_REQUEST,
  FETCH_OFFICES_SUCCESS,
  FETCH_OFFICES_FAILURE,
  ADD_OFFICE_SUCCESS,
  DELETE_OFFICE_SUCCESS,
} from "../actions/actionTypes";

export const fetchOffices = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_OFFICES_REQUEST });

    try {
      const response = await fetch("/api/officeRoutes/offices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch offices");
      }

      dispatch({ type: FETCH_OFFICES_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: FETCH_OFFICES_FAILURE, payload: error.message });
    }
  };
};

export const addOffice = (officeName) => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/officeRoutes/offices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ list: [officeName] }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to add office");
      }
        dispatch({ type: ADD_OFFICE_SUCCESS, payload: data[0] });


      dispatch(fetchOffices());
    } catch (error) {
        console.error("Error adding office:", error);
        dispatch({ type: FETCH_OFFICES_FAILURE, payload: error.message });
    }
  };
};

export const deleteOffice = (officeName) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`/api/officeRoutes/offices/${officeName}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete office");
      }
        dispatch({ type: DELETE_OFFICE_SUCCESS, payload: officeName });

      dispatch(fetchOffices());
    } catch (error) {
      console.error("Error deleting office:", error);
        dispatch({ type: FETCH_OFFICES_FAILURE, payload: error.message });
    }
  };
};
