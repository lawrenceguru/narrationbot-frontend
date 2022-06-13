import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import directories from "./directories";

export default combineReducers({
  auth,
  message,
  directories
});
