/////////////////////////////////////
// IMPORTS AND SETUP
// Loads assets and stylesheet dependencies
/////////////////////////////////////
import beeImageUrl from "./bee.png";
import "./style.css";

/////////////////////////////////////
// TITLE ELEMENT CREATION
// Creates the main heading and subtitle for the game UI
/////////////////////////////////////
const title = document.createElement("h1");
title.textContent = " 🐝 The Bee Empire 🐝 ";

const subtitle = document.createElement("p");
subtitle.textContent = "Grow your buzzing hive gather nectar";

/////////////////////////////////////
// UPGRADE INTERFACE DEFINITION
// Defines the data structure for each upgrade type
/////////////////////////////////////
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

/////////////////////////////////////
// CORE GAME VARIABLES
// Tracks honeycomb count and automatic growth rate
/////////////////////////////////////
let counter: number = 0;
let growthRate: number = 0;

/////////////////////////////////////
// DISPLAY ELEMENTS
// Shows the current honeycomb count and growth rate
/////////////////////////////////////
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;

const rateDisplay = document.createElement("div");
rateDisplay.textContent = `Growth rate: ${
  growthRate.toFixed(2)
} honeycombs/sec`;

/////////////////////////////////////
// MAIN CLICKABLE BEE BUTTON
// Player clicks this button to earn honeycombs manually
/////////////////////////////////////
const clickButton = document.createElement("button");
const beeImage = document.createElement("img");
beeImage.src = beeImageUrl;
beeImage.alt = "Bee collecting nectar";
beeImage.classList.add("bee-icon");
clickButton.appendChild(beeImage);

/////////////////////////////////////
// UPGRADE DATA SETUP
// Defines all available upgrades in the shop
/////////////////////////////////////
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
// SHOP CONTAINER CREATION
// Holds upgrade buttons, descriptions, and ownership counts
/////////////////////////////////////
const shopContainer = document.createElement("div");

/////////////////////////////////////
// UPGRADE BUTTON CREATION AND LOGIC
// Generates buttons for each upgrade and defines purchase behavior
/////////////////////////////////////
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

      console.log(
        `Purchased ${upgrade.label}! Growth rate is now ${
          growthRate.toFixed(
            2,
          )
        } honeycombs/sec.`,
      );
      updateDisplay();
    }
  });

  // Ownership and description display
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
// PAGE ELEMENT ASSEMBLY
// Adds all UI elements to the webpage in display order
/////////////////////////////////////
document.body.appendChild(title);
document.body.appendChild(subtitle);
document.body.appendChild(counterDisplay);
document.body.appendChild(rateDisplay);
document.body.appendChild(clickButton);
document.body.appendChild(shopContainer);

/////////////////////////////////////
// CLICK HANDLER
// Increases honeycomb count when player clicks the bee button
/////////////////////////////////////
clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

/////////////////////////////////////
// CONTINUOUS GROWTH SYSTEM
// Uses requestAnimationFrame to update automatic honey production
/////////////////////////////////////
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  counter += deltaTime * growthRate;
  updateDisplay();
  requestAnimationFrame(update);
}

/////////////////////////////////////
// DISPLAY UPDATE FUNCTION
// Refreshes honeycomb count, growth rate, and upgrade button states
/////////////////////////////////////
function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;
  rateDisplay.textContent = `Growth rate: ${
    growthRate.toFixed(
      2,
    )
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

/////////////////////////////////////
// GAME LOOP START
// Begins continuous animation and production tracking
/////////////////////////////////////
requestAnimationFrame(update);
