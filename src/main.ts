import "./style.css";

const title = document.createElement("h1");
title.textContent = "Incremental Game CMPM-121";

//counter
let counter: number = 0;
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `${counter} honeycombs`;

//button
const button = document.createElement("button");
button.textContent = "🐝";

//elements
document.body.appendChild(title);
document.body.appendChild(counterDisplay);
document.body.appendChild(button);

//Click
button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter} honeycombs`;
  console.log(`Button clicked! Total: ${counter}`);
});

//growth with requestAnimationFrame
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  counter += deltaTime * 1;
  counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;

  requestAnimationFrame(update);
}

requestAnimationFrame(update);
