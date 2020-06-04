import React from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

const Login = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = data => {
    const socket = io(process.env.HOST);
    socket.on("connect", () => socket.emit("login", JSON.stringify( data )));
    socket.on("token", token => browser.storage.local.set({ token }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email:</label><br />
      <input required type="email" id="email" name="email" ref={register} /><br />
      <label htmlFor="password">Password:</label><br />
      <input required type="password" id="password" name="password" ref={register} /><br /><br />
      <button>Login!</button>
    </form>
  );
};

export default Login;
