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

function maximumStore() {
    let max

    return obj => {
        for (i in obj) {
            if (!max || obj[i] > max)
                max = obj[i]
        }
        return max
    }
}

function calculateSum(operations) {
    const registers = {}
    const allTimeMax = maximumStore()
    
    function getRegister(name) {
        return registers[name] || 0
    }
    function setRegister(name, value) {
        return registers[name] = value
    }

    operations.forEach( ({ register, operation, amount, comparee, operand, compareeAmount }) => {
        if (comparee && operands[operand](getRegister(comparee), compareeAmount))
            setRegister(register, modifyers[operation](getRegister(register), amount)) 

        allTimeMax(registers)
    })

    return {
        lastMax: maximumStore()(registers),
        allTimeMax: allTimeMax()
    }
}

console.log(calculateSum(operations)) // { lastMax: 6061, allTimeMax: 6696 }

