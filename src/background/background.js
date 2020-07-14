const io = require("socket.io-client");
import { store } from "./store";

import { sendMessageToActiveTab } from "../utils/webExtension";

const storage = browser.storage.local;

const onLogin = data => {
  const socket = io(process.env.HOST);
  socket.on("connect", () => socket.emit("login", JSON.stringify(data)));
  socket.on("token", token => browser.storage.local.set({ token }));
};

const onAddWord = data =>
  socket.emit("add word", JSON.stringify({ ...data, notifyIn: 12e4 }));

const onLogOut = () => {
  console.log("onLogOut");
  browser.storage.local.remove("token").then(console.log);
};

const onShowAddWordModal = data =>
  sendMessageToActiveTab({ msg: { action: "show add word modal" } });

const actions = {
  login: onLogin,
  "show add word modal": onShowAddWordModal,
  "add word": onAddWord,
  logout: onLogOut
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));

const socket = io(process.env.HOST);

// CONNECT
socket.on("connect", () => {
  console.log("Connected, " + new Date());
  browser.storage.local.get("token").then(res => {
    if (res.hasOwnProperty("token")) socket.emit("authenticate", res);
  });
});

// AUTHENTICATION
socket.on("authenticated", () => {
  console.log("Authenticated!");
  store.dispatch({ type: "IS_LOGGED_IN", payload: true });
});

// UNAUTHORIZED
socket.on("unauthorized", msg => {
  console.count(`Unauthorized: ${JSON.stringify(msg.data)}`);
//  store.dispatch({ type: "IS_LOGGED_IN", payload: false });
});

// TOKEN CHANGE
browser.storage.onChanged.addListener( ({ token: { newValue } }) => {
  if (newValue) {
    socket.close().connect();
  } else {
    store.dispatch({ type: "IS_LOGGED_IN", payload: false });
    socket.close();
  }
});

// ON WORD
socket.on("word", word => {
  const onRespond = res => {
    res && socket.emit("notification-response", JSON.stringify(res));
  };
  getActiveTab()
    .then(res => res.length && sendMsgToTab(res[0].id)(word).then(onRespond));
})
  .on("disconnect", msg => {
    //    console.log("Disconnected, ", new Date());
    //    store.dispatch({ type: "IS_LOGGED_IN", payload: false });
  });

const sendMsgToTab = tabId => msg => browser.tabs.sendMessage( tabId, msg);
const getActiveTab = () => browser.tabs.query({ currentWindow: true, active: true });
