var previousNumber;
var doesPreviousNumberExist = false;
var mostRecentNumber;
var currentOperator;
var lastInputWasOperator = false;
var equateOccurred = false;

function buttonPressed(event) {
    var userInput = event.currentTarget.innerText;
    var displayElement = document.getElementById("calc-display");
    var operators = ["÷", "*", "-", "+", "=", "C", "←", "+/-", "."];    

    if (contains(userInput, operators)) {
        operatorPressed(userInput);
    }
    else {
        if (!lastInputWasOperator) {
            if (equateOccurred) {
                clearEntries();
            }
            
            var newNumber = displayElement.innerHTML + parseInt(userInput);
            displayElement.innerHTML = parseInt(newNumber);
            //takes in new user input      
            equateOccurred = false;
        }
        else {
            displayElement.innerHTML = userInput;
            lastInputWasOperator = false;
        } 
    }
} 


//gittest
function operatorPressed(operator) {
    var displayElement = document.getElementById("calc-display");
    if (operator == "C") {
        clearEntries();
    }
    else if (operator == "←") {
        displayElement.innerHTML = displayElement.innerHTML.substring(0, displayElement.innerHTML.length-1);
        mostRecentNumber = displayElement.innerHTML;
    }
    else if (operator == "+/-") {
        if (Math.sign(parseInt(displayElement.innerHTML)) == 1) {
            displayElement.innerHTML = "-" + displayElement.innerHTML;    
        }
        else {
            if (displayElement.innerHTML.length > 1) {
                displayElement.innerHTML = displayElement.innerHTML.slice(1);   
            }
        }
    }
    else if (operator == ".") {
        if (displayElement.innerHTML.search(".") === -1) {
            displayElement.innerHTML = displayElement.innerHTML + "."; 
        }
    }
   
    else if (operator == "=") {
        evaluate();
    }
    else { 
        lastInputWasOperator = true;
        if (!doesPreviousNumberExist) {
            previousNumber = parseInt(displayElement.innerHTML);
            doesPreviousNumberExist = true;
        }
        else {
            evaluate()
        }
    }
    currentOperator = operator;
    console.log("operator:" + operator + " previousNumber:" + previousNumber + " mostRecentNumber:" + mostRecentNumber + " currentOperator:" + currentOperator);
}


function evaluate() {
    var displayElement = document.getElementById("calc-display");
    mostRecentNumber = parseInt(displayElement.innerHTML);
    
    if (currentOperator == "+") {
        previousNumber += mostRecentNumber;
    }
    else if (currentOperator == "-") {
        previousNumber -= mostRecentNumber;
    }
    else if (currentOperator == "*") {
        previousNumber *= mostRecentNumber;
    }
    else if (currentOperator == "÷") {
        // handle divide by zero
        previousNumber = previousNumber/mostRecentNumber;
    }
    displayElement.innerHTML = previousNumber;
    equateOccurred = true;
}

window.onload = function() {
    var buttons = document.getElementsByClassName("calc-button");
    console.log(buttons);

    for ( var i = 0; i<buttons.length; i++) {
        buttons[i].addEventListener('click', buttonPressed);
    }
}

function contains(obj, array) {
    var i = array.length;
    while (i--) {
        if (array[i] == obj) {
            return true;
        }
            
    }
    return false;
};

function clearEntries() {
    var displayElement = document.getElementById("calc-display");
    previousNumber = 0;
    mostRecentNumber = 0;
    displayElement.innerHTML = "0";
    doesPreviousNumberExist = false;
}