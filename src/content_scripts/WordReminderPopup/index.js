import { removeWordReminder } from "../../utils/dom";
const hideAndDestroy = popup => {
  popup.classList.add("hide-popup");
  setTimeout(() => removeWordReminder, 2000);
};

function WordReminder (wordData) {
  const { word, meaning, example } = wordData;

  const WordReminderPopup = document.createElement("div");
  WordReminderPopup.className = "word-reminder-popup";

  // Styles
  const style = document.createElement("style");
  style.textContent = styles();
  WordReminderPopup.appendChild(style);

  // Button
  const button = document.createElement("button");
  button.className = "cross";
  button.addEventListener("click", () => hideAndDestroy(WordReminderPopup));
  button.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"rgba(249, 249, 250, .8)\" d=\"M9.061 8l3.47-3.47a.75.75 0 0 0-1.061-1.06L8 6.939 4.53 3.47a.75.75 0 1 0-1.06 1.06L6.939 8 3.47 11.47a.75.75 0 1 0 1.06 1.06L8 9.061l3.47 3.47a.75.75 0 0 0 1.06-1.061z\"></path></svg>";
  WordReminderPopup.appendChild(button);

  const wordSpan = document.createElement("span");
  wordSpan.className = "word";
  wordSpan.textContent = word;
  WordReminderPopup.appendChild(wordSpan);

  const meaningSpan = document.createElement("span");
  meaningSpan.className = "meaning";
  meaningSpan.textContent = meaning;
  WordReminderPopup.appendChild(meaningSpan);

  if (example) {
    const exampleSpan = document.createElement("span");
    exampleSpan.className = "example";
    exampleSpan.textContent = example;
    WordReminderPopup.appendChild(exampleSpan);
  }

  return WordReminderPopup;
}

export default WordReminder;

function styles () {
  return `
  .word-reminder-popup {
  position: fixed;
  width: 400px;
  background-color: #323234;
  border-radius: 4px;
  color: #fff;
  padding: 16px;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  z-index: 2147483647
}

.cross {
  all: unset;
  position: absolute;
  right: 12px;
  top: 12px;
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.cross:hover {
  background-color: #666667;
}

.word {
  font-family: serif;
  font-size: 1.6em;
  margin-bottom: 24px;
}

.meaning {
  margin-bottom: 16px;
}

.example {
  font-style: italic;
}

.word-reminder-popup {
  animation-name: emerge;
  animation-duration: 1.4s;
  animation-fill-mode: forwards;
}

@keyframes emerge {
  0% {
    bottom: 80px;
    right: 8px;
    opacity: 0;
  }
  100% {
    bottom: 8px;
    right: 8px;
    opacity: 1;
  }
}
.hide-popup {
  animation-name: hide-popup;
  animation-duration: 1s;
  animation-fill-mode: forwards;
}

@keyframes hide-popup {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}`;
}
