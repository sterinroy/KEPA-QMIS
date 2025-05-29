import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "./actionTypes";

export const login = (pen, password) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pen, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({ type: LOGIN_FAILURE, payload: data.msg || "Login failed" });
        return;
      }

      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    dispatch({ type: LOGOUT });
  };
};

export const register = (pen, name, phone, password, role) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pen, name, phone, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        dispatch({ type: REGISTER_FAILURE, payload: data.msg || "Registration failed" });
        return;
      }

      dispatch({ type: REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
    }
  };
};