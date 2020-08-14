import { sendMessageToActiveTab } from "../utils/webExtension";

const showAddWordForm = _ =>
  sendMessageToActiveTab({ action: "showAddWordForm" });

const addWord = wordData =>
  console.log(wordData);

const actions = {
  showAddWordForm,
  addWord
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));
