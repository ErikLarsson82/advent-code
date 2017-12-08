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

class MaximumStore {
    constructor() {
        this.max = null
    }
    maximum(obj) {
        for (let i in obj) {
            if (!this.max || obj[i] > this.max)
                this.max = obj[i]
        }
        return this.max
    }
}

function calculateSum(operations) {
    const registers = {}
    const allTimeMax = new MaximumStore()
        
    function getRegister(name) {
        return registers[name] || 0
    }
    function setRegister(name, value) {
        return registers[name] = value
    }

    operations.forEach( ({ register, operation, amount, comparee, operand, compareeAmount }) => {
        if (comparee && operands[operand](getRegister(comparee), compareeAmount))
            setRegister(register, modifyers[operation](getRegister(register), amount)) 

        allTimeMax.maximum(registers)
    })

    return {
        lastMax: new MaximumStore().maximum(registers),
        allTimeMax: allTimeMax.maximum()
    }
}

console.log(calculateSum(operations)) // { lastMax: 6061, allTimeMax: 6696 }

