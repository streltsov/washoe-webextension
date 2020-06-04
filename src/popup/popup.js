import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Store } from "webext-redux";
import { useForm } from "react-hook-form";
import io from "socket.io-client";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddWord from "./AddWord";

const getFormValues = event =>
  Array.from(event.target.elements)
    .filter(el => el.name)
    .reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});

const App = () => {
  const { isLoggedIn } = useSelector(x => x);
  console.log({ isLoggedIn });

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
      <App/>
    </Provider>
    , document.getElementById("root"));
});
