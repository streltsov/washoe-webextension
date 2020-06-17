import { NOTIFICATION_SHADOW_DOM_ID } from "../constants";

export const isElementOnPage = element =>
  Boolean(document.querySelector(element));

export const removeNotification = () =>
  document.querySelector(NOTIFICATION_SHADOW_DOM_ID).remove();

// String -> Node -> Node
export const createShadowDom = shadowHostId => children => {
  const shadowHost = document.createElement("div");
  shadowHost.id = shadowHostId;
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });
  shadowRoot.appendChild(children);
  return shadowHost;
};

