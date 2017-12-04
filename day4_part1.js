const fs = require('fs')
const R = require('ramda')
const uniq = require('uniq')
const BigNumber = require('bignumber.js')

const contentStr = fs.readFileSync('day4.txt', 'utf-8')

const securityWordsDuplicates = contentStr.split(/[\n ]/)

const securityWords = uniq(securityWordsDuplicates)

//const words = new BigNumber(securityWords.length)
const words = [1,2,3]

function exponent(input) {
    if (input === 1)
        return new BigNumber(1)
    return exponent(input - 1).times(input)
}
//console.log(words.pow(words.minus(1)).toString())

console.log(exponent(words.length).toString())
