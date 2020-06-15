import { NOTIFICATION_CLASS_NAME } from "../../constants";

function Notification (children) {
  const Notification = document.createElement("div");
  Notification.className = NOTIFICATION_CLASS_NAME;

  // Styles
  const style = document.createElement("style");
  style.textContent = styles();
  Notification.append(style);

  Notification.append(children);
  return Notification;
};

function styles() {
  return `
    .washoe-notification {
      position: fixed;
      bottom: 8px;
      right: 8px;
    
      background-color: #2a2a2e;
      padding: 8px 12px;
      border-radius: 4px;
    }`
}

export default Notification;
