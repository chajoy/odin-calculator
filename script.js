const output_operation = document.querySelector(`#operation`);
const output_result = document.querySelector(`#result`);
let operation = [];

// functionality for buttons
document.querySelector(`#buttonsContainer`).addEventListener(`click`, (event)=>
{
    if(event.target.classList.contains(`button`))
    {
        if(event.target.classList.contains(`number`))
        {
            operation.push(event.target.getAttribute(`value`));
            output_operation.textContent += event.target.getAttribute(`value`);
        }else
        {
            switch(event.target.getAttribute(`value`))
            {
                case `=`:
                    clearDisplay();
                    setDisplay(`result`, operation.join(``));
                    break;
                
                case `AC`:
                    clearDisplay();
                    break;
            }
        }
    }
})

const setDisplay = function (container, toDisplay = `null`)
{
    if(container === `operation`)
    {
        
    }else if(container === `result`)
    {
        output_result.textContent = toDisplay;
    }
}

const clearDisplay = function ()
{
    output_operation.textContent = ``;
    output_result.textContent = ``;
}

const add = function (num_1, num_2) {
    return num_1 + num_2;
}

const subtract = function (num_1, num_2) {
    return num_1 - num_2;
}

const divide = function (num_1, num_2) {
    return num_1 / num_2;
}

const multiply = function (num_1, num_2) {
    return num_1 * num_2;
}

const operate = function (operator, num_1, num_2) {
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