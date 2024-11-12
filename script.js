const output_operation = document.querySelector(`#operation`);
const output_result = document.querySelector(`#result`);
const operators = [`+`, `-`, `*`, `/`, `%`];
let operation = [];

// functionality for buttons
document.querySelector(`#buttonsContainer`).addEventListener(`click`, (event) => {
    console.log(`buttonsContainer.click(${event.target.getAttribute(`value`)})`);

    if (event.target.classList.contains(`button`)) {
        if (!event.target.classList.contains(`function`)) {
            let value = event.target.getAttribute(`value`);
            value = value === `0` ? 0 : Number(value) || value;
            operation.push(value);
            updateDisplay(`operation`, operation.join(``));
        } else {
            switch (event.target.getAttribute(`value`)) {
                case `=`:
                    operation = parseExpression(operation);
                    break;

                case `AC`:
                    console.log(`clearing operation`);
                    operation = [];
                    clearDisplay();
                    break;
            }
        }
    }
})

const updateDisplay = function (container, toDisplay = `null`) {
    console.log(`updateDisplay(${container}, ${toDisplay})`);

    if (container === `operation`) {
        output_operation.textContent = toDisplay;
    } else if (container === `result`) {
        output_result.textContent = toDisplay;
    }
}

const clearDisplay = function () {
    console.log(`clearDisplay()`);

    output_operation.textContent = ``;
    output_result.textContent = ``;
}

const add = function (num_1, num_2) {
    console.log(`add(${num_1}, ${num_2})`);

    return num_1 + num_2;
}

const subtract = function (num_1, num_2) {
    console.log(`subtract(${num_1}, ${num_2})`);

    return num_1 - num_2;
}

const divide = function (num_1, num_2) {
    console.log(`divide(${num_1}, ${num_2})`);

    return num_1 / num_2;
}

const multiply = function (num_1, num_2) {
    console.log(`multiply(${num_1}, ${num_2})`);

    return num_1 * num_2;
}

const parseExpression = function (expression) {
    let operation_tmp = [``];
    let currentActiveVar = 0;

    expression.forEach(element => {
        if (typeof element === `number`) {
            if (isNaN(operation_tmp[currentActiveVar])) {
                currentActiveVar++;
                operation_tmp[currentActiveVar] = ``;
            }
            operation_tmp[currentActiveVar] += String(element);
            operation_tmp[currentActiveVar] = +operation_tmp[currentActiveVar];
        } else {
            currentActiveVar++;
            operation_tmp[currentActiveVar] = element;
        }
    })

    return operation_tmp;
}

const calculate = function (operator, num_1, num_2) {
    console.log(`operate(${operator}, ${num_1}, ${num_2})`);

    switch (operator) {
        case `+`:
            return add(num_1, num_2);
            break;
        case `-`:
            return subtract(num_1, num_2);
            break;
        case `/`:
            return divide(num_1, num_2);
            break;
        case `*`:
            return multiply(num_1, num_2);
            break;
        default:
            break;
    }
}