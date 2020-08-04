import { sendMessageToActiveTab } from "../utils/webExtension";

const showAddWordForm = _ => {
  console.log("Helluva");
  sendMessageToActiveTab({ action: "showAddWordForm" });
};

const actions = {
  showAddWordForm
};

browser.runtime.onMessage.addListener(({ action, data }) => actions[action](data));
