import React, { useState } from "react";
import io from "socket.io-client";
import { compose, props } from "sanctuary";
import { Pane, Heading, TextInput, Button } from "evergreen-ui";

function Login () {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const getValue = props([ "target", "value" ]);

  const onSubmit = data => browser.runtime.sendMessage({ action: "login", data });

  return (
    <Pane padding={8} display="flex" flexDirection="column" width={320}>

      <Pane margin={8}>
        <Heading size={600}>Login</Heading>
      </Pane>

      <Pane margin={8}>
        <TextInput
          required
          width="100%"
          type="email"
          value={email}
          placeholder="Email"
          onChange={compose (setEmail) (getValue)} />
      </Pane>

      <Pane margin={8}>
        <TextInput
          required
          width="100%"
          type="password"
          value={password}
          placeholder="Password"
          onChange={compose (setPassword) (getValue)} />
      </Pane>

      <Pane margin={8} display="flex" flexDirection="row-reverse" >
        <Button onClick={() => onSubmit({ email, password })}>
          Login
        </Button>
      </Pane>

    </Pane>
  );
};

export default Login;
