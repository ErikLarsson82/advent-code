const { curry, times } = require('ramda')
const { pad } = require('./day15')
const fs = require('fs')
const contentStr = fs.readFileSync('day16_input.txt', 'utf-8')

function dance(str, amount = 1) {
  let list = "abcdefghijklmnop"

  const instructionStrings = str.trim().split(",").map( x => x.trim() )

  const instructions = instructionStrings.map( translateInstruction )

  /*times( () => {
    list = instructions.reduce( (acc, curr) => curr(acc), list )
  }, amount)*/
  while(amount > 0) {
    amount--
    for ( var i = 0; i < instructions.length; i++) {
      list = instructions[i](list)
    }
  }

  return list
  //const loop = new Array(amount).fill(1)
  //return loop.reduce( (_acc, _curr) => instructions.reduce( (acc, curr) => curr(acc), _acc ), list )
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
    list = list[list.length-1] + list.substring(0, list.length-1)
  }
  return list
})

function printBinary(int) {
  return pad(6 * 4, int.toString(2))
}

const positions = {
  0: parseInt("111100000000000000000000", 2),
  1: parseInt("000011110000000000000000", 2),
  2: parseInt("000000001111000000000000", 2),
  3: parseInt("000000000000111100000000", 2),
  4: parseInt("000000000000000011110000", 2),
  5: parseInt("000000000000000000001111", 2)
}

function bitwiseExchange(data, x, y) {
  const diff = Math.abs(x - y)
  const clear = data & ~positions[x] & ~positions[y]
  let first = data & positions[x]
  let shift = (x < y) ? first >> diff * 4 : first << diff * 4
  let sec = data & positions[y]
  let secShift = (x < y) ? sec << diff * 4 : sec >> diff * 4
  const result = clear | shift | secShift
  /*console.log('clear', printBinary(clear))
  console.log('fir  ', printBinary(first))
  console.log('shift', printBinary(shift))
  console.log('sec  ', printBinary(sec))
  console.log('secSh', printBinary(secShift))
  console.log('res  ', printBinary(result))*/
  return result
}

function bitwiseSpin(data, amount) {
  times( () => {
    const extract = data & positions[5]
    const movedExtract = extract << 4 * 5
    const movedRest = data >> 4
    data = movedExtract | movedRest
    /*console.log('extract     ', printBinary(extract))
    console.log('movedExtract', printBinary(movedExtract))
    console.log('movedRest   ', printBinary(movedRest))
    console.log('result      ', printBinary(result))*/
    //data = result
  }, amount)
  return data
}

function bitwiseExchange(data) {
  return data
}

const exchange = curry((x, y, str) => {
  //console.log('one list\n', x,y,str)
  if (x > y) {
    let tmp = x
    x = y
    y = tmp
  }
  if (x === y)
    return str
  //console.log('wat', x,y,str)
  
  return str.substr(0, x) + str[y] + str.substring(x+1, y) + str[x] + str.substr(y+1)
  
  const one = str.substr(0, x)
  const two = str[y]
  const three = str.substring(x+1, y)
  const four = str[x]
  const five = str.substr(y+1)
  const result = one + two + three + four + five
  //return result
  
  //console.log(one)
  //  console.log(two)
  //  console.log(three)
 // //    console.log(four)
 //     console.log(five)
 // console.log(result)
  //if (result.length !== str.length)
  //  while(true) {}
})

const partner = curry((x, y, list) => {
  const xIdx = list.indexOf(x)
  const yIdx = list.indexOf(y)
  return exchange(xIdx, yIdx, list)
})

//console.time('dance')

//dance(contentStr, 1000)

//console.timeEnd('dance')

module.exports = { dance, spin, exchange, partner, bitwiseExchange, bitwiseSpin, printBinary }