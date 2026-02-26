const previousDisplay = document.getElementById("previous");
const currentDisplay = document.getElementById("current");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

let current = "0";
let previous = "";
let operator = null;

// Update display
function updateDisplay() {
    currentDisplay.textContent = current;
    previousDisplay.textContent = previous + (operator ? " " + operator : "");
}

// Add number
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (current === "0" && button.textContent !== ".") {
            current = button.textContent;
        } else {
            current += button.textContent;
        }
        updateDisplay();
    });
});

// Add operator
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (current === "") return;

        if (previous !== "") {
            calculate();
        }

        operator = button.textContent;
        previous = current;
        current = "";
        updateDisplay();
    });
});

// Calculate result
function calculate() {
    let result;
    const prev = parseFloat(previous);
    const curr = parseFloat(current);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case "+":
            result = prev + curr;
            break;
        case "−":
            result = prev - curr;
            break;
        case "×":
            result = prev * curr;
            break;
        case "÷":
            result = prev / curr;
            break;
        default:
            return;
    }

    current = result.toString();
    operator = null;
    previous = "";
    updateDisplay();
}

// Equal button
equalButton.addEventListener("click", calculate);

// Clear button
clearButton.addEventListener("click", () => {
    current = "0";
    previous = "";
    operator = null;
    updateDisplay();
});

// Delete button
deleteButton.addEventListener("click", () => {
    if (current.length === 1) {
        current = "0";
    } else {
        current = current.slice(0, -1);
    }
    updateDisplay();
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
    if (!isNaN(e.key)) {
        current = current === "0" ? e.key : current + e.key;
        updateDisplay();
    }

    if (["+", "-", "*", "/"].includes(e.key)) {
        const opMap = {
            "+": "+",
            "-": "−",
            "*": "×",
            "/": "÷"
        };

        operator = opMap[e.key];
        previous = current;
        current = "";
        updateDisplay();
    }

    if (e.key === "Enter") {
        calculate();
    }

    if (e.key === "Backspace") {
        current = current.length > 1 ? current.slice(0, -1) : "0";
        updateDisplay();
    }

    if (e.key === "Escape") {
        current = "0";
        previous = "";
        operator = null;
        updateDisplay();
    }

    if (e.key === ".") {
        if (!current.includes(".")) {
            current += ".";
            updateDisplay();
        }
    }
});