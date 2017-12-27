const { curry, times } = require('ramda')
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

const positions = {
  0: 111100000000000000000000,
  1: 000011110000000000000000,
  2: 000000001111000000000000,
  3: 000000000000111100000000,
  4: 000000000000000011110000,
  5: 000000000000000000001111
}
function bitwiseExchange(data, x, y) {
  console.log('first', (data & positions[x]).toString(2))
  console.log('sec', (data & positions[y]).toString(2))
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

module.exports = { dance, spin, exchange, partner, bitwiseExchange }