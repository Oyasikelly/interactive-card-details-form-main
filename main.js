const form = document.getElementById("card-form");
const completeState = document.querySelector(".complete-state");
const cardNumberDisplay = document.getElementById("card-number-display");
const cardholderNameDisplay = document.getElementById(
  "cardholder-name-display"
);
const expDateDisplay = document.getElementById("exp-date-display");

// Real-time updates
document.getElementById("cardholder-name").addEventListener("input", (e) => {
  cardholderNameDisplay.textContent =
    e.target.value.toUpperCase() || "JANE APPLESEED";
});

document.getElementById("card-number").addEventListener("input", (e) => {
  let value = e.target.value.replace(/\s/g, "");
  value = value.replace(/(\d{4})/g, "$1 ").trim();
  cardNumberDisplay.textContent = value || "0000 0000 0000 0000";
  e.target.value = value;
});

document.getElementById("cvc").addEventListener("input", (e) => {
  document.getElementById("cvc-display").textContent = e.target.value.padEnd(
    3,
    "0"
  );
});

document.getElementById("exp-mm").addEventListener("input", (e) => {
  expDateDisplay.textContent = `${e.target.value.padEnd(2, "0")}/${document
    .getElementById("exp-yy")
    .value.padEnd(2, "0")}`;
});

document.getElementById("exp-yy").addEventListener("input", (e) => {
  expDateDisplay.textContent = `${document
    .getElementById("exp-mm")
    .value.padEnd(2, "0")}/${e.target.value.padEnd(2, "0")}`;
});

// Form validation
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Clear previous errors
  document
    .querySelectorAll(".error-message")
    .forEach((el) => (el.style.display = "none"));
  document
    .querySelectorAll("input")
    .forEach((el) => el.classList.remove("error"));

  // Validate cardholder name
  const nameInput = document.getElementById("cardholder-name");
  if (!nameInput.value.trim()) {
    showError(nameInput, "Can't be blank");
    isValid = false;
  }

  // Validate card number
  const numberInput = document.getElementById("card-number");
  const cardNumber = numberInput.value.replace(/\s/g, "");
  if (!/^\d{16}$/.test(cardNumber)) {
    showError(numberInput, "Wrong format, numbers only");
    isValid = false;
  }

  // Validate expiration date
  const mmInput = document.getElementById("exp-mm");
  const yyInput = document.getElementById("exp-yy");
  if (!mmInput.value || !yyInput.value) {
    showError(mmInput.parentElement, "Can't be blank");
    isValid = false;
  }

  // Validate CVC
  const cvcInput = document.getElementById("cvc");
  if (!cvcInput.value || !/^\d{3}$/.test(cvcInput.value)) {
    showError(cvcInput, "Can't be blank");
    isValid = false;
  }

  if (isValid) {
    form.style.display = "none";
    completeState.style.display = "block";
  }
});

function showError(input, message) {
  input.classList.add("error");
  const errorMessage = input.parentElement.querySelector(".error-message");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

// Reset form
document.getElementById("continue-btn").addEventListener("click", () => {
  document.getElementById("cvc-display").textContent = "000";

  form.reset();
  form.style.display = "block";
  completeState.style.display = "none";
  cardNumberDisplay.textContent = "0000 0000 0000 0000";
  cardholderNameDisplay.textContent = "JANE APPLESEED";
  expDateDisplay.textContent = "09/26";
});
