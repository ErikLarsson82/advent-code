const R = require('ramda')

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

  return idx => crazyConversion[idx]
}

function firstValueInOnionLayer(layer) {
  if (layer === 0)
    return 1
  return accOnionLength(layer - 1) + 1
}

function spiralMemory(input) {
  const onionLayers = getOnionLayers(input)

  const rest = input - firstValueInOnionLayer(onionLayers - 1)
  const offset = Math.max(0, onionLayers - 2)

  const stepsToCenterValue = stepsToCenter(onionLayers - 1)(rest - offset)

  return Math.max(0, stepsToCenterValue) + (onionLayers - 1)
}

console.log(spiralMemory(368078))
