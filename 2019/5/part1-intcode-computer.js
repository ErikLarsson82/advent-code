const { data, parse } = require('../common')
const { pipe, equals } = require('ramda')

//require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse(','), boot, compute, print))
//pipe(parse(','), boot, compute, print)("1,9,10,3,2,3,11,0,99,30,40,50")
pipe(parse(','), boot, compute, print)("3,0,4,0,99")

function print(memory) {
  console.log('\n\n2020 / Day 5 / Part 1\n', memory)
}

function getInput() {
  return 1
}

function boot(memory) {
  return {
    instructionPointer: 0,
    memory,
    input: getInput()
  }
}

function compute(state) {
  const { memory, instructionPointer, input } = state

  if (instructionPointer === -1) return { memory, instructionPointer: -1 }
  if (memory[instructionPointer] === 99) return { memory, instructionPointer: -1 }

  const [opcode, parameter1, parameter2, parameter3] = memory.slice(instructionPointer, instructionPointer+4)

  if (opcode === 1) {
    memory[parameter3] = memory[parameter1] + memory[parameter2]
    return compute({ memory, instructionPointer: instructionPointer + 4, input })
  }

  if (opcode === 2) {
    memory[parameter3] = memory[parameter1] * memory[parameter2]
    return compute({ memory, instructionPointer: instructionPointer + 4, input })
  }

  if (opcode === 3) {
    memory[parameter1] = input
    return compute({ memory, instructionPointer: instructionPointer + 2, input: null })
  }

  if (opcode === 4) {
    console.log('Program output:', memory[parameter1])
    return compute({ memory, instructionPointer: instructionPointer + 2, input })
  }
}
