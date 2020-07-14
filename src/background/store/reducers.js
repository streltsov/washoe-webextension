import { combineReducers } from "redux";

const isLoggedIn = (state = false, action) =>
  action.type == "IS_LOGGED_IN" ? action.payload : state;

export const reducers = combineReducers({ isLoggedIn });


