import { store } from "./store";
import { sendMessageToActiveTab } from "../utils/webExtension";
const io = require("socket.io-client");
const socket = io(process.env.HOST);

socket.on("connect", () => browser.storage.local.get("token").then(({ token }) => socket.emit("authenticate", { token })));
socket.on("authenticated", () => store.dispatch({ type: "IS_LOGGED_IN", payload: true }));
socket.on("word", word => sendMessageToActiveTab({ msg: { action: "notification", data: word } }));

browser.storage.onChanged.addListener( ({ token: { newValue } }) => {
  if (newValue) {
    socket.close().connect();
  } else {
    store.dispatch({ type: "IS_LOGGED_IN", payload: false });
    socket.close();
  }
});
