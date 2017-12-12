const _ = require('underscore')
const xor = require('buffer-xor')
const { find } = require('./ascii')

function reverser(inputArray, position, length) {

  const extended = inputArray.concat(inputArray)
  
  const subsection = extended.slice(position, position + length)
  subsection.reverse()
  
  if (position + length > inputArray.length) {
    //Wrap it up boys
    const middleStart = (position + length) % inputArray.length
    
    const middle = inputArray.slice(middleStart, position)


    const lastNumber = (inputArray.length - position)
    
    const theFullMonty = subsection.concat(middle, subsection)

    const beginningTrimmed = theFullMonty.slice(lastNumber, theFullMonty.length)

    const result = beginningTrimmed.slice(0, inputArray.length)

    return result

  } else {
    // Non-wrapped
    const beginning = inputArray.slice(0, position)
    const end = extended.slice(position + length, inputArray.length)
  
    const result = beginning.concat(subsection).concat(end)
    return result
  }
}

function densify({ idx, denseList, accumulator }, curr) {

  console.log('running', idx, denseList, accumulator, curr)

  idx++

  if (!accumulator) 
    return { idx, denseList, accumulator: new Buffer(curr, 'hex') }

  const comparee = new Buffer(curr, 'hex')

  const result = xor(accumulator, comparee)

  const currentInBase10 = parseInt(result.toString('hex'), 16)
  console.log(currentInBase10)
  
  /*if (idx % 16 === 0) {
    const newList = denseList.concat()
    newList.push(currentInBase10)
    return { idx, denseList: newList }
  }*/

  return { idx, denseList, accumulator: result }
}

function hashDenser(list) {
  return list.map( x => x.toString(16) ).reduce( densify, { idx: 0, denseList: [] })
}

function knotHash(str) {
  const size = 256
  const arrayified = str.split("")
  const asciiConverted = arrayified.map( find )

  let list = asciiConverted.concat(new Array(size).fill(0)).slice(0, size)
  
  const lengths = asciiConverted.concat([17, 31, 73, 47, 23])

  let currentPosition = 0
  let skipSize = 0

  new Array(64).fill(1).forEach((val, idx) => {
    lengths.forEach(length => {
      list = reverser(list, currentPosition, length)
      currentPosition += length + skipSize
      currentPosition = currentPosition % size
      skipSize++
    })
  })

  return JSON.stringify(list)
}

//console.log(knotHash("1,2,3"))

console.log(hashDenser([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22]))

console.log(xor(new Buffer("65", 'hex'), new Buffer("27", 'hex')))

module.exports = { reverser, knotHash, densify, hashDenser }

/*

65 ^ 27 ^ 9 ^ 1 ^ 4 ^ 3 ^ 40 ^ 50 ^ 91 ^ 7 ^ 6 ^ 0 ^ 2 ^ 5 ^ 68 ^ 22 = 64

base 10:


*/