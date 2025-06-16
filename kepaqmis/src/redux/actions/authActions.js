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
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pen, password }),
      });

      const data = await response.json();
      console.log("Login response data:", data);

      if (!response.ok) {
        dispatch({ type: LOGIN_FAILURE, payload: data.msg || "Login failed" });
        return;
      }

      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("pen", data.pen);
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch({ type: LOGOUT });
      return;
    }

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Logout logging failed:", error);
    }

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("pen");

    dispatch({ type:  LOGOUT });
  };
};



export const register = (pen, name, phone, password, role) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pen, name, phone, password, role }),
      });

      const data = await response.json();
      // console.log("hiii");


      if (!response.ok) {
        dispatch({ type: REGISTER_FAILURE, payload: data.msg || "Registration failed" });
        throw new Error(data.msg || "User creation failed");
      }

      dispatch({ type: REGISTER_SUCCESS, payload: data });
      // dispatch(fetchUsers());
      // return data;
    } catch (error) {
      dispatch({ type: REGISTER_FAILURE, payload: error.message });
      throw error;
    }
  };
};