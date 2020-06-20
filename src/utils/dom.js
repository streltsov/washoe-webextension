import { NOTIFICATION_SHADOW_DOM_ID, WORD_REMINDER_SHADOW_DOM_ID } from "../constants";

// IO => Boolean
export const isNotificationOnPage = () =>
  Boolean(document.getElementById(NOTIFICATION_SHADOW_DOM_ID));

export const removeNotification = () =>
  document.getElementById(NOTIFICATION_SHADOW_DOM_ID).remove();

export const removeWordReminder = () =>
  document.getElementById(WORD_REMINDER_SHADOW_DOM_ID).remove();

// String -> Node -> Node
export const createShadowDom = shadowHostId => children => {
  const shadowHost = document.createElement("div");
  shadowHost.id = shadowHostId;
  const shadowRoot = shadowHost.attachShadow({ mode: "open" });
  shadowRoot.appendChild(children);
  return shadowHost;
};

