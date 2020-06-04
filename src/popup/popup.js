import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Store } from "webext-redux";
import { useForm } from "react-hook-form";
import io from "socket.io-client";

import LogIn from "./LogIn";

const getFormValues = event =>
  Array.from(event.target.elements)
    .filter(el => el.name)
    .reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});

const SignUp = () => {

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => console.log(data);

  //  const handleSubmit = event => {
  //    event.preventDefault();
  //    const socket = io(process.env.HOST);
  //    socket
  //      .emit('signup', JSON.stringify( getFormValues(event) ))
  //      .on('token', token => browser.storage.local.set({token}));
  //  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <label htmlFor="email">Email:</label><br />
      <input type="email" id="email" name="email" /><br />
      <label htmlFor="password">Password:</label><br />
      <input type="password" id="password" name="password" /><br /><br />
      <button>Sign Up!</button>
    </form>
  );
};

const AddWord = () => {
  const handleSubmit = event => {
    event.preventDefault();
    browser.runtime.sendMessage({ word: getFormValues(event) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="word">Word:</label><br />
      <input required type="text" id="word" name="word" /><br />
      <label htmlFor="meaning">Meaning:</label><br />
      <input required type="meaning" id="meaning" name="meaning" /><br /><br />
      <label htmlFor="example">Example:</label><br />
      <input required type="example" id="example" name="example" /><br /><br />
      <button>Add!</button>
    </form>
  );
};

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
