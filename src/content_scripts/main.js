import Notification from "./Notification";
import EnterWord from "./EnterWord";
import { isElementOnPage } from "../utils/dom";
import { NOTIFICATION_CLASS_NAME, INTERVALS } from "../constants";

// String -> Node -> Node
const createShadowDom = shadowHostId => children => {
  const shadowHost = document.createElement("div");
  shadowHost.id = shadowHostId;
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });
  shadowRoot.appendChild(children);
  return shadowHost;
};

const removeNotificationContainer = () =>
  document.querySelector(NOTIFICATION_CLASS_NAME).remove();

browser.runtime.onMessage.addListener(request => {
  if (!isElementOnPage(NOTIFICATION_CLASS_NAME)) {
    return new Promise(resolve => {

      const word = JSON.parse(request);

      document.body.appendChild(
        createShadowDom("SHADOW")(
          Notification (
            EnterWord ( resolve ) ( word )
          )
        )
      );

    });
  }
});
