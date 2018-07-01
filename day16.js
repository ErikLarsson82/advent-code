const { curry, times } = require('ramda')
const fs = require('fs')
const contentStr = fs.readFileSync('day16_input.txt', 'utf-8')

function dance(str, amount = 1) {
  
  let abcdef = "abcdefghijklmnop" //"abcdef"
  
  const instructionStrings = str.trim().split(",").map( x => x.trim() )

  //const instructions = instructionStrings.map( translateInstruction )

  //const length = instructions.length
  
  while(amount > 0) {
    amount--
    if (amount % 10000 === 0)
      console.log('Iteration ', amount)
    for ( var i = 0; i < instructionStrings.length; i++) {
      abcdef = translateInstruction(instructionStrings[i], abcdef)
    }
  }

  return abcdef
}

function translateInstruction(instructionStr, seq) {
  
  const operation = instructionStr[0]
  const tail = instructionStr.substring(1, instructionStr.length).split("/")
  
  const mutations = {
    "s": spin,
    "x": exchange,
    "p": partner
  }
  
  return mutations[operation](tail, seq) //
}

// 2.5 sek på 1000
const spin = (instructionArray, seq) => {
  let size = parseInt(instructionArray[0])
  while(size > 0) {
    size--
    seq = seq[seq.length-1] + seq.substring(0, seq.length-1)
  }
  return seq
}

// 2.5 sek på 1000
const exchange = (instructionArray, seq) => {
  const instructions = instructionArray.map(x => parseInt(x))
  const x = instructions[0]
  const y = instructions[1]
  if (x < y) {
    return seq.substring(0, x) + seq[y] + seq.substring(x + 1, y) + seq[x] + seq.substring(y + 1, seq.length) 
  }
  return seq.substring(0, y) + seq[x] + seq.substring(y + 1, x) + seq[y] + seq.substring(x + 1, seq.length) 
}

// 0.2 sek på tusen
const partner = (instructionArray, seq) => {
  const x = instructionArray[0]
  const y = instructionArray[1]
  const xIdx = seq.indexOf(x)
  const yIdx = seq.indexOf(y)
  return exchange([xIdx.toString(), yIdx.toString()], seq)
}

console.time('dance')

console.log(dance(contentStr, 1))
// Before optz, 1000 iterations in 6725.485ms

console.timeEnd('dance')

module.exports = { dance, spin, exchange, partner }