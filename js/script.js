const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calc_body');
let key;
let n1 = "";
let number1 = "";
let number2 = "";
let operator = "";
let previousKey = "";
let result = "";

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    console.log(`firstNum = ${firstNum}, secondNum = ${secondNum}, operator = ${operator}`)
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}

calculator.addEventListener('click', (event) => {
    if (event.target.nodeName === 'BUTTON') {
        switch (event.target.className) {
            case "number":
                caseNumber(event.target.textContent);
                break;
            case "add":
            case "subtract":
            case "divide":
            case "multiply":
                caseOperator(event.target.textContent, event.target.className);
                break;
            case "comma":
                caseComma(event.target.textContent);
                break;
            case "ac":
                caseAc();
                break;
            case "del":
                caseDel();
                break;
            case "enter":
                caseEnter();
                break;
        }
    }
});

window.addEventListener('keydown', (event) => {
    const isNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (isNumber.includes(event.key)) {
        caseNumber(event.key);
    } else if (event.code === 'Backspace') {
        caseDel();
    } else if (event.code === 'Space' || event.code === 'Escape') {
        caseAc();
    } else if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        caseEnter();
    } else if (event.code === 'Period' || event.code === 'NumpadDecimal') {
        caseComma(event.key);
    } else if (event.code === 'NumpadMultiply' || event.key === '*') {
        const eventName = 'multiply';
        caseOperator(event.key, eventName);
    } else if (event.code === 'BracketRight' || event.code === 'NumpadAdd') {
        const eventName = 'add';
        caseOperator(event.key, eventName);
    } else if (event.code === 'Slash' || event.code === 'NumpadSubtract') {
        const eventName = 'subtract';
        caseOperator(event.key, eventName);
    } else if (event.key === '/' || event.code === 'NumpadDivide') {
        const eventName = 'divide';
        caseOperator(event.key, eventName);
    };
});

function caseNumber(symbol) {
    if (display.textContent === "") {
        n1 = symbol;
        display.textContent = n1;
    } else if (previousKey === "enter") {
        return;
    } else if (previousKey !== "operator") {
        if (number1 === "") {
            n1 += symbol;
            display.textContent = "";
            display.textContent = n1;
        } else {
            n1 += symbol;
            display.textContent = n1;
        }
    } else if (previousKey === "operator") {
        n1 = symbol;
        display.textContent = n1;
    }
    previousKey = "number";
}

function caseOperator(symbol, clName) {
    if (display.textContent === "") {
        return;
    } else if (previousKey === "enter") {
        operator = clName;
        number1 = result;
        display.textContent = number1 + symbol;
        previousKey = "operator";
    } else if (previousKey === "del") {
        number1 = display.textContent;
        operator = clName;
        display.textContent = number1 + symbol;
        previousKey = "operator";
        return;
    } else if (previousKey !== "operator") {
        if (number1 === "") {
            operator = clName;
            number1 = n1;
            display.textContent = number1 + symbol;
            previousKey = "operator";
        } else {
            number2 = n1;
            result = calculate(number1, operator, number2);
            operator = clName;
            number1 = result;
            display.textContent = number1 + symbol;
            previousKey = "operator";
        }
    } else if (previousKey === "operator") {
        operator = clName;
        display.textContent = "";
        display.textContent = number1 + symbol;
    }
}

function caseComma(symbol) {
    if (display.textContent === "" || previousKey === "operator") {
        n1 = 0;
        n1 += symbol;
    } else if (previousKey === "enter") {
        return;
    } else if (display.textContent !== "" && !n1.includes(".")) {
        n1 += symbol;
    } else if (display.textContent !== "" && n1.includes(".")) {
        return;
    }
    display.textContent = n1;
    previousKey = "comma";
}

function caseAc() {
    display.textContent = "";
    n1 = "";
    n2 = "";
    number1 = "";
    number2 = "";
    result = "";
    operator = "";
    previousKey = "";
}

function caseDel() {
    if (display.textContent !== "") {
        n1 = display.textContent.split("").slice(0, -1).join('');
    }
    display.textContent = n1;
    previousKey = "del";
}

function caseEnter() {
    number2 = n1;
    result = calculate(number1, operator, number2);
    display.textContent = result;
    number1 = result;
    console.log(`result = ${result}`);
    previousKey = "enter";
}