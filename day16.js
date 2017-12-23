const { curry, times } = require('ramda')

function dance(str) {
  const list = "abcdefghijklmnop".split("")

  const instructionStrings = str.trim().split(",").map( x => x.trim() )

  const instructions = instructionStrings.map( translateInstruction )

  return instructions.reduce( (acc, curr) => curr(acc), list )
}

function translateInstruction(str) {
  const operation = str[0]

  const mutations = {
    "s": translateSpin,
    "x": translateExchange,
    "p": translatePartner
  }

  return mutations[operation](str.substring(1, str.length))
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
    const endBit = list[list.length-1]
    list = list.slice(0, list.length-1)
    list.unshift(endBit)
  }
  return list
})

const exchange = curry((x, y, list) => {
  const first = list[x]
  const second = list[y]
  list[x] = second
  list[y] = first
  return list
})


const partner = curry((x, y, list) => {
  const xIdx = list.indexOf(x)
  const yIdx = list.indexOf(y)
  return exchange(xIdx, yIdx, list)
})

module.exports = { dance, spin, exchange, partner }