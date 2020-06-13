import { NOTIFICATION_CLASS_NAME } from "../../constants";
import "./style.css";

function Notification (children) {
  const Notification = document.createElement("div");
  Notification.className = NOTIFICATION_CLASS_NAME;
  Notification.append(children);
  return Notification;
};

export default Notification;
