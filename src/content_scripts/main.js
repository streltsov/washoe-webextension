import React from "react";
import ReactDOM from "react-dom";
import AddWord from "./AddWordModal";

import { isNotificationOnPage, createShadowDom } from "../utils/dom";
import { NOTIFICATION_SHADOW_DOM_ID, INTERVALS } from "../constants";
import EnterWord from "./EnterWord";

const onShowWordModal = () => {
  console.log("Show add word modal");
  const washoePortal = document.createElement("div");
  washoePortal.id = "washoe-portal";
  document.body.appendChild(washoePortal);

  ReactDOM.render(<AddWord />, document.querySelector("#washoe-portal"));
};

const onNotification = data => {
  console.log("onNotification: ", data);
};


const actions = {
  "show add word modal": onShowWordModal,
  notification: onNotification
};

browser.runtime.onMessage.addListener(({ msg: { action, data } }) => actions[action](data));
