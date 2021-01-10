import {
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
} from "../actions/actionTypes";

const initState = {
  group_name: "",
  phone: "",
  address: "",
  user_type: "",
};

const profileReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        group_name: payload.profile.group_name,
        phone: payload.profile.phone,
        address: payload.profile.address,
        user_type: payload.profile.user_type,
      };
    case LOAD_PROFILE_ERR:
      return {
        ...state,
        group_name: "",
        phone: "",
        address: "",
        user_type: "",
      };
    case UPDATE_PROFILE_ERR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default profileReducer;
