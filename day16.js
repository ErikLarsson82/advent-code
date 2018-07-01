const { curry, times } = require('ramda')
const { pad } = require('./day15')
const fs = require('fs')
const contentStr = fs.readFileSync('day16_input.txt', 'utf-8')

function dance(str, amount = 1) {
  
  let abcdef = "abcdefghijklmnop" //"abcdef"
  
  const instructionStrings = str.trim().split(",").map( x => x.trim() )

  const instructions = instructionStrings.map( translateInstruction )

  const length = instructions.length
  
  while(amount > 0) {
    amount--
    if (amount % 10000 === 0)
      console.log('Iteration ', amount)
    for ( var i = 0; i < length; i++) {
      abcdef = instructions[i](abcdef)
    }
  }

  return abcdef
}

function translateInstruction(str) {
  //console.log(str)
  const operation = str[0]

  const mutations = {
    "s": translateSpin,
    "x": translateExchange,
    "p": translatePartner
  }

  return mutations[operation](str.substring(1, str.length)) //
}

function translateSpin(str) {
  return spin(parseInt(str))
}

function translateExchange(str) {
  const targets = str.split("/").map(x => parseInt(x))
  return exchange(targets[0], targets[1])
}

function translatePartner(str) {
  const targets = str.split("/")
  return partner(targets[0], targets[1])
}

const spin = curry((size, list) => {
  while(size > 0) {
    size--
    list = list[list.length-1] + list.substring(0, list.length-1)
  }
  return list
})

const exchange = curry((x, y, str) => {
  const tmp = str.split("")
  const swapTmp = tmp[x]
  tmp[x] = tmp[y]
  tmp[y] = swapTmp
  return tmp.join("")
})

const partner = curry((x, y, list) => {
  const xIdx = list.indexOf(x)
  const yIdx = list.indexOf(y)
  return exchange(xIdx, yIdx, list)
})

console.time('dance')

console.log(dance(contentStr, 1000))

console.timeEnd('dance')

module.exports = { dance, spin, exchange, partner }