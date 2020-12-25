const _ = require('underscore')

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

function knotHash(lengths, initSize = 255) {
  let list = _.range(0, initSize)
  let currentPosition = 0
  let skipSize = 0

  lengths.forEach(length => {
    list = reverser(list, currentPosition, length)
    currentPosition += length + skipSize
    currentPosition = currentPosition % initSize
    skipSize++
  })

  return {
    list,
    firstEntries: list[0] * list[1]
  }
}

module.exports = { reverser, knotHash }