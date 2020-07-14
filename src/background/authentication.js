const io = require("socket.io-client");
const socket = io(process.env.HOST);
import { store } from "./store";

socket.on("connect", () => browser.storage.local.get("token").then(({ token }) => socket.emit("authenticate", { token })));

socket.on("authenticated", () => store.dispatch({ type: "IS_LOGGED_IN", payload: true }));

browser.storage.onChanged.addListener( ({ token: { newValue } }) => {
  if (newValue) {
    socket.close().connect();
  } else {
    store.dispatch({ type: "IS_LOGGED_IN", payload: false });
    socket.close();
  }
});
