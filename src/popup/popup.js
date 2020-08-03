import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Pane, Menu } from "evergreen-ui";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddWord from "./AddWord";

const { Group, Item, Divider } = Menu;
const { sendMessage } = browser.runtime;

const PopupMenu = () => (
  <Menu>
    <Group>
      <Item onClick={() => (sendMessage({ action: "show add word modal" }), window.close())} icon="plus">Add word</Item>
    </Group>
    <Divider />
    <Group>
      <Item onClick={() => browser.storage.local.remove("token") } icon="log-out">Log out</Item>
    </Group>
  </Menu>
);

function Popup () {
  const [ isLoggedIn, setIsLoggedIn ] = useState(null);
  useEffect(() => {
    browser.storage.local.get("token").then(({ token }) => setIsLoggedIn(Boolean(token)));
    browser.storage.onChanged.addListener(({ token: { newValue } }) => setIsLoggedIn(Boolean(newValue)));
  }, []);

  if (isLoggedIn == null) return null;
  return (
    <Pane display="flex" flexDirection="column" width={320}>
      { Boolean(isLoggedIn) ? <PopupMenu /> : <LogIn /> }
    </Pane>
  );
};

ReactDOM.render(<Popup />, document.getElementById("root"));
