function EnterWord () {
  const container = document.createElement("div");
  container.className = "enter-word";

  // Styles
  const style = document.createElement("style");
  style.textContent = styles();
  container.appendChild(style);

  // Meaning
  const span = document.createElement("span");
  span.className = "meaning";
  container.appendChild(span);

  // Input
  const input = document.createElement("input");
  container.appendChild(input);

  // Button
  const button = document.createElement("button");
  button.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 16 16\"><path fill=\"rgba(249, 249, 250, .8)\" d=\"M6.854 10.854l2-2A.5.5 0 0 0 9 8.5v-4a.5.5 0 0 0-1 0v3.793l-1.854 1.853a.5.5 0 1 0 .707.707zM8 0a8.011 8.011 0 0 0-7 4.184V1.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 0-1H2.344a.938.938 0 0 0 .056-.085 6 6 0 1 1 0 4.184 1 1 0 0 0-1.873.7A7.991 7.991 0 1 0 8 0z\"></path></svg>";
  container.appendChild(button);

  return container;
};

function styles () {
  return `
.enter-word {
  display: flex;
  align-items: center;
}

.enter-word .meaning {
  font-family: sans-serif;
  color: #fff;
}

.enter-word input {
  background-color: #38383d;
  border: 1px solid #5f5f63;
  color: #fff;
  padding: 8px;
  border-radius: 3px;
  margin: 0 8px;
}

.enter-word button {
  all: unset;
  width: 32px;
  height: 32px;
  display: flex;
  border-radius: 2px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.enter-word input:focus,
.enter-word button:focus {
  border: 1px solid #0a84ff;
  box-shadow: 0 0 0 1px #0a84ff, 0 0 0 4px rgba(10, 132, 255, 0.3);
}

`;
}

export default EnterWord;
