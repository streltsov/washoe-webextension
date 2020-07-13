import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { Pane, Menu } from "evergreen-ui";
import { Store } from "webext-redux";

import LogIn from "./LogIn";
import SignUp from "./SignUp";
import AddWord from "./AddWord";

const { Group, Item, Divider } = Menu;
const { sendMessage } = browser.runtime;

const PopupMenu = () => (
  <Menu>
    <Divider />
    <Group>
      <Item onClick={() => sendMessage({ action: "logout" })} icon="log-out">Log out</Item>
    </Group>
  </Menu>
);

function Popup () {
  const { isLoggedIn } = useSelector(x => x);

  return (
    <Pane padding={8} display="flex" flexDirection="column" width={320}>
      { Boolean(isLoggedIn) ? <PopupMenu /> : <LogIn /> }
    </Pane>
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

export default Popup;
