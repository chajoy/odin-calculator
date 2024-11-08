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