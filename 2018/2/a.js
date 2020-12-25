const fs = require('fs')
const data = fs.readFileSync('puzzle_input.txt', 'utf-8').split("\n")

const amount = (char, list) => list.filter(x => x === char).length

const countAll = (acc, curr, idx, list) => {
    if (amount(curr, list) === 2) {
        acc = { ...acc, twoMod: 1 }
    }
    if (amount(curr, list) === 3) {
        acc = { ...acc, threeMod: 1 }
    }
    return acc
}

const accumulateCounts = str => {
    return str.split("").reduce(countAll, { twoMod: 0, threeMod:0 })
}

const total = data.reduce((acc, curr) => {
    const output = accumulateCounts(curr)
    return { two: acc.two + output.twoMod, three: acc.three + output.threeMod }
}, { two: 0, three: 0 })

console.log('total:', total)

console.log('multiplied:', total.two * total.three)
