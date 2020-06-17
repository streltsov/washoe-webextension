import { NOTIFICATION_SHADOW_DOM_ID } from "../constants";

export const isElementOnPage = element =>
  Boolean(document.querySelector(element));

export const removeNotification = () =>
  document.querySelector(NOTIFICATION_SHADOW_DOM_ID).remove();

