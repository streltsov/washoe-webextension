import { isNotificationOnPage, createShadowDom } from "../utils/dom";
import { NOTIFICATION_SHADOW_DOM_ID, INTERVALS } from "../constants";
import EnterWord from "./EnterWord";

const onShowWordModal = () => console.log("Show add word modal");

const actions = {
  "show add word modal": onShowWordModal
};

browser.runtime.onMessage.addListener(({ msg: { action } }) => actions[action]());

browser.runtime.onMessage.addListener(request => {
  if (!isNotificationOnPage()) {
    return new Promise( resolve => {
      const word = JSON.parse(request);

      document.body.appendChild (
        createShadowDom (NOTIFICATION_SHADOW_DOM_ID) (
          EnterWord (resolve) (word)
        )
      );

    });
  }
});
