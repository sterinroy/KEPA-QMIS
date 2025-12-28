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
} from "../actions/actionTypes";

const initialState = {
  pendingUsers: [],
  logs: [],
  users: [],
  loading: false,
  error: null,
};

function superAdminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PENDING_USERS_REQUEST:
    case FETCH_LOGS_REQUEST:
    case FETCH_USERS_REQUEST:
    case APPROVE_USER_REQUEST:
    case REJECT_USER_REQUEST:
    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case CREATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_PENDING_USERS_SUCCESS:
      return { ...state, loading: false, pendingUsers: Array.isArray(action.payload) ? action.payload : [] };
    case CREATE_USER_SUCCESS:
      return { ...state, loading: false, error: null };
    case FETCH_LOGS_SUCCESS:
      return { ...state, loading: false, logs: Array.isArray(action.payload) ? action.payload : [] };

    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: Array.isArray(action.payload) ? action.payload : [] };

    case FETCH_PENDING_USERS_FAILURE:
    case FETCH_LOGS_FAILURE:
    case FETCH_USERS_FAILURE:
    case APPROVE_USER_FAILURE:
    case REJECT_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case CREATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case APPROVE_USER_SUCCESS:
    case REJECT_USER_SUCCESS:
      return {
        ...state,
        pendingUsers: state.pendingUsers.filter(
          (user) => user._id !== action.payload
        ),
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    default:
      return state;
  }
}
export default superAdminReducer;
