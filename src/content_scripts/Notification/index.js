function Notification (children) {
  const Notification = document.createElement("div");
  Notification.id = "washoe-notification";
  Notification.append(children);
  return Notification;
};

export default Notification;
