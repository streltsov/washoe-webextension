import { INTERVALS, NOTIFICATION_CLASS_NAME, NOTIFICATION_HIDE_TIME } from "../../constants";

const hideAndDestroy = notification => {
  notification.classList.add("hide");
  setTimeout(() => notification.remove(), NOTIFICATION_HIDE_TIME * 1000);
};

const onError = input => {
  input.classList.add("error");

  const clearError = event => {
    input.classList.remove("error");
    input.removeEventListener("input", clearError);
  };
  input.addEventListener("input", clearError);
};

function EnterWord (resolve) {
  return function (word) {
    const Notification = document.createElement("div");
    Notification.className = NOTIFICATION_CLASS_NAME;

    // Styles
    const style = document.createElement("style");
    style.textContent = styles();
    Notification.appendChild(style);

    // Meaning
    const span = document.createElement("span");
    span.textContent = word.meaning;
    span.className = "meaning";
    Notification.appendChild(span);

    // Input
    let attemptsNumber = 0;
    const input = document.createElement("input");
    input.addEventListener("keydown", event => {
      event.stopPropagation();
      if ( event.keyCode == 13) {
        if ( event.target.value.toLowerCase().trim() == word.word.toLowerCase().trim() ) {
          resolve({ type: "stageup", ...word, notifyIn: INTERVALS[ word.stage + 1 ] });
          hideAndDestroy(Notification);
        } else if (attemptsNumber == 2) {
          resolve({ type: "reset", ...word, notifyIn: INTERVALS[0] });
          hideAndDestroy(Notification);
          console.info(JSON.stringify(word, 0, 2));
        } else {
          attemptsNumber = attemptsNumber + 1;
          onError(input);
        }
      }
    });
    setTimeout(() => input.focus(), 0);
    Notification.appendChild(input);

    // Button
    const button = document.createElement("button");
    button.addEventListener("click", () => {
      resolve({ type: "reset", ...word, notifyIn: INTERVALS[0] });
      console.info(JSON.stringify(word, 0, 2));
      hideAndDestroy(Notification);
    });
    button.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"rgba(249, 249, 250, .8)\" d=\"M6.854 10.854l2-2A.5.5 0 0 0 9 8.5v-4a.5.5 0 0 0-1 0v3.793l-1.854 1.853a.5.5 0 1 0 .707.707zM8 0a8.011 8.011 0 0 0-7 4.184V1.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H2.344a.938.938 0 0 0 .056-.085 6 6 0 1 1 0 4.184 1 1 0 0 0-1.873.7A7.991 7.991 0 1 0 8 0z\"></path></svg>";
    Notification.appendChild(button);

    return Notification;
  };
};

function styles () {
  return `
.${NOTIFICATION_CLASS_NAME} {
  position: fixed;
  bottom: 8px;
  right: 8px;

  background-color: #2a2a2e;
  padding: 8px 12px;
  border-radius: 4px;
  z-index: 2147483647
}
.${NOTIFICATION_CLASS_NAME} {
  display: flex;
  align-items: center;
}

.${NOTIFICATION_CLASS_NAME} .meaning {
  font-family: sans-serif;
  color: #fff;
}

.${NOTIFICATION_CLASS_NAME} input {
  background-color: #38383d;
  border: 1px solid #5f5f63;
  color: #fff;
  padding: 8px;
  border-radius: 3px;
  margin: 0 8px;
}

.${NOTIFICATION_CLASS_NAME} button {
  all: unset;
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.${NOTIFICATION_CLASS_NAME} input:focus,
.${NOTIFICATION_CLASS_NAME} button:focus {
  border: 1px solid #0a84ff;
  box-shadow: 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3);
}

.${NOTIFICATION_CLASS_NAME} input.error {
  border: 1px solid #d70022;
  box-shadow: 0 0 0 1px #d70022, 0 0 0 4px rgba(251, 0, 34, 0.3);
}

.${NOTIFICATION_CLASS_NAME}.hide {
  animation-name: hide;
  animation-duration: ${NOTIFICATION_HIDE_TIME}s;
  animation-fill-mode: forwards;
}

@keyframes hide {
  0% { bottom: 8px; }
  25% { bottom: 24px; }
  100% { bottom: -72px; }
}`;
}

export default EnterWord;
