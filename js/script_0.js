/* function insert(num) {

    document.form.textview.innerText = document.form.textview.innerText + num;
}
let selectedN;
let calc_body = document.querySelector(".calc_body");
calc_body.onclick = function(event) {
    let n = event.target.closest('button');
    if (!n) return;
    if (!calc_body.contains(n)) return;
    insert(n);
}

function highlight(n) {
    if (selectedN) { // remove the existing highlight if any
        selectedN.classList.remove('highlight');
    }
    selectedN = n;
    selectedN.classList.add('highlight'); // highlight the new td
} 
const buttonValue = document.querySelectorAll("button")
const screenValue = document.querySelector("#result");
let isOperator;
let isdot;
let isNumber;
screenValue.value = '0';

function refreshCalculator() {
    isOperator = true;
    isdot = false;
    isNumber = true;
    screenValue.value = "0"
}
refreshCalculator();
buttonValue.forEach(element => {
    element.addEventListener('click', e => {


        let buttonText = e.target.innerText;

        if (buttonText === "AC") {
            refreshCalculator();
        } else if (buttonText === ',' && !isdot) {
            screenValue.value += buttonText;
            isdot = true;
        } else if (buttonText === '+' && isOperator) {
            if (screenValue.value != '0') {
                screenValue.value += buttonText;
            } else {
                screenValue.value = buttonText;
            }
            isOperator = false;
            isNumber = true;
            isdot = false;

        } else if (buttonText === '-' && isOperator) {
            if (screenValue.value != '0') {
                screenValue.value += buttonText;
            } else {
                screenValue.value = buttonText;
            }
            isOperator = false;
            isNumber = true;
            isdot = false;
        } else if (buttonText === '*' && isOperator) {
            if (screenValue.value != '0') {
                screenValue.value += buttonText;
                isOperator = false;
                isNumber = true;
                isdot = false;
            }

        } else if (buttonText === "&larr;" && isOperator) {
            if (screenValue.value != '0') {
                screenValue.value += buttonText;
                isOperator = false;
                isNumber = true;
                isdot = false;
            }

        } else if (buttonText >= '0' && buttonText <= 9 && isNumber) {
            if (buttonText === '0' && screenValue.value === '0') {
                isNumber = true;
            } else if (screenValue.value === '0') {
                screenValue.value = buttonText;
            } else {
                screenValue.value += buttonText;
            }
            isOperator = true;
        } else if (buttonText === '=') {
            screenValue.value = eval(screenValue.value)

            isNumber = false;
        }

    })







});

*/
const display = document.querySelector('.calculator__display');
const calculator = document.querySelector('.calc_body');
const keys = calculator.querySelector('.calculator__keys');

/* const screenValue = document.querySelector("#result");
screenValue.value = '0'; */

const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}
const getKeyType = key => {
    const { action } = key.dataset
    if (!action) return 'number'
    if (
        action === 'add' ||
        action === 'subtract' ||
        action === 'multiply' ||
        action === 'divide'
    ) return 'operator'
        // For everything else, return the action
    return action
}

document.querySelector(".calc_body").onclick = function(e) {
    if (e.target.nodeName === "BUTTON") {
        console.log(`${e.target.textContent} is pressed`);
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        console.log(key);
        console.log("Action is " + action);
        console.log(keyContent);
        console.log(displayedNum);
        console.log(previousKeyType)

        if (!action) {
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent
            } else {
                display.textContent = displayedNum + keyContent
            }
        }

        if (action === 'decimal') {
            display.textContent = displayedNum + '.'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {
            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayedNum
            calculator.dataset.operator = action
        }

        if (action === 'clear') {
            console.log('clear key!')
        }

        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            display.textContent = calculate(firstValue, operator, secondValue)
        }
    }
}


/*         if (e.target.textContent === ',') {
            screenValue.value += e.target.textContent;
        }
        if (e.target.textContent === '1') {
            screenValue.value += e.target.textContent;
        } 
//do something
}
}
*/