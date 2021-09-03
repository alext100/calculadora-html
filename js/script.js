const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calc_body');
const keys = calculator.querySelector('.calculator__keys');
let n1 = "0";
let number1 = "";
let number2 = "";
let operator = "";
let previousKeyType;
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
                if (display.textContent === "") {
                    n1 = event.target.textContent;
                    display.textContent = n1;
                } else if (display.textContent !== "") {
                    n1 += event.target.textContent;
                    display.textContent = n1;
                }
                //display.textContent += n1;
                break;
            case "add":
            case "subtract":
            case "divide":
            case "multiply":
                if (display.textContent === "") {
                    break;
                } else if (result !== "" && (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("÷") || display.textContent.includes("×"))) {
                    number1 = n1;
                    operator = event.target.className;
                    display.textContent = number1 + event.target.textContent;
                }
                /* else if (result !== "") {
                                   // number1 = display.textContent;
                                   number1 = result;
                                   operator = event.target.className;
                                   n1 = "";
                                   display.textContent += event.target.textContent;
                               }  */
                else if (display.textContent.includes("+") || display.textContent.includes("-") || display.textContent.includes("÷") || display.textContent.includes("×")) {
                    console.log(`attencion ${display.textContent}`);
                    number2 = n1;

                    result = calculate(number1, operator, number2);
                    operator = event.target.className;
                    display.textContent = result + event.target.textContent;
                    number1 = result;
                    number2 = "";
                    n1 = "";
                    console.log(`number1 =  ${number1}, number2 =  ${number2}`);
                    break;
                } else if (result === "") {
                    number1 = n1;
                    n1 = "";
                    operator = event.target.className;
                    display.textContent += event.target.textContent;
                    break;
                }
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
                display.textContent = "";
                n1 = "";
                number1 = "";
                number2 = "";
                result = "";
                operator = "";
                break;
            case "del":
                if (display.textContent !== "") {
                    n1 = display.textContent.split("").slice(0, -1).join('');
                }
                display.textContent = n1;
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