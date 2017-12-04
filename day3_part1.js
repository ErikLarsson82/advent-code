const R = require('ramda')

function spiralMemorySize(input, length) {
  if (input <= length * length)
    return length
  return spiralMemorySize(input, length + 2)
}

function spiralMemoryLayers(input, layer) {
  if (input === 1)
    return 1
  if (input <= accOnionLength(layer))
    return layer + 1
  return spiralMemoryLayers(input, layer + 1)
}

function getOnionLayers(input) {
  return spiralMemoryLayers(input, 1, 0)
}

function onionLengthFromLayer(layer) {
  return layer * 8
}

function accOnionLength(layer) {
  return R.range(0, layer + 1).reduce( (acc, curr) => acc + onionLengthFromLayer(curr), 1)
}

function rangeFromLayer(layer) {
  return R.range(0, onionLengthFromLayer(layer))
}

/*
function stepsToCenter(layer) {
  if (layer === 0)
    return () => 0
  if (layer === 1)
    return idx => idx % (layer + 1)
  return idx => (idx % (layer * layer) > layer) ? (idx % (layer * layer)) - layer : idx % (layer * layer);
}
*/
//Math.floor(Math.abs(Math.sin(Math.PI / (layer * 2) * idx) * layer)) //

function stepsToCenter(layer) {
  if (layer === 0)
    return () => 0
  const range = rangeFromLayer(layer)
  return linearSinus(range[range.length-1])
}

function linearSinus(length) {
  const data = R.range(0, length)

  const halfLinearSine = data.map( val => val % (length / 4) )
  const crazyConversion = halfLinearSine.map( val => {
    if (val > (length / 8))
      return (length / 4) - val
    return val
  })

  return idx => Math.floor(crazyConversion[idx])
}

function firstValueInOnionLayer(layer) {
  if (layer === 0)
    return 1
  return accOnionLength(layer - 1) + 1
}

function convertIndexToValue(layer, index) {
  return firstValueInOnionLayer(layer) + index
}

function spiralMemory(input) {
  const onionLayers = getOnionLayers(input)

  const rest = input - firstValueInOnionLayer(onionLayers - 1)
  const offset = Math.max(0, onionLayers - 2)

  const stepsToCenterValue = stepsToCenter(onionLayers - 1)(rest - offset)

  return Math.max(0, stepsToCenterValue) + (onionLayers - 1)
}

R.map ( idx => console.log(idx + ": " + spiralMemory(idx)), R.range(1, 52))


//R.map ( idx => console.log("accOnionLength " + idx + ": " + firstValueInOnionLayer(idx)), R.range(0, 368079))

//R.map ( idx => console.log("spiralMemorySize " + idx + ": " + spiralMemorySize(idx, 1)), R.range(1, 368079))

//R.map ( idx => console.log("linearSinus " + idx + ": " + linearSinus(32)(idx)), R.range(0, 32))

//console.log('spiralMemoryLayers(1024) ' + spiralMemoryLayers(1024, 1))

//console.log('stepsToCenter(17)(1024) ' + stepsToCenter(17)(1024))

//console.log(spiralMemory(23))

return

console.log('linearSinus(0)(0) ' + linearSinus(0)(0))
console.log('---------')
console.log('linearSinus(8)(0) ' + linearSinus(8)(0))
console.log('linearSinus(8)(1) ' + linearSinus(8)(1))
console.log('linearSinus(8)(2) ' + linearSinus(8)(2))
console.log('linearSinus(8)(3) ' + linearSinus(8)(3))
console.log('linearSinus(8)(4) ' + linearSinus(8)(4))
console.log('linearSinus(8)(5) ' + linearSinus(8)(5))
console.log('linearSinus(8)(6) ' + linearSinus(8)(6))
console.log('linearSinus(8)(7) ' + linearSinus(8)(7))
console.log('---------')
console.log('linearSinus(16)(0) ' + linearSinus(16)(0))
console.log('linearSinus(16)(1) ' + linearSinus(16)(1))
console.log('linearSinus(16)(2) ' + linearSinus(16)(2))
console.log('linearSinus(16)(3) ' + linearSinus(16)(3))
console.log('linearSinus(16)(4) ' + linearSinus(16)(4))
console.log('linearSinus(16)(5) ' + linearSinus(16)(5))
console.log('linearSinus(16)(6) ' + linearSinus(16)(6))
console.log('linearSinus(16)(7) ' + linearSinus(16)(7))
console.log('linearSinus(16)(8) ' + linearSinus(16)(8))
console.log('linearSinus(16)(9) ' + linearSinus(16)(9))
console.log('linearSinus(16)(10) ' + linearSinus(16)(10))
console.log('linearSinus(16)(11) ' + linearSinus(16)(11))
console.log('linearSinus(16)(12) ' + linearSinus(16)(12))
console.log('linearSinus(16)(13) ' + linearSinus(16)(13))
console.log('linearSinus(16)(14) ' + linearSinus(16)(14))
console.log('linearSinus(16)(15) ' + linearSinus(16)(15))

return

console.log('onionLengthFromLayer(0) ' + onionLengthFromLayer(0))
console.log('onionLengthFromLayer(1) ' + onionLengthFromLayer(1))
console.log('onionLengthFromLayer(2) ' + onionLengthFromLayer(2))
console.log('onionLengthFromLayer(3) ' + onionLengthFromLayer(3))
console.log('onionLengthFromLayer(4) ' + onionLengthFromLayer(4))
console.log('onionLengthFromLayer(5) ' + onionLengthFromLayer(5))

console.log('accOnionLength(0) ' + accOnionLength(0))
console.log('accOnionLength(1) ' + accOnionLength(1))
console.log('accOnionLength(2) ' + accOnionLength(2))
console.log('accOnionLength(3) ' + accOnionLength(3))
console.log('accOnionLength(4) ' + accOnionLength(4))
console.log('accOnionLength(5) ' + accOnionLength(5))

console.log('firstValueInOnionLayer(0) ' + firstValueInOnionLayer(0))
console.log('firstValueInOnionLayer(1) ' + firstValueInOnionLayer(1))
console.log('firstValueInOnionLayer(2) ' + firstValueInOnionLayer(2))
console.log('firstValueInOnionLayer(3) ' + firstValueInOnionLayer(3))
console.log('firstValueInOnionLayer(4) ' + firstValueInOnionLayer(4))
console.log('firstValueInOnionLayer(5) ' + firstValueInOnionLayer(5))
console.log('firstValueInOnionLayer(6) ' + firstValueInOnionLayer(6))
console.log('firstValueInOnionLayer(7) ' + firstValueInOnionLayer(7))
console.log('firstValueInOnionLayer(8) ' + firstValueInOnionLayer(8))

console.log('spiralMemorySize(1) ' + spiralMemorySize(1, 1))
console.log('spiralMemorySize(2) ' + spiralMemorySize(2, 1))
console.log('spiralMemorySize(3) ' + spiralMemorySize(3, 1))
console.log('spiralMemorySize(9) ' + spiralMemorySize(9, 1))
console.log('spiralMemorySize(10) ' + spiralMemorySize(10, 1))
console.log('spiralMemorySize(25) ' + spiralMemorySize(25, 1))
console.log('spiralMemorySize(26) ' + spiralMemorySize(26, 1))
console.log('spiralMemorySize(27) ' + spiralMemorySize(27, 1))

console.log('rangeFromLayer(0) ' + rangeFromLayer(0))
console.log('rangeFromLayer(1) ' + rangeFromLayer(1))
console.log('rangeFromLayer(2) ' + rangeFromLayer(2))
console.log('rangeFromLayer(3) ' + rangeFromLayer(3))


console.log('stepsToCenter(0)(0) ' + (stepsToCenter(0)(0) === 0))
console.log('---------')
console.log('stepsToCenter(1)(0) ' + stepsToCenter(1)(0) + ", " + (stepsToCenter(1)(0) === 0))
console.log('stepsToCenter(1)(1) ' + stepsToCenter(1)(1) + ", " + (stepsToCenter(1)(1) === 1))
console.log('stepsToCenter(1)(2) ' + stepsToCenter(1)(2) + ", " + (stepsToCenter(1)(2) === 0))
console.log('stepsToCenter(1)(3) ' + stepsToCenter(1)(3) + ", " + (stepsToCenter(1)(3) === 1))
console.log('stepsToCenter(1)(4) ' + stepsToCenter(1)(4) + ", " + (stepsToCenter(1)(4) === 0))
console.log('stepsToCenter(1)(5) ' + stepsToCenter(1)(5) + ", " + (stepsToCenter(1)(5) === 1))
console.log('stepsToCenter(1)(6) ' + stepsToCenter(1)(6) + ", " + (stepsToCenter(1)(6) === 0))
console.log('stepsToCenter(1)(7) ' + stepsToCenter(1)(7) + ", " + (stepsToCenter(1)(7) === 1))
console.log('---------')
console.log('stepsToCenter(2)(0) ' + stepsToCenter(2)(0) + ", " + (stepsToCenter(2)(0) === 0))
console.log('stepsToCenter(2)(1) ' + stepsToCenter(2)(1) + ", " + (stepsToCenter(2)(1) === 1))
console.log('stepsToCenter(2)(2) ' + stepsToCenter(2)(2) + ", " + (stepsToCenter(2)(2) === 2))
console.log('stepsToCenter(2)(3) ' + stepsToCenter(2)(3) + ", " + (stepsToCenter(2)(3) === 1))
console.log('stepsToCenter(2)(4) ' + stepsToCenter(2)(4) + ", " + (stepsToCenter(2)(4) === 0))
console.log('stepsToCenter(2)(5) ' + stepsToCenter(2)(5) + ", " + (stepsToCenter(2)(5) === 1))
console.log('stepsToCenter(2)(6) ' + stepsToCenter(2)(6) + ", " + (stepsToCenter(2)(6) === 2))
console.log('stepsToCenter(2)(7) ' + stepsToCenter(2)(7) + ", " + (stepsToCenter(2)(7) === 1))
console.log('stepsToCenter(2)(8) ' + stepsToCenter(2)(8) + ", " + (stepsToCenter(2)(8) === 0))
console.log('stepsToCenter(2)(9) ' + stepsToCenter(2)(9) + ", " + (stepsToCenter(2)(9) === 1))
console.log('stepsToCenter(2)(10) ' + stepsToCenter(2)(10) + ", " + (stepsToCenter(2)(10) === 2))
console.log('stepsToCenter(2)(11) ' + stepsToCenter(2)(11) + ", " + (stepsToCenter(2)(11) === 1))
console.log('stepsToCenter(2)(12) ' + stepsToCenter(2)(12) + ", " + (stepsToCenter(2)(12) === 0))
console.log('stepsToCenter(2)(13) ' + stepsToCenter(2)(13) + ", " + (stepsToCenter(2)(13) === 1))
console.log('stepsToCenter(2)(14) ' + stepsToCenter(2)(14) + ", " + (stepsToCenter(2)(14) === 2))
console.log('stepsToCenter(2)(15) ' + stepsToCenter(2)(15) + ", " + (stepsToCenter(2)(15) === 1))

return 

console.log('convertIndexToValue(0,0) ' + convertIndexToValue(0,0))
console.log('convertIndexToValue(1,0) ' + convertIndexToValue(1,0))
console.log('convertIndexToValue(1,1) ' + convertIndexToValue(1,1))
console.log('convertIndexToValue(1,2) ' + convertIndexToValue(1,2))
console.log('convertIndexToValue(1,3) ' + convertIndexToValue(1,3))
console.log('convertIndexToValue(1,4) ' + convertIndexToValue(1,4))
console.log('convertIndexToValue(1,5) ' + convertIndexToValue(1,5))
console.log('convertIndexToValue(1,6) ' + convertIndexToValue(1,6))
console.log('convertIndexToValue(1,7) ' + convertIndexToValue(1,7))
console.log('convertIndexToValue(2,0) ' + convertIndexToValue(2,0))
console.log('convertIndexToValue(2,1) ' + convertIndexToValue(2,1))
console.log('convertIndexToValue(2,2) ' + convertIndexToValue(2,2))
console.log('convertIndexToValue(2,3) ' + convertIndexToValue(2,3))
console.log('convertIndexToValue(2,4) ' + convertIndexToValue(2,4))
console.log('convertIndexToValue(2,5) ' + convertIndexToValue(2,5))
console.log('convertIndexToValue(2,6) ' + convertIndexToValue(2,6))
console.log('convertIndexToValue(2,7) ' + convertIndexToValue(2,7))
console.log('convertIndexToValue(2,8) ' + convertIndexToValue(2,8))
console.log('convertIndexToValue(2,9) ' + convertIndexToValue(2,9))
console.log('convertIndexToValue(2,10) ' + convertIndexToValue(2,10))
console.log('convertIndexToValue(2,11) ' + convertIndexToValue(2,11))
console.log('convertIndexToValue(2,12) ' + convertIndexToValue(2,12))
console.log('convertIndexToValue(2,13) ' + convertIndexToValue(2,13))
console.log('convertIndexToValue(2,14) ' + convertIndexToValue(2,14))
console.log('convertIndexToValue(2,15) ' + convertIndexToValue(2,15))
