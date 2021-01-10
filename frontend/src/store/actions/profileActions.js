import axios from "axios";
import {
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
} from "./actionTypes";

export const loadProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      "http://localhost:8000/api/v1/profile/user",
      config
    );

    if (res.data.error) {
      dispatch({
        type: LOAD_PROFILE_ERR,
      });
    } else {
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_ERR,
    });
  }
};

export const updateProfile = (group_name, phone, address, token) => async (
  dispatch
) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  const body = JSON.stringify({
    withCredentials: true,
    group_name,
    phone,
    address,
  });

  try {
    const res = await axios.put(
      "http://localhost:8000/api/v1/profile/update",
      body,
      config
    );

    if (res.data.profile && res.data.username) {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_PROFILE_ERR,
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERR,
    });
  }
};
