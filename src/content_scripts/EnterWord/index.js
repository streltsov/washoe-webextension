function EnterWord () {
  const container = document.createElement("div");
  container.className = "enter-word";

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

export default EnterWord;
