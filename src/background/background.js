import { sendMessageToActiveTab } from "../utils/webExtension";
const io = require("socket.io-client");
import { store } from "./store";
const storage = browser.storage.local;

const onLogin = data => {
  const socket = io(process.env.HOST);
  socket.on("connect", () => socket.emit("login", JSON.stringify(data)));
  socket.on("token", token => browser.storage.local.set({ token }));
};

const onAddWord = data =>
  socket.emit("add word", JSON.stringify({ ...data, notifyIn: 12e4 }));

const onLogOut = () => browser.storage.local.remove("token");

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

// ON WORD
socket.on("word", word => {
  const onRespond = res => {
    res && socket.emit("notification-response", JSON.stringify(res));
  };
  getActiveTab()
    .then(res => res.length && sendMsgToTab(res[0].id)(word).then(onRespond));
});

const sendMsgToTab = tabId => msg => browser.tabs.sendMessage( tabId, msg);
const getActiveTab = () => browser.tabs.query({ currentWindow: true, active: true });
