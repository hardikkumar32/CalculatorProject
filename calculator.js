class Calculator {
    constructor(currentOperandTextElement , previousOperandTextElement){
        this.currentOperandTextElement = currentOperandTextElement;
        this.previousOperandTextElement = previousOperandTextElement;
        this.clear();
    }
clear(){
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
}
delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1);
}
appendNumber(number){
    if(number ==='.'&& this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
}
chooseOperation(operation){
if(this.currentOperand == '') return;
if(this.previousOperand !== ''){
    this.compute();
}
this.operation = operation;
this.previousOperand = this.currentOperand;
this.currentOperand = '';
}
compute(){
let computation;
let prev = parseFloat(this.previousOperand);
let curr = parseFloat(this.currentOperand);
if(isNaN(prev)||isNaN(curr)) return;
switch(this.operation){
    case '+' : 
    computation = prev + curr;
    break;
    case '-' : 
    computation = prev - curr;
    break;
    case '/' : 
    computation = prev/curr;
    break;
    case '*' : 
    computation = prev*curr;
    break;
    default:
    break;
}
this.currentOperand = computation;
this.previousOperand = "";
this.operation = null;
}
updateDisplay(){
    this.currentOperandTextElement.innerText = this.currentOperand;
    if(this.operation != null){
    this.previousOperandTextElement.innerText = `${this.previousOperand}${this.operation}`;
    }
    else
    this.previousOperandTextElement.innerText = "";
} 

}
const numberButtons = document.querySelectorAll('[data-number]');
const operationalButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const clearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(currentOperandTextElement , previousOperandTextElement);
clearButton.addEventListener("click" , ()=>{
    calculator.clear();
    calculator.updateDisplay();
})
numberButtons.forEach(button =>{
    button.addEventListener("click",() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationalButtons.forEach(button =>{
    button.addEventListener("click",() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

deleteButton.addEventListener("click" , ()=>{
    calculator.delete();
    calculator.updateDisplay();
})
equalButton.addEventListener("click" , ()=>{
    calculator.compute();
    calculator.updateDisplay();
})
