const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calc_body');
const keys = calculator.querySelector('.calculator__keys');
let n1 = "";
let number1 = "";
let number2 = "";
let operator = "";
let previousKey = "";
let result = "";

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);
    console.log(`firstNum = ${firstNum}, secondNum = ${secondNum}, operator = ${operator}, previousKey = ${previousKey}`)
    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'subtract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}


calculator.addEventListener("click", function typeOfKey(event) {
    if (event.target.nodeName === "BUTTON") {
        switch (event.target.className) {
            case "number":
                if (display.textContent === "") {
                    n1 = event.target.textContent;
                    display.textContent = n1;
                } else if (previousKey === "enter") {
                    break;
                } else if (!display.textContent.includes("+") && !display.textContent.includes("-") && !display.textContent.includes("÷") && !display.textContent.includes("×")) {
                    if (number1 === "") {
                        n1 += event.target.textContent;
                        display.textContent = "";
                        display.textContent = n1;
                    } else {
                        n1 += event.target.textContent;
                        display.textContent = n1;
                    }
                } else if (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("÷") || display.textContent.includes("×")) {
                    n1 = event.target.textContent;
                    display.textContent = n1;
                }
                previousKey = "number";
                break;
            case "add":
            case "subtract":
            case "divide":
            case "multiply":
                if (display.textContent === "") {
                    break;
                } else if (previousKey === "enter") {
                    operator = event.target.className;
                    number1 = result;
                    display.textContent = number1 + event.target.textContent;
                    break;
                } else if (previousKey = "del") {
                    number1 = display.textContent;
                    operator = event.target.className;
                    display.textContent = number1 + event.target.textContent;
                    break;
                } else if (!display.textContent.includes("+") && !display.textContent.includes("-") && !display.textContent.includes("÷") && !display.textContent.includes("×")) {
                    if (number1 === "") {
                        operator = event.target.className;
                        number1 = n1;
                        display.textContent = number1 + event.target.textContent;

                    } else {
                        number2 = n1;
                        result = calculate(number1, operator, number2);
                        operator = event.target.className;
                        number1 = result;
                        display.textContent = number1 + event.target.textContent;
                    }
                    break;
                } else if (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("÷") || display.textContent.includes("×")) {
                    operator = event.target.className;
                    display.textContent = number1 + event.target.textContent;
                }
                //  previousKey = "operator";
                break;
            case "comma":
                if (display.textContent === "") {
                    n1 = 0;
                    n1 += event.target.textContent;
                } else if (display.textContent !== "" && !n1.includes(".")) {
                    n1 += event.target.textContent;
                } else if (display.textContent !== "" && n1.includes(".")) {
                    break;
                }
                display.textContent = n1;
                previousKey = "comma";
                break;
            case "ac":
                display.textContent = "";
                n1 = "";
                n2 = "";
                number1 = "";
                number2 = "";
                result = "";
                operator = "";
                previousKey = "";
                break;
            case "del":
                if (display.textContent !== "") {
                    n1 = display.textContent.split("").slice(0, -1).join('');
                }
                number1 = display.textContent;
                n1 = "";
                previousKey = "del";
                break;
            case "enter":
                number2 = n1;
                result = calculate(number1, operator, number2);
                display.textContent = result;
                number1 = result;
                console.log(`result = ${result}`);

                previousKey = "enter";
                break;
        }
    }
});