const fs = require('fs')

const contentStr = fs.readFileSync('day8_input.txt', 'utf-8')

const operations = contentStr.split("\n")
    .map( x => x.split(" ") )
    .map( x => {
    return { 
        register: x[0],
        operation: x[1],
        amount: Number(x[2]),
        comparee: x[4],
        operand: x[5],
        compareeAmount: Number(x[6])
    }})

const operands = {
    "<": (x, y) => x < y,
    "<=": (x, y) => x <= y,

    ">": (x, y) => x > y,
    ">=": (x, y) => x >= y,
    
    "==": (x, y) => x === y,
    "!=": (x, y) => x !== y,
}

const modifyers = {
    "inc": (x, y) => x + y,
    "dec": (x, y) => x - y,
}

function calculateSum(operations) {
    const registers = {}

    function getRegister(name) {
        return registers[name] || 0
    }
    function setRegister(name, value) {
        return registers[name] = value
    }

    operations.forEach( x => {  
        let register = x.register
        let operation = x.operation
        let amount = x.amount
        let comparee = x.comparee
        let operand = x.operand
        let compareeAmount = x.compareeAmount
        if (comparee && operands[operand](getRegister(comparee), compareeAmount))
            setRegister(register, modifyers[operation](getRegister(register), amount)) 
    })

    let max
    for (i in registers) {
        if (!max || registers[i] > max)
            max = registers[i]
    }

    return max
}

console.log(calculateSum(operations)) // 6061