import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  token: null,
  role: null,
  pen: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  registrationStatus: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true };
    case REGISTER_REQUEST:
      return { ...state, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        role: action.payload.role,
        pen: action.payload.pen,
        isAuthenticated: true,
        loading: false,
      };
    case LOGIN_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case REGISTER_FAILURE:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT:
      return initialState;
    case REGISTER_SUCCESS:
      return {
        ...state,
        registrationStatus: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

export default authReducer;
