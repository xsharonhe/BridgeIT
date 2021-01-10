import { combineReducers } from "redux";
import profileReducer from "./profileReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

export default rootReducer;