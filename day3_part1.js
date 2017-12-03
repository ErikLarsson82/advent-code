const R = require('ramda')
const clone = require('clone')

function spiralMemorySize(input, length) {
  if (input <= length * length)
    return length
  return spiralMemorySize(input, length + 2)
}

function hydrateMem(_memory, steps) {
  const memory = clone(_memory)
  const side = memory.length
  //let x = side - 1
  //let y = Math.ceil(side / 2) - 1
  //memory[y][x] = 1
  return memory
}

function blankArray(size) {
  return R.map( x => 0, new Array(size) )
}

function steps(sideLength, input) {
  if (sideLength === 1)
    return 0
  if (sideLength === 3)
    return (input % 2 === 0) ? 1 : 2;
}

function spiralMemory(input) {
  const sideLength = spiralMemorySize(input, 1)
  const prevSize = Math.max(1, (sideLength - 2) * (sideLength - 2))
  const delta = input - prevSize
  
  //const memory = R.map( item => item = blankArray(sideLength), blankArray(sideLength) )
  //const hydratedMemory = hydrateMem(memory, delta)
  //return hydratedMemory
  
  return steps(sideLength, input)
}

R.map ( idx => console.log(idx + ": " + spiralMemory(idx)), R.range(1, 11) )

