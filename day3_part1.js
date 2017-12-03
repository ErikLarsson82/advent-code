const R = require('ramda')
const clone = require('clone')

function spiralMemorySize(input, length) {
  if (input <= length * length)
    return length
  return spiralMemorySize(input, length + 2)
}

function layerSize(input) {
  if (input <= 1)
    return 1
  return (input - 1) * 8
}

function layerSizeAccum(input) {
  if (input <= 1)
    return 1
  return layerSizeAccum(input - 1) + (input + 1) * (input + 1)
}

function firstIndexInOnionLayer(layer) {
  if (layer === 1)
    return 1
  return layerSize(layer - 1) + 1
}

function sideLengthToOnionLayer(sideLength) {
  if (sideLength <= 1)
    return 1
  return sideLengthToOnionLayer(sideLength - 2) + 1
}

function steps(sideLength, input) {
  if (sideLength <= 1)
    return 0

  const layer = sideLengthToOnionLayer(sideLength)

  const currentLayerSize = layerSize(layer) - 1

  const resetCount = input - firstIndexInOnionLayer(layer)
  
  const divisor = layerSize(layer) / 4

  const stepAmount = resetCount % divisor

  console.log('sideLength ' + sideLength + ", input " + input + ", divisor " + divisor + ", layer " + layer + ", resetCount " + resetCount + ", currentLayerSize " + currentLayerSize + ", stepAmount " + stepAmount)
  
  let result
  if (true) {
    //Find edge
    result = steps(sideLength - 2, layerSize(layer - 1)) + stepAmount + 1
  } else {
    //Straight in
  }
  console.log('result', result)
  return result
}

// 10:0 2
// 11:1 1
// 12:2 2
// 13:3 3
// 14:4 2
// 15:5 1

function spiralMemory(input) {
  const sideLength = spiralMemorySize(input, 1)
  return steps(sideLength, input)
}

R.map ( idx => {
  console.log(idx + ": " + spiralMemory(idx))
  console.log("") 
}, R.range(1, 27))

console.log("first index in layer 1: " + firstIndexInOnionLayer(1))
console.log("first index in layer 2: " + firstIndexInOnionLayer(2))
console.log("first index in layer 3: " + firstIndexInOnionLayer(3))

console.log("layerSize 1: " + layerSize(1))
console.log("layerSize 2: " + layerSize(2))
console.log("layerSize 3: " + layerSize(3))
console.log("layerSize 4: " + layerSize(4))

console.log("layerSizeAccum 1: " + layerSizeAccum(1))
console.log("layerSizeAccum 2: " + layerSizeAccum(2))
console.log("layerSizeAccum 3: " + layerSizeAccum(3))
console.log("layerSizeAccum 4: " + layerSizeAccum(4))

console.log("sideLengthToOnionLayer 1: " + sideLengthToOnionLayer(1))
console.log("sideLengthToOnionLayer 3: " + sideLengthToOnionLayer(3))
console.log("sideLengthToOnionLayer 5: " + sideLengthToOnionLayer(5))
console.log("sideLengthToOnionLayer 7: " + sideLengthToOnionLayer(7))
console.log("sideLengthToOnionLayer 9: " + sideLengthToOnionLayer(9))