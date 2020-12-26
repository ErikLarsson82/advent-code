const { data, parse } = require('../common')
const { pipe, equals } = require('ramda')

require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse(','), testInputs, print))

function print({ verb, noun }) {
  console.log('\n\n2020 / 2 / Part 2\n1202 program alarm restored value:', verb, noun, 100 * verb + noun)
}

function resetMemory(verb, noun) {
  return function(memory) {
    const copy = [...memory]
    copy[1] = verb
    copy[2] = noun
    return copy
  }
}

function testInputs(memory) {
  for (var a = 1; a < 99; a++) {
    for (var b = 1; b < 99; b++) {
      const result = restore(resetMemory(a, b)(memory))
      if (result.memory[0] === 19690720) {
        return { verb: a, noun: b }
      }
    }
  }
}

function init(memory) {
  return {
    instructionPointer: 0,
    memory
  }
}

function restore(input) {
  const { memory, instructionPointer } = input
  
  if (instructionPointer === undefined) return restore(init(input))
  if (instructionPointer === -1) return { memory, instructionPointer: -1 }
  if (memory[instructionPointer] === 99) return { memory, instructionPointer: -1 }

  const [opcode, parameter1, parameter2, parameter3] = memory.slice(instructionPointer, instructionPointer+4)

  if (opcode === 1) {
    memory[parameter3] = memory[parameter1] + memory[parameter2]
    return restore({ memory, instructionPointer: instructionPointer + 4 })
  }

  if (opcode === 2) {
    memory[parameter3] = memory[parameter1] * memory[parameter2]
    return restore({ memory, instructionPointer: instructionPointer + 4 })
  }
}

/*
console.log( 'Test A:', equals(restore([1,9,10,3,2,3,11,0,99,30,40,50]), { memory: [3500,9,10,70,2,3,11,0,99,30,40,50], instructionPointer: -1 }) )
console.log( 'Test B:', equals(restore([1,0,0,0,99]), { memory: [2,0,0,0,99], instructionPointer: -1 }) )
console.log( 'Test C:', equals(restore([1,0,0,0,99]), { memory: [2,0,0,0,99], instructionPointer: -1 }) )
console.log( 'Test D:', equals(restore([2,3,0,3,99]), { memory: [2,3,0,6,99], instructionPointer: -1 }) )
console.log( 'Test E:', equals(restore([2,4,4,5,99,0]), { memory: [2,4,4,5,99,9801], instructionPointer: -1 }) )
console.log( 'Test F:', equals(restore([1,1,1,4,99,5,6,0,99]), { memory: [30,1,1,4,2,5,6,0,99], instructionPointer: -1 }) )
*/