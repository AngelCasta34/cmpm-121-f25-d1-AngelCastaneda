import "./style.css";

const title = document.createElement("h1");
title.textContent = "Incremental Game CMPM-121";

//counter
let counter: number = 0;
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;

// Growth rate
let growthRate: number = 0;

//button
const clickButton = document.createElement("button");
clickButton.textContent = "🐝";

const upgradeButton = document.createElement("button");
upgradeButton.textContent = " 🐝 Buy Worker Bee 🐝 (10 honeycombs)";
upgradeButton.disabled = true;

//elements
document.body.appendChild(title);
document.body.appendChild(counterDisplay);
document.body.appendChild(clickButton);
document.body.appendChild(upgradeButton);

//Click
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

// Purchasing upgrade
upgradeButton.addEventListener("click", () => {
  if (counter >= 10) {
    counter -= 10;
    growthRate += 1;
    console.log(
      `Purchased upgrade! Growth rate is now ${growthRate} per second.`,
    );
    updateDisplay();
  }
});

//growth with requestAnimationFrame
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;

  // Increase counter
  counter += deltaTime * growthRate;

  // Update UI
  updateDisplay();

  requestAnimationFrame(update);
}

function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;
  upgradeButton.disabled = counter < 10;
}

requestAnimationFrame(update);
