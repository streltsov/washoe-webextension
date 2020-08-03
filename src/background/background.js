import { post } from "./api";

const actions = {
  login: post("/login")
};

browser.runtime.onMessage.addListener(({ action, data }, _, sendResponse) => {
  actions[action](data).then(sendResponse);
  return true;
});
