const fs = require('fs')
const R = require('ramda')
const uniq = require('uniq')
const BigNumber = require('bignumber.js')

const contentStr = fs.readFileSync('day4.txt', 'utf-8')

const securityWordsDuplicates = contentStr.split(/[\n ]/)

const securityWords = uniq(securityWordsDuplicates)

const words = new BigNumber(securityWords.length)

//console.log(words.pow(words.minus(1)).toString())
let wat = "4"

const list = R.range(0, 12250)
list.forEach( () => wat += "0" )

console.log(wat)
