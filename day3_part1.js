const R = require('ramda')
const clone = require('clone')

function spiralMemorySize(input, length) {
  if (input <= length * length)
    return length
  return spiralMemorySize(input, length + 2)
}

function hydrateMem(_memory) {
  const memory = clone(_memory)
  const side = memory.length
  const x = Math.ceil(side / 2) -1
  const y = Math.ceil(side / 2) -1
  memory[x][y] = 1
  return memory
}

function blankArray(size) {
  return R.map( x => 0, new Array(size) )
}

function spiralMemory(input) {
  const sideLength = spiralMemorySize(input, 1)

  const memory = R.map( item => item = blankArray(sideLength), blankArray(sideLength) )
  const hydratedMemory = hydrateMem(memory)
  return hydratedMemory
}

console.log(spiralMemory(10))

