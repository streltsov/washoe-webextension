import React, { useState } from "react";
import { compose, props } from "sanctuary";
import { Pane, Heading, TextInput, Button, Badge, Spinner } from "evergreen-ui";

function Login () {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);

  const getValue = props([ "target", "value" ]);

  const onSubmit = data => {
    setIsLoading(true);
    browser.runtime.sendMessage({ action: "login", data })
      .then(({ error, token }) => error ? setIsError(true) : browser.storage.local.set({ token }))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Pane margin={8} marginTop={16}>
        <Heading size={600}>Login</Heading>
      </Pane>

      { isError ? <Badge color="red">Wrong credentials, try again</Badge> : null }

      <Pane margin={8}>
        <TextInput
          required
          autoFocus
          width="100%"
          type="email"
          value={email}
          isInvalid={isError}
          placeholder="Email"
          onFocus={() => setIsError(false)}
          onChange={compose (setEmail) (getValue)} />
      </Pane>

      <Pane margin={8}>
        <TextInput
          required
          width="100%"
          type="password"
          value={password}
          isInvalid={isError}
          placeholder="Password"
          onFocus={() => setIsError(false)}
          onChange={compose (setPassword) (getValue)} />
      </Pane>

      <Pane margin={8} display="flex" flexDirection="row-reverse" >
        <Button onClick={() => onSubmit({ email, password })}>
          { isLoading ? <Spinner size={16} /> : "Login" }
        </Button>
      </Pane>
    </>
  );
};

export default Login;
