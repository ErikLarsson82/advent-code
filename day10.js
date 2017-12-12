
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

module.exports = { reverser }