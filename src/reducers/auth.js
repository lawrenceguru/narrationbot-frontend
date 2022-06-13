import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILD,
  UPDATE_USER,
  ADD_BALENCE,
} from "../actions/types";

// const user = JSON.parse(localStorage.getItem("user"));
const user = '';

const initialState = user
  ? {
      isLoggedIn: true,
      user,
      message: '',
    }
  : {
      isLoggedIn: false,
      user: null,
      message: '',
    };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case VERIFY_EMAIL_SUCCESS:
      return {
        ...state,
        message: payload
      };
    case VERIFY_EMAIL_FAILD:
      return {
        ...state,
        message: payload
      };
    case UPDATE_USER:
      return {
        ...state,
        user: payload
      }
    case ADD_BALENCE:
      return {
        ...state,
        user: {
          ...user,
          balence: payload.balence,
          id: payload.user_id
        }
      }
    default:
      return state;
  }
}
