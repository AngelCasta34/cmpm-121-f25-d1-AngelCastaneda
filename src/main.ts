/////////////////////////////////////
// IMPORTS AND SETUP
// Loads assets and stylesheet dependencies
/////////////////////////////////////
import beeImageUrl from "./bee.png";
import "./style.css";

/////////////////////////////////////
// DATA DEFINITIONS
// Defines interfaces, core variables, and upgrade configurations
/////////////////////////////////////

// Interface for upgrade data
interface Upgrade {
  label: string;
  description: string;
  cost: number;
  effect: number;
  owned: number;
  button?: HTMLButtonElement;
  status?: HTMLDivElement;
  descElement?: HTMLParagraphElement;
}

// Core game variables
let counter: number = 0;
let growthRate: number = 0;

// Upgrade configurations
const upgrades: Upgrade[] = [
  {
    label: "Forager Bee",
    description: "Basic worker that gathers nectar from nearby flowers.",
    cost: 10,
    effect: 0.1,
    owned: 0,
  },
  {
    label: "Honeycomb Farm",
    description: "Organized storage combs to multiply honey output.",
    cost: 100,
    effect: 2.0,
    owned: 0,
  },
  {
    label: "Royal Hive",
    description: "Central hive that commands all bees to work harder.",
    cost: 1000,
    effect: 50.0,
    owned: 0,
  },
  {
    label: "Wax Factory",
    description: "Processes excess nectar into wax for upgraded structures.",
    cost: 5000,
    effect: 120.0,
    owned: 0,
  },
  {
    label: "Honey Research Lab",
    description: "Bee scientists discover new ways to optimize honey flow.",
    cost: 20000,
    effect: 500.0,
    owned: 0,
  },
];

/////////////////////////////////////
// UI ELEMENT CREATION
// Builds title, counters, bee button, and shop layout
/////////////////////////////////////

// Title and subtitle
const title = document.createElement("h1");
title.textContent = " 🐝 The Bee Empire 🐝 ";

const subtitle = document.createElement("p");
subtitle.textContent = "Grow your buzzing hive gather nectar";

// Counter and growth display
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;

const rateDisplay = document.createElement("div");
rateDisplay.textContent = `Growth rate: ${
  growthRate.toFixed(2)
} honeycombs/sec`;

// Main clickable bee button
const clickButton = document.createElement("button");
const beeImage = document.createElement("img");
beeImage.src = beeImageUrl;
beeImage.alt = "Bee collecting nectar";
beeImage.classList.add("bee-icon");
clickButton.appendChild(beeImage);

// Shop container
const shopContainer = document.createElement("div");

// Upgrade button creation
upgrades.forEach((upgrade) => {
  const button = document.createElement("button");
  button.textContent =
    `🐝 Buy ${upgrade.label} 🐝 (${upgrade.cost} honeycombs)`;
  button.disabled = true;

  // Purchase logic
  button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.effect;
      upgrade.owned++;

      // Price increase after purchase
      const scale = 1.15;
      upgrade.cost = upgrade.cost * scale;
      updateDisplay();
    }
  });

  const status = document.createElement("div");
  status.textContent = `Owned: ${upgrade.owned}`;

  const desc = document.createElement("p");
  desc.textContent = upgrade.description;
  desc.classList.add("upgrade-description");

  upgrade.button = button;
  upgrade.status = status;
  upgrade.descElement = desc;

  shopContainer.appendChild(button);
  shopContainer.appendChild(status);
  shopContainer.appendChild(desc);
});

/////////////////////////////////////
// PAGE ASSEMBLY
// Adds all UI elements to the document
/////////////////////////////////////
document.body.appendChild(title);
document.body.appendChild(subtitle);
document.body.appendChild(counterDisplay);
document.body.appendChild(rateDisplay);
document.body.appendChild(clickButton);
document.body.appendChild(shopContainer);

/////////////////////////////////////
// EVENT LISTENERS AND GAME LOGIC
// Handles click actions and updates displays
/////////////////////////////////////
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

/////////////////////////////////////
// ANIMATION AND UPDATE LOOP
// Manages continuous honey growth and display refresh
/////////////////////////////////////
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  counter += deltaTime * growthRate;
  updateDisplay();
  requestAnimationFrame(update);
}

function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;
  rateDisplay.textContent = `Growth rate: ${
    growthRate.toFixed(2)
  } honeycombs/sec`;

  upgrades.forEach((upgrade) => {
    if (upgrade.button && upgrade.status) {
      upgrade.button.disabled = counter < upgrade.cost;
      upgrade.button.textContent = `🐝 Buy ${upgrade.label} 🐝 (${
        upgrade.cost.toFixed(
          2,
        )
      } honeycombs)`;
      upgrade.status.textContent = `Owned: ${upgrade.owned}`;
    }
  });
}

requestAnimationFrame(update);
