const current = document.getElementById("current");
const previous = document.getElementById("previous");

let currentOperand = "";
let previousOperand = "";
let operation = null;

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");
const equalButton = document.querySelector(".equal");

// Number Click
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.innerText);
    });
});

// Operator Click
operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        let op = button.innerText;
        if (op === "÷") op = "/";
        if (op === "×") op = "*";
        if (op === "−") op = "-";
        chooseOperation(op);
    });
});

// Clear
clearButton.addEventListener("click", clearAll);

// Delete
deleteButton.addEventListener("click", deleteLast);

// Equal
equalButton.addEventListener("click", compute);

function appendNumber(number) {
    if (number === "." && currentOperand.includes(".")) return;
    currentOperand += number;
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === "") return;
    if (previousOperand !== "") {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = "";
    updateDisplay();
}

function compute() {
    const prev = parseFloat(previousOperand);
    const currentVal = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(currentVal)) return;

    let result;

    switch (operation) {
        case "+":
            result = prev + currentVal;
            break;
        case "-":
            result = prev - currentVal;
            break;
        case "*":
            result = prev * currentVal;
            break;
        case "/":
            result = currentVal === 0 ? "Error" : prev / currentVal;
            break;
        default:
            return;
    }

    currentOperand = result.toString();
    operation = null;
    previousOperand = "";
    updateDisplay();
}

function clearAll() {
    currentOperand = "";
    previousOperand = "";
    operation = null;
    updateDisplay();
}

function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    current.innerText = currentOperand || "0";
    previous.innerText = operation ? previousOperand + " " + operation : "";
}

// Keyboard Support
document.addEventListener("keydown", function(e) {
    if (!isNaN(e.key) || e.key === ".") {
        appendNumber(e.key);
    }
    if (["+", "-", "*", "/"].includes(e.key)) {
        chooseOperation(e.key);
    }
    if (e.key === "Enter") compute();
    if (e.key === "Backspace") deleteLast();
    if (e.key === "Escape") clearAll();
});