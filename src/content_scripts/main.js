import EnterWord from "./EnterWord";
import { isElementOnPage } from "../utils/dom";
import { NOTIFICATION_CLASS_NAME, INTERVALS } from "../constants";

const removeNotificationContainer = () =>
  document.querySelector(NOTIFICATION_CLASS_NAME).remove();

browser.runtime.onMessage.addListener(request => {
  if (!isElementOnPage(NOTIFICATION_CLASS_NAME)) {
    return new Promise(resolve => {

      const word = JSON.parse(request);

      document.body.appendChild(
        createShadowDom("SHADOW") (
          EnterWord ( resolve ) ( word )
        )
      );

    });
  }
});
