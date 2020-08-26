import { sendMessageToActiveTab } from "../utils/webExtension";
import { INTERVALS } from "../constants";
import localforage from "localforage";
const { setItem } = localforage;

const incrementWordStage = ({ id }) => localforage.getItem(String(id))
  .then(({ stage, ...value }) => setItem(id, { ...value, stage: stage + 1, notifyOn: Date.now() + INTERVALS[stage + 1] }))
  .catch(console.error);

const resetWordStage = ({ id }) => localforage.getItem(String(id))
  .then(({ stage, ...value }) => setItem(id, { ...value, stage: 0, notifyOn: Date.now() + INTERVALS[0] }))
  .catch(console.error);

const showAddWordForm = _ =>
  sendMessageToActiveTab({ action: "showAddWordForm" });

const addWord = data => {
  const id = Date.now();
  setItem(String(id), { id, ...data, stage: 0, notifyOn: Date.now() + INTERVALS[0] })
    .then(_ => sendMessageToActiveTab({ action: "closeAddWordForm" }))
    .catch(error => console.error("addWord -> localforage.setItem: ", error));
};

const actions = {
  incrementWordStage,
  resetWordStage,
  showAddWordForm,
  addWord
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));
