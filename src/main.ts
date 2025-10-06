import "./style.css";

const title = document.createElement("h1");
title.textContent = "Incremental Game CMPM-121";

const button = document.createElement("button");
button.textContent = "🐝";

document.body.appendChild(title);
document.body.appendChild(button);

button.addEventListener("click", () => {
  console.log("Button Clicked!");
});
