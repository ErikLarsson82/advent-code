const R = require('ramda')

function spiralMemorySize(input, length) {
  if (input <= length * length)
    return length
  return spiralMemorySize(input, length + 2)
}

function spiralMemoryLayers(input, length, multi) {
  if (input === 1)
    return 0
  if (input <= length + multi)
    return length
  return spiralMemoryLayers(input, length + 1, multi + 7)
}

function onionLengthFromLayer(layer) {
  return layer * 8
}

function rangeFromLayer(layer) {
  return R.range(0, onionLengthFromLayer(layer))
}

function stepsToCenter(layer) {
  if (layer === 0)
    return () => 0
  return idx => Math.abs(Math.round(Math.sin(Math.PI / (layer * 2) * idx) * layer))
}

function firstValueInOnionLayer(layer) {
  if (layer === 0)
    return 1
  return onionLengthFromLayer(layer - 1) + 2
}

function convertIndexToValue(layer, index) {
  return firstValueInOnionLayer(layer) + index
}

function spiralMemory(input) {
  const onionLayers = spiralMemoryLayers(input, 0, 1)

  const rest = input - firstValueInOnionLayer(onionLayers - 1) // + onionLayers + 1
  const offset = onionLayers - 2
  /*console.log('onionLayers', onionLayers)
  console.log('offset', offset)
  console.log('rest', rest)
  console.log('diff', rest - offset)
  console.log('firstValueInOnionLayer(onionLayers - 1)', firstValueInOnionLayer(onionLayers - 1))*/
  return Math.max(0, stepsToCenter(onionLayers)(rest - offset) + onionLayers)
}

R.map ( idx => console.log(idx + ": " + spiralMemory(idx)), R.range(1, 26))

//console.log(spiralMemory(23))

return
console.log('onionLengthFromLayer(0) ' + onionLengthFromLayer(0))
console.log('onionLengthFromLayer(1) ' + onionLengthFromLayer(1))
console.log('onionLengthFromLayer(2) ' + onionLengthFromLayer(2))

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

console.log('firstValueInOnionLayer(0) ' + firstValueInOnionLayer(0))
console.log('firstValueInOnionLayer(1) ' + firstValueInOnionLayer(1))
console.log('firstValueInOnionLayer(2) ' + firstValueInOnionLayer(2))
console.log('firstValueInOnionLayer(3) ' + firstValueInOnionLayer(3))
console.log('firstValueInOnionLayer(4) ' + firstValueInOnionLayer(4))


console.log('stepsToCenter(0)(0) ' + stepsToCenter(0)(0))
console.log('---------')
console.log('stepsToCenter(1)(0) ' + stepsToCenter(1)(0))
console.log('stepsToCenter(1)(1) ' + stepsToCenter(1)(1))
console.log('stepsToCenter(1)(2) ' + stepsToCenter(1)(2))
console.log('stepsToCenter(1)(3) ' + stepsToCenter(1)(3))
console.log('stepsToCenter(1)(4) ' + stepsToCenter(1)(4))
console.log('stepsToCenter(1)(5) ' + stepsToCenter(1)(5))
console.log('stepsToCenter(1)(6) ' + stepsToCenter(1)(6))
console.log('stepsToCenter(1)(7) ' + stepsToCenter(1)(7))
console.log('---------')
console.log('stepsToCenter(2)(0) ' + stepsToCenter(2)(0))
console.log('stepsToCenter(2)(1) ' + stepsToCenter(2)(1))
console.log('stepsToCenter(2)(2) ' + stepsToCenter(2)(2))
console.log('stepsToCenter(2)(3) ' + stepsToCenter(2)(3))
console.log('stepsToCenter(2)(4) ' + stepsToCenter(2)(4))
console.log('stepsToCenter(2)(5) ' + stepsToCenter(2)(5))
console.log('stepsToCenter(2)(6) ' + stepsToCenter(2)(6))
console.log('stepsToCenter(2)(7) ' + stepsToCenter(2)(7))
console.log('stepsToCenter(2)(8) ' + stepsToCenter(2)(8))
console.log('stepsToCenter(2)(9) ' + stepsToCenter(2)(9))
console.log('stepsToCenter(2)(10) ' + stepsToCenter(2)(10))
console.log('stepsToCenter(2)(11) ' + stepsToCenter(2)(11))
console.log('stepsToCenter(2)(12) ' + stepsToCenter(2)(12))
console.log('stepsToCenter(2)(13) ' + stepsToCenter(2)(13))
console.log('stepsToCenter(2)(14) ' + stepsToCenter(2)(14))
console.log('stepsToCenter(2)(15) ' + stepsToCenter(2)(15))

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
