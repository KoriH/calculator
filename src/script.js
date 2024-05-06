let elements = [
    'AC',
    'C',
    '%',
    '/',
    '7',
    '8',
    '9',
    '+',
    '4',
    '5',
    '6',
    '-',
    '1',
    '2',
    '3',
    '*',
    '0',
    '.',
    '='
];

const elementsDictionary = {
    'AC': 'clear',
    'C': 'cancel',
    '%': 'percentage',
    '/': 'division',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '+': 'addition',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '-': 'subtraction',
    '1': 'one',
    '2': 'two',
    '3': 'three',
    'x': 'multiplication',
    '0': 'zero',
    '.': 'decimal-point',
    '=': 'equals'
};

let expression = '';

const buttonsPanel = document.getElementById('buttons');
let count = 0;
let hasDot = false;
for (let i = 0; i < 5; ++i) {
    const buttonRow = document.createElement('div');
    buttonRow.classList.add('buttons-row');
    buttonsPanel.appendChild(buttonRow);

    for (let j = 0; j < 4; ++j) {
        const button = document.createElement('div');
        const text = document.createElement('p');
        const textKey = elements[count];
        const textVal = elementsDictionary[textKey];
        count++

        if (i === 4 && j === 3) {
            continue;
        };

        text.textContent = textKey;

        text.classList.add('value');
        button.classList.add('button', textVal);


        if (isNumeric(textKey)) {
            button.addEventListener('click', function() {
                expression += textKey;
                display.textContent = expression;
            });
        }

        if (isOperation(textKey)) {
            button.addEventListener('click', function() {
                if (!expression.length) {
                    // don't do anything
                } else if (textKey === '=') {
                    if (!isOperation(expression.substring(expression.length - 1))) {
                        let result = eval(expression);
                        expression = result.toString();
                        console.log(expression);
                    }
                } else {
                    expression += textKey
                }
                display.textContent = expression;
            });
        }

        if (textKey === '.') {
            button.addEventListener('click', function() {
                if (!hasDot) {
                    expression += '.';
                    hasDot = !hasDot;
                    display.textContent = expression;
                } 
            });
        }

        if (isClear(textKey)) {
            button.addEventListener('click', function() {
                if (textKey === 'AC') {
                    expression = '';
                    display.textContent = '0';
                } else {
                    expression = expression.substring(0, expression.length - 1);
                    display.textContent = expression;
                    if (expression.length === 0) {
                        display.textContent = '0';
                    }
                }
            });
        }

        button.appendChild(text);
        buttonRow.appendChild(button);
    }
};

function isNumeric(textKey) {
    return /^[0-9]+$/.test(textKey);
}

function isOperation(textKey) {
    return /[+\-\/%=*]/.test(textKey);
}

function isClear(textKey) {
    return textKey === 'AC' || textKey === 'C';
}

const display = document.createElement('p');
display.textContent = '0';
display.style.width = '100%';
display.style.height = '50%';
display.style.color = 'white';
display.style.textAlign = 'right';
display.style.fontSize = '60px';
display.classList.add('display-text');
document.getElementById('display').appendChild(display);