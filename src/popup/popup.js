import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Store } from "webext-redux";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddWord from "./AddWord";

function Popup () {
  const { isLoggedIn } = useSelector(x => x);

  return (
    <div>
      <button onClick={() => setState("signup")}>Sign Up</button>
      <button onClick={() => setState("login")}>Login</button>
      <button onClick={() => setState("add word")}>Add Word</button>
      { isLoggedIn ? <AddWord /> : <LogIn /> }
    </div>
  );

};

const store = new Store();

store.ready().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Popup />
    </Provider>
    , document.getElementById("root"));
});
