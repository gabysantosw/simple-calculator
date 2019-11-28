// === SETUP 
function init() {
  // event listener for our button wrapper
  document
    .querySelector('.js-buttons')
    .addEventListener('click', function(event) {
      // the content of the pressed button
      const pressed = event.target.innerText;

      // we pass this value to a function to handle all button clicks
      buttonClick(pressed);
    });
}

// === FUNCTIONALITY

// to keep track of what's being typed
// a string because 
let input = "0";

// where the results operations are stored
let currentTotal = 0;

// to store operator used
let previousOperator = null;

// where we'll display the output
const screen = document.querySelector('.js-screen');


// when button gets clicked
// receives the value of the pressed button -> given by listener in init
function buttonClick(value) {
  if(isNaN(value)) {
    // no number was pressed 
    handleSymbol(value);
  } else {
    // number was pressed
    handleNumber(value);
  }

  // display accordingly
  screen.innerText = input;
}

// handling when a symbol button gets pressed 
// receives the pressed symbol -> given by buttonClick
function handleSymbol(symbol) {
  switch(symbol) {
    case 'C':
      // cancel button
      // input and currentTotal reset
      input = "0";
      currentTotal = 0;
      break;

    case '=':
      // equals button 
      if (previousOperator === null) {
        // no operator in the current input -> nothing to calculate
        return;
      }

      // else: do calculations with the given input
      calculateResult(input);

      // display answer
      // -> displaying is handled by buttonClick
      // -> updating the input to the result, which would be the currentTotal
      input = currentTotal;

      // reseting previousOperator and currentTotal
      previousOperator = null;
      currentTotal = "0";
      break;
    
    case '←':
      // delete button
      if (input.length === 1) {
        // when user has only selected one number and then presses delete
        // -> reset input 
        input = '0'
      } else {
        // remove last added digit
        input = input.substring(0, input.length - 1);
      }
      break;
    
    case '+':
    case '−':
    case '×':
    case '÷':
      calculateOperator(symbol);
      break;
  }
}

// doing the math
// receives input as a string -> given by handleSymbol, = case
function calculateResult(input) {
  // convert input to integer to be able to calculate
  const number = parseInt(input);

  // calculate for each operator case
  if (previousOperator === '+') {
    currentTotal += number;

  } else if (previousOperator === '−') {
    currentTotal -= number;

  } else if (previousOperator === '×') {
    currentTotal *= number;

  } else {
    currentTotal /= number;
  }
}

// handling when an operator button is pressed
// receives the operator -> given by handleSymbol cases
function calculateOperator(operator) {
  if (input === "0") {
    // nothing to calculate
    return;
  }

  // else: 

  // convert input to integer to do calculations
  const number = parseInt(input)

  if (currentTotal === 0) {
    // if this is the first number selected -> store number in currentTotal
    currentTotal = number;
  } else {
    // chained operators, keep calculating
    calculateResult(number);
  }

  // store the operator to calculate a result later
  previousOperator = operator;

  // reset input 
  input = "0";
}

// handling when numbers are selected
// receives digit value as a string -> given by buttonClick
function handleNumber(digit) {
  if (input === "0") {
    // default state
    // display selected number
    input = digit;
  } else {
    // concatenate to current input
    input += digit;
  }
}


// === RUNNING INITIALIZATION
init();