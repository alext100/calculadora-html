const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calc_body');
const keys = calculator.querySelector('.calculator__keys');
let n1 = "0";
let number1 = "";
let number2 = "";
let operator = 0;
let previousKeyType;
let result = 0;

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
                if (display.textContent === "0") {
                    n1 = event.target.textContent;
                } else if (display.textContent !== "0") {
                    n1 += event.target.textContent;
                }
                display.textContent = n1;
                break;
            case "comma":
                if (display.textContent === "0") {
                    n1 = 0;
                    n1 += event.target.textContent;
                } else if (display.textContent !== "0" && !n1.includes(".")) {
                    n1 += event.target.textContent;
                } else if (display.textContent !== "0" && n1.includes(".")) {
                    break;
                }
                display.textContent = n1;
                break;
            case "ac":
                display.textContent = 0;
                n1 = 0;
                number1 = 0;
                number2 = 0;
                result = 0;
                operator = 0;
                break;
            case "del":
                if (display.textContent !== "0") {
                    n1 = display.textContent.split("").slice(0, -1).join('');
                }
                display.textContent = n1;
                break;
            case "add":
            case "subtract":
            case "divide":
            case "multiply":
                if (result !== 0) {
                    number1 = display.textContent;
                    operator = event.target.className;
                    n1 = "";
                    display.textContent += event.target.textContent;
                } else if (result === 0) {
                    number1 = n1;
                    n1 = "";
                    operator = event.target.className;
                }
                break;
            case "enter":
                number2 = n1;
                result = calculate(number1, operator, number2);
                display.textContent = result;
                number1 = result;
                console.log(`result = ${result}`);
                break;



        }
        //console.log(n1);

        //console.log(event.target.textContent);
        //    console.log(event.target.nodeName);
    }

    //   console.log(n1);
});