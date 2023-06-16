
const donutDisplay = document.getElementById('donut-display');
const clickerButton = document.getElementById('clicker-button');
const multiplierButton = document.getElementById('multiplier-button');
const resetButton = document.getElementById('reset-button');
const autoClickerButton = document.getElementById('auto-clicker-button');
const autoClickerCountDisplay = document.getElementById('auto-clicker-count');
const autoClickerClicksPerSecDisplay = document.getElementById('auto-clicker-clicks-per-sec');
const autoClickerCostDisplay = document.getElementById('auto-clicker-cost');
const autoClickerBoughtDisplay = document.getElementById('auto-clicker-bought');
const multiplierCountDisplay = document.getElementById('multiplier-count');


let donuts = 0;
let clickMultiplier = 1;
let autoClickerCost = 100;
let autoClickerInterval = null;
let autoClickerEnabled = false;
let autoClickerValue = 1;
let autoClickerPurchaseCount = 0;
let multiplierPurchaseCount = 0;


function updateDonutDisplay() {
  donutDisplay.textContent = donuts;
}


clickerButton.addEventListener('click', () => {
  donuts += clickMultiplier;
  updateDonutDisplay();
});


multiplierButton.addEventListener('click', () => {
  const cost = Math.floor(10 * Math.pow(1.1, clickMultiplier));
  if (donuts >= cost) {
    donuts -= cost;
    clickMultiplier++;
    multiplierPurchaseCount++;
    updateDonutDisplay();
    multiplierButton.textContent = `Buy Multiplier (Cost: ${Math.floor(10 * Math.pow(1.1, clickMultiplier))})`;
    updateMultiplierInfo();
  }
});


autoClickerButton.addEventListener('click', () => {
  if (donuts >= autoClickerCost) {
    donuts -= autoClickerCost;
    autoClickerEnabled = true;
    autoClickerButton.textContent = 'Auto Clicker (Active)';
    autoClickerButton.disabled = true;
    autoClickerInterval = setInterval(() => {
      donuts += autoClickerValue;
      updateDonutDisplay();
    }, 1000);

    autoClickerPurchaseCount++;
    autoClickerCost = Math.floor(100 * Math.pow(1.1, autoClickerPurchaseCount));

    updateAutoClickerInfo();
  }
});


resetButton.addEventListener('click', () => {
  clearInterval(autoClickerInterval);
  donuts = 0;
  clickMultiplier = 1;
  autoClickerEnabled = false;
  autoClickerCost = 100;
  autoClickerButton.textContent = `Auto Clicker (Cost: ${autoClickerCost})`;
  autoClickerButton.disabled = false;
  multiplierButton.textContent = `Buy Multiplier (Cost: 10)`;
  updateDonutDisplay();
  resetAutoClickerInfo();
  resetMultiplierInfo();
});


function increaseAutoClickerValue() {
  autoClickerValue += 1;
}


function updateAutoClickerInfo() {
  autoClickerCountDisplay.textContent = autoClickerPurchaseCount;
  autoClickerClicksPerSecDisplay.textContent = autoClickerPurchaseCount;
  autoClickerCostDisplay.textContent = autoClickerCost.toFixed(0);
  autoClickerBoughtDisplay.textContent = autoClickerPurchaseCount;
}


function resetAutoClickerInfo() {
  autoClickerPurchaseCount = 0;
  autoClickerValue = 1;
  updateAutoClickerInfo();
}


function updateMultiplierInfo() {
  multiplierCountDisplay.textContent = multiplierPurchaseCount;
}


function resetMultiplierInfo() {
  multiplierPurchaseCount = 0;
  updateMultiplierInfo();
}


updateAutoClickerInfo();
updateMultiplierInfo();


setInterval(increaseAutoClickerValue, 5000);