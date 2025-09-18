// Elements
const currentCostInput = document.getElementById("currentCost");
const savingsPercentInput = document.getElementById("savingsPercent");
const calcBtn = document.getElementById("calcBtn");
const clearBtn = document.getElementById("clearBtn");
const errorDiv = document.getElementById("error");
const monthlyEl = document.getElementById("monthlySavings");
const yearlyEl = document.getElementById("yearlySavings");
const summaryKpi = document.getElementById("summaryKpi");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

// Helpers
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(value);
}

function parseNumber(input) {
  if (!input) return NaN;
  return parseFloat(input.replace(/[^0-9.]/g, ""));
}

function showError(msg) {
  errorDiv.textContent = msg;
  errorDiv.classList.add("show");
  resultsEl.classList.remove("show");
}

function clearError() {
  errorDiv.textContent = "";
  errorDiv.classList.remove("show");
}

// Main calculation
function calculate() {
  clearError();

  const cost = parseNumber(currentCostInput.value);
  const percent = parseNumber(savingsPercentInput.value);

  if (isNaN(cost) || cost <= 0) {
    showError("Please enter a valid monthly cost greater than 0.");
    return;
  }

  if (isNaN(percent) || percent < 0 || percent > 100) {
    showError("Please enter a valid savings percentage (0–100).");
    return;
  }

  const monthly = (cost * percent) / 100;
  const yearly = monthly * 12;

  monthlyEl.textContent = formatCurrency(monthly);
  yearlyEl.textContent = formatCurrency(yearly);

  summaryKpi.textContent = `You could save ${formatCurrency(yearly)} per year.`;

  statusEl.textContent = "Calculation updated.";
  resultsEl.classList.add("show");
}

// Clear inputs/results
function clearAll() {
  currentCostInput.value = "";
  savingsPercentInput.value = "";
  monthlyEl.textContent = "$0.00";
  yearlyEl.textContent = "$0.00";
  summaryKpi.textContent = "—";
  clearError();
  statusEl.textContent = "Inputs cleared.";
  resultsEl.classList.remove("show");
}

// Events
calcBtn.addEventListener("click", calculate);
clearBtn.addEventListener("click", clearAll);

[currentCostInput, savingsPercentInput].forEach((el) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      calculate();
    }
  });
});