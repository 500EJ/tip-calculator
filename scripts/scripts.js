const billField = document.querySelector(".bill");
const customPercentage = document.querySelector(".custom-percentage");
const peopleField = document.querySelector(".people");
const percentageButtons = document.querySelectorAll(".percentage-button");
const resetButton = document.querySelector(".reset");

billField.addEventListener("input", (event) => {
  updateBill(Number(billField.value));
});

peopleField.addEventListener("input", (event) => {
  updatePeople(Number(peopleField.value));
});

customPercentage.addEventListener("input", (event) => {
  percentageButtons.forEach((button) => {
    button.classList.remove("selected");
  });
  if (customPercentage.value && !isNaN(customPercentage.value)) {
    percentage = Number(0.01 * customPercentage.value);
  } else {
    percentage = null;
  }
  calculatePrices();
});

const reset = () => {
  billField.value = "";
  updateBill(null);
  percentageButtons.forEach((button) => button.classList.remove("selected"));
  customPercentage.value = "";
  percentage = null;
  peopleField.value = "";
  updatePeople(null);
};

let bill = null;
let people = null;
let percentage = null;

const updateBill = (newBill) => {
  bill =
    newBill && !isNaN(newBill) && newBill <= Number.MAX_SAFE_INTEGER
      ? newBill.toFixed(2)
      : null;
  calculatePrices();
};

const updatePeople = (numPeople) => {
  people =
    numPeople && !isNaN(numPeople) && numPeople <= Number.MAX_SAFE_INTEGER
      ? numPeople
      : null;
  calculatePrices();
};

const updatePercentage = (decimalPercent, percent) => {
  percentage = decimalPercent;
  customPercentage.value = "";
  percentageButtons.forEach((button) => {
    if (button.innerText === percent) {
      button.classList.toggle("selected");
      button.classList[1] === "selected"
        ? (percentage = decimalPercent)
        : (percentage = null);
    } else {
      button.classList.remove("selected");
    }
  });
  calculatePrices();
};

const calculatePrices = () => {
  const tipPrice = document.querySelector(".tip-price");
  const totalPrice = document.querySelector(".total-price");
  if (bill && people && percentage) {
    const tipPerPerson = (bill * percentage) / people;
    tipPrice.innerText = "$" + tipPerPerson.toFixed(2);
    totalPrice.innerText = "$" + (bill / people + tipPerPerson).toFixed(2);
  } else {
    tipPrice.innerText = "$0.00";
    totalPrice.innerText = "$0.00";
  }
};
