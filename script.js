class Calculator{
    constructor(oldCalcTextElement, newCalcTextElement){
        this.oldCalcTextElement = oldCalcTextElement
        this.newCalcTextElement = newCalcTextElement
        this.allClear()
    }
    allClear(){
        this.oldOperand = ""
        this.newOperand = ""
        this.operator = undefined

    }
    del(){
    }
    appendNumber(number){
        if(number === '.' && this.newOperand.includes('.')) return
        this.newOperand = this.newOperand.toString() + number.toString()

    }
    chooseOperation(operator){
        if(this.newOperand === '') return
        if(this.oldOperand != ''){
            this.compute()
        }
        this.operator = operator
        this.oldOperand = this.newOperand
        this.newOperand = ''
    }
    compute(){
        let compute
        const oldOperand = parseFloat(this.oldOperand)
        const newOperand = parseFloat(this.newOperand)
        if (isNaN(oldOperand) || isNaN(newOperand)) return
        switch(this.operator){
            case '+': 
                compute = oldOperand+newOperand
                break
            case '-':
                compute = oldOperand-newOperand
                break
            case '/':
                compute = oldOperand/newOperand
                break
            case '*':
                compute = oldOperand * newOperand
                break
            default: return

        }
        this.newOperand = compute
        this.oldOperand = ''
        this.operator = undefined
    }
    delete(){
        if(this.operator == undefined){
            this.newOperand = this.newOperand.toString().slice(0,-1)
        }
        else{
            this.operator = undefined
        }

    }
    updateDisplay(){
        this.newCalcTextElement.innerText = this.newOperand
        if(this.operator != undefined){
            this.oldCalcTextElement.innerText = this.oldOperand.toString() + ' ' + this.operator.toString()
        }
        else{
            this.oldCalcTextElement.innerText = ''
        }
    }
}

const numericButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-allclear]')
const oldCalcTextElement = document.querySelector('[data-old-calc]')
const newCalcTextElement = document.querySelector('[data-new-calc]')

const calculator = new Calculator(oldCalcTextElement, newCalcTextElement)

numericButtons.forEach(button=>{
    button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button=>{
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    }) 
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.allClear()
    calculator.updateDisplay()

})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()

})