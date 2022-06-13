import { history } from '../helpers/history';
import { notificationAlert } from '../components/Customs/Toast'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAILD
  // VERIFIED_ERROR
} from "./types";

import AuthService from "../services/auth.service";
import Api from '../ApiConfig'
import { notification } from 'antd'

const openNotification = (val) => {
  notification.open({
    message: 'Notification Title',
    description:
      val,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
};

export const register = (username, email, password) => (dispatch) => {
  return AuthService.register(username, email, password).then(
    (response) => {
      console.log('register response =>', response)
      dispatch({
        type: REGISTER_SUCCESS,
      });
      dispatch({
        type: SET_MESSAGE,
        payload: 'Sign Up: Please Verify your Email Address',
      });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // dispatch({
      //   type: REGISTER_FAIL,
      // });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });
      notificationAlert('error', message)
      return Promise.reject();
    }
  );
};

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      if (data.verified) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { user: data },
        });
        history.push("/dashboard");
        // window.location.reload();
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: 'Please Verify your Email Address',
        });
      }

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // dispatch({
      //   type: LOGIN_FAIL,
      // });

      // dispatch({
      //   type: SET_MESSAGE,
      //   payload: message,
      // });
      notificationAlert('error', message)
      return Promise.reject();
    }
  );
};

export const reLogin = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      if (data.verified) {
        // dispatch({
        //   type: LOGIN_SUCCESS,
        //   payload: { user: data },
        // });
        history.push("/home");
        // window.location.reload();
      } else {
        dispatch({
          type: SET_MESSAGE,
          payload: 'Please Verify your Email Address',
        });
      }

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};
export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({
    type: LOGOUT,
  });
};

export const verifyEmail = (token) => async (dispatch) => {
  try {
    let response = await Api.get(`/verify-email/${token}`);
    if (response.data.success) {
      // response.data.data.access_token = response.data.access_token
      localStorage.setItem("user", JSON.stringify({access_token: response.data.access_token}));
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: response.data.data },
      });
      dispatch({
        type: VERIFY_EMAIL_SUCCESS,
        payload: response.data.message
      })
      setTimeout(timeFun, 2000)
      function timeFun() {
        history.push("/pre-dashboard")
      }
    } else {
      dispatch({
        type: VERIFY_EMAIL_FAILD,
        payload: response.data.message
      })
    }
  } catch (error) {
    console.log('catch error: ', error);
  }
};

export const sendEmail = (email) => async (dispatch) => {
  try {
    let response = await Api.post(`/send-email`, { email });
    return response
  } catch (error) {
    console.log('catch error: ', error);
  }
};

export const changePassword = (password, token) => async (dispatch) => {
  try {
    let response = await Api.post(`/change-pass`, { password, token });
    if (response.data.success) {
      openNotification(response.data.message)
      history.push("/login");
    } else {
      openNotification(response.data.message)
    }
  } catch (error) {
    console.log('catch error: ', error);
  }
};