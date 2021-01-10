import {
  SIGNIN_ERR,
  SIGNIN_SUCCESS,
  SIGNOUT_ERR,
  SIGNOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERR,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_ERR,
} from "../actions/actionTypes";

const initState = {
  isAuthenticated: null
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch(type) {
      case AUTHENTICATED_SUCCESS:
      case AUTHENTICATED_ERR:
          return {
              ...state,
              isAuthenticated: payload
          }
      case SIGNUP_SUCCESS:
          return {
              ...state,
              isAuthenticated: false
          }
      case SIGNIN_SUCCESS:
          return {
              ...state,
              isAuthenticated: true
          }
      case SIGNOUT_SUCCESS:
          return {
              ...state,
              isAuthenticated: false
          }
      case SIGNUP_ERR:
      case SIGNIN_ERR:
      case SIGNOUT_ERR:
          return state
      default:
          return state
  };
};

export default authReducer;
