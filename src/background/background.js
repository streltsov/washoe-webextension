import { sendMessageToActiveTab } from "../utils/webExtension";
import { INTERVALS } from "../constants";
import localforage from "localforage";

const showAddWordForm = _ =>
  sendMessageToActiveTab({ action: "showAddWordForm" });

const addWord = data =>
  localforage.setItem(data.word, { ...data, stage: 0, notifyOn: Date.now() + INTERVALS[0] })
    .then(_ => sendMessageToActiveTab({ action: "closeAddWordForm" }))
    .catch(error => console.error("addWord -> localforage.setItem: ", error));

const actions = {
  showAddWordForm,
  addWord
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));
