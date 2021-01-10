import axios from "axios";
import { loadProfile } from "./profileActions";
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERR,
  SIGNIN_SUCCESS,
  SIGNIN_ERR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERR,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_ERR,
} from "./actionTypes";

export const checkAuth = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8000/api/v1/accounts/auth",
      config
    );

    if (res.data.error || res.data.isAuthenticated === "error") {
      dispatch({
        type: AUTHENTICATED_ERR,
        payload: false,
      });
    } else if (res.data.isAuthenticated === "success") {
      dispatch({
        type: AUTHENTICATED_SUCCESS,
        payload: true,
      });
    } else {
      dispatch({
        type: AUTHENTICATED_ERR,
        payload: false,
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_ERR,
      payload: false,
    });
  }
};

export const signIn = (username, password, token) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  const body = JSON.stringify({ username, password });

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/accounts/signin",
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: SIGNIN_SUCCESS,
      });

      dispatch(loadProfile());
    } else {
      dispatch({
        type: SIGNIN_ERR,
      });
    }
  } catch (err) {
    dispatch({
      type: SIGNIN_ERR,
    });
  }
};

export const signUp = (
  username,
  password,
  verify_password,
  group_name,
  phone,
  address,
  user_type,
  token
) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  const body = JSON.stringify({
    username,
    password,
    verify_password,
    group_name,
    phone,
    address,
    user_type,
  });

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/accounts/signup",
      body,
      config
    );

    if (res.data.error) {
      dispatch({
        type: SIGNUP_ERR,
      });
    } else {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_ERR,
    });
  }
};

export const signOut = (token) => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
  });

  try {
    const res = await axios.post(
      "http://localhost:8000/api/v1/accounts/signout",
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: SIGNOUT_ERR,
      });
    }
  } catch (err) {
    dispatch({
      type: SIGNOUT_ERR,
    });
  }
};
