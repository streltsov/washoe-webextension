import React, { useState } from "react";
import ReactDOM from "react-dom";
import AddWord from "./AddWordModal";
import { Button, toaster } from "evergreen-ui";

import { isNotificationOnPage, createShadowDom } from "../utils/dom";
import { NOTIFICATION_SHADOW_DOM_ID, INTERVALS } from "../constants";
import EnterWord from "./EnterWord";

function Washoe () {
  const [ isDrawerOpen, setIsDrawerOpen ] = useState(false);
  const actions = {
    "show add word modal": () => setIsDrawerOpen(true),
    notification: word => toaster.notify(JSON.parse(word).meaning)
  };

  browser.runtime.onMessage.addListener(({ msg: { action, data } }) => actions[action](data));

  return (
    <>
      <AddWord isShown={isDrawerOpen} onCloseComplete={() => setIsDrawerOpen(false)} />
    </>
  );
};

const washoeRoot = document.createElement("div");
document.body.appendChild(washoeRoot);
ReactDOM.render(<Washoe />, washoeRoot);
