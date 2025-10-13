import beeImageUrl from "./bee.png";
import "./style.css";

//title
const title = document.createElement("h1");
title.textContent = " 🐝 The Bee Empire 🐝 ";

const subtitle = document.createElement("p");
subtitle.textContent = "Grow your buzzing hive gather nectar";

//upgrade type definition
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

//counter
let counter: number = 0;
const counterDisplay = document.createElement("div");
counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;

//growth rate
let growthRate: number = 0;
const rateDisplay = document.createElement("div");
rateDisplay.textContent = `Growth rate: ${
  growthRate.toFixed(2)
} honeycombs/sec`;

//click
const clickButton = document.createElement("button");
const beeImage = document.createElement("img");
beeImage.src = beeImageUrl;
beeImage.alt = "Bee collecting nectar";
beeImage.classList.add("bee-icon");
clickButton.appendChild(beeImage);

//upgrades
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

//shop container
const shopContainer = document.createElement("div");

//create upgrade buttons and ownership status
upgrades.forEach((upgrade) => {
  // Create button
  const button = document.createElement("button");
  button.textContent =
    `🐝 Buy ${upgrade.label} 🐝 (${upgrade.cost} honeycombs)`;
  button.disabled = true;

  //purchase logic
  button.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      counter -= upgrade.cost;
      growthRate += upgrade.effect;
      upgrade.owned++;

      //price increase after purchase
      const scale = 1.15;
      upgrade.cost = upgrade.cost * scale;

      console.log(
        `Purchased ${upgrade.label}! Growth rate is now ${
          growthRate.toFixed(2)
        } honeycombs/sec.`,
      );
      updateDisplay();
    }
  });

  //ownership display
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

//add elements to page
document.body.appendChild(title);
document.body.appendChild(subtitle);
document.body.appendChild(counterDisplay);
document.body.appendChild(rateDisplay);
document.body.appendChild(clickButton);
document.body.appendChild(shopContainer);

clickButton.addEventListener("click", () => {
  counter++;
  updateDisplay();
});

//continuous growth with requestAnimationFrame
let lastTime = performance.now();

function update(currentTime: number) {
  const deltaTime = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  counter += deltaTime * growthRate;
  updateDisplay();

  requestAnimationFrame(update);
}

//update UI and enable/disable upgrades
function updateDisplay() {
  counterDisplay.textContent = `${counter.toFixed(2)} honeycombs`;
  rateDisplay.textContent = `Growth rate: ${
    growthRate.toFixed(2)
  } honeycombs/sec`;

  upgrades.forEach((upgrade) => {
    if (upgrade.button && upgrade.status) {
      upgrade.button.disabled = counter < upgrade.cost;
      upgrade.button.textContent = `🐝 Buy ${upgrade.label} 🐝 (${
        upgrade.cost.toFixed(2)
      } honeycombs)`;
      upgrade.status.textContent = `Owned: ${upgrade.owned}`;
    }
  });
}

// Start animation
requestAnimationFrame(update);
