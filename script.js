const output_operation = document.querySelector(`#operation`);
const output_result = document.querySelector(`#result`);
const container = document.querySelector(`#container`);
const operators = [`/`, `*`, `%`, `+`, `-`];
let operation = [];

const parseInput = function (e) {
    if (e.key >= 0 && e.key <= 9 ||
        e.key === `+` ||
        e.key === `-` ||
        e.key === `*` ||
        e.key === `/` ||
        e.key === `%`) {
        operation.push(e.key);
        updateDisplay(`operation`, operation.join(``));
    } else if (e.key === `=` || e.key === `Enter`) {
        evaluate();
    } else if (e.key === `Backspace`) {
        clearDisplay(`operation`);
        operation = output_result.textContent === `` ? [] : [output_result.textContent];
    } else if (e.key === `Escape`) {
        operation = [];
        clearDisplay();
    }
}

window.addEventListener(`keydown`, parseInput);

// functionality for buttons
document.querySelector(`#buttonsContainer`).addEventListener(`click`, (event) => {

    if (event.target.classList.contains(`button`)) {
        if (!event.target.classList.contains(`function`)) {
            let value = event.target.getAttribute(`value`);
            value = value === `0` ? 0 : Number(value) || value;
            if (isNaN(value)) {
                if (isNaN(operation[operation.length - 1])) {
                    operation.pop();
                }
            }
            operation.push(value);
            updateDisplay(`operation`, operation.join(``));
        } else {
            switch (event.target.getAttribute(`value`)) {
                case `=`:
                    evaluate();
                    break;

                case `AC`:
                    operation = [];
                    clearDisplay();
                    break;

                case `C`:
                    clearDisplay(`operation`);
                    operation = output_result.textContent === `` ? [] : [output_result.textContent];
            }
        }
    }
})

const updateDisplay = function (container, toDisplay = null) {

    if (container === `operation`) {
        output_operation.textContent = toDisplay;
    } else if (container === `result`) {
        output_result.textContent = toDisplay;
    }
}

const evaluate = function () {
    clearDisplay();
    operation = operation == `` ? operation : parseExpression(operation);
    updateDisplay(`result`, operate(operation) || `0`);
    checkValueLength();
}

const clearDisplay = function (container = `all`) {
    if (container === `operation`) {
        output_operation.textContent = ``;
    } else if (container === `result`) {
        output_result.textContent = `0`;
    } else if (container === `all`) {
        output_operation.textContent = ``;
        output_result.textContent = `0`;
    }
}

const checkValueLength = function () {
    if (output_result.scrollWidth > container.scrollWidth - 25) {
        output_result.textContent = Number(output_result.textContent).toExponential(2);
    }

}

const operate = function (operation) {
    for (let x = 0; x < operators.length; x++) {
        while (operation.includes(operators[x])) {
            let operatorIndex = operation.indexOf(operators[x]);
            let num_1 = operation[operatorIndex - 1];
            let operator = operators[x];
            let num_2 = operation[operatorIndex + 1];
            operation.splice(operatorIndex - 1, 3, calculate(operator, num_1, num_2));
        }
    }

    return isNaN(operation) ? `Error: NaN` : operation.join(` `);
}

// concatenates separate numerals into single values
const parseExpression = function (expression) {
    let operation_tmp = [``];
    let currentActiveVar = 0;

    expression.forEach(element => {
        if (operators.includes(element) || operators.includes(operation_tmp[currentActiveVar])) {
            currentActiveVar++;
            operation_tmp[currentActiveVar] = ``;
        }
        operation_tmp[currentActiveVar] += String(element);
    })

    operation_tmp = operation_tmp.map(element => {
        return isNaN(element) ? element : +element;
    })

    return operation_tmp;
}

const calculate = function (operator, num_1, num_2) {
    switch (operator) {
        case `+`:
            return num_1 + num_2;
            break;
        case `-`:
            return num_1 - num_2;
            break;
        case `/`:
            return num_1 / num_2;
            break;
        case `*`:
            return num_1 * num_2;
            break;
        case `%`:
            return num_1 % num_2;
            break;
        default:
            break;
    }
}