import React from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";

function SignUp () {
  const { register, handleSubmit } = useForm();

  const onSubmit = event => {
    const socket = io(process.env.HOST);
    socket.emit("signup", JSON.stringify( getFormValues(event) ));
    socket.on("token", token => browser.storage.local.set({ token }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email:</label><br />
      <input required type="email" id="email" name="email" ref={register} /><br />
      <label htmlFor="password">Password:</label><br />
      <input required type="password" id="password" name="password" ref={register} /><br /><br />
      <button>Sign Up!</button>
    </form>
  );
};

export default SignUp;
