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

calculator.addEventListener("click", function typeOfKey(event) {
    if (event.target.nodeName === "BUTTON") {
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

window.addEventListener('keydown', (ev) => {
    //const isNumber = ev.code.indexOf('Digit') > -1;
    //if (isNumber && !ev.shiftKey) {
    const isNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (isNumber.includes(ev.key)) {
        caseNumber(ev.key);
        console.log(ev.code)
    } else if (ev.code === "Backspace") {
        caseDel();
    } else if (ev.code === 'Space' || ev.code === 'Escape') {
        caseAc();
    } else if (ev.code === 'Enter' || ev.code === 'NumpadEnter') {
        caseEnter();
    } else if (ev.code === 'Period' || ev.code === 'NumpadDecimal') {
        caseComma(ev.key);
    } else if (ev.code === 'NumpadMultiply' || ev.key === '*') {
        const event = 'multiply';
        caseOperator(ev.key, event);
    } else if (ev.code === 'BracketRight' || ev.code === 'NumpadAdd') {
        const event = "add";
        caseOperator(ev.key, event);
    } else if (ev.code === 'Slash' || ev.code === 'NumpadSubtract') {
        const event = "subtract";
        caseOperator(ev.key, event);
    } else if (ev.key === '/' || ev.code === 'NumpadDivide') {
        const event = "divide";
        caseOperator(ev.key, event);
    };
});

function caseNumber(txtCont) {
    if (display.textContent === "") {
        n1 = txtCont;
        display.textContent = n1;
    } else if (previousKey === "enter") {
        return;
    } else if (previousKey !== "operator") {
        if (number1 === "") {
            n1 += txtCont;
            display.textContent = "";
            display.textContent = n1;
        } else {
            n1 += txtCont;
            display.textContent = n1;
        }
    } else if (previousKey === "operator") {
        n1 = txtCont;
        display.textContent = n1;
    }
    previousKey = "number";
}

function caseOperator(txtCont, clName) {
    if (display.textContent === "") {
        return;
    } else if (previousKey === "enter") {
        operator = clName;
        number1 = result;
        display.textContent = number1 + txtCont;
        previousKey = "operator";
    } else if (previousKey === "del") {
        number1 = display.textContent;
        operator = clName;
        display.textContent = number1 + txtCont;
        previousKey = "operator";
        return;
    } else if (previousKey !== "operator") {
        if (number1 === "") {
            operator = clName;
            number1 = n1;
            display.textContent = number1 + txtCont;
            previousKey = "operator";
        } else {
            number2 = n1;
            result = calculate(number1, operator, number2);
            operator = clName;
            number1 = result;
            display.textContent = number1 + txtCont;
            previousKey = "operator";
        }
    } else if (previousKey === "operator") {
        operator = clName;
        display.textContent = "";
        display.textContent = number1 + txtCont;
    }
}

function caseComma(txtCont) {
    if (display.textContent === "" || previousKey === "operator") {
        n1 = 0;
        n1 += txtCont;
    } else if (previousKey === "enter") {
        return;
    } else if (display.textContent !== "" && !n1.includes(".")) {
        n1 += txtCont;
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