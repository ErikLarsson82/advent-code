const { data, parse } = require('../common')
const { pipe, equals } = require('ramda')

require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse(','), customInitRules, restore, print))

function print(x) {
  console.log('\n\n2020 / 2 / Part 1 (functional)\n1202 program alarm restored value:', x.program[0])
}

function customInitRules(arr) {
  const copy = [...arr]
  copy[1] = 12
  copy[2] = 2
  return copy
} 

function init(program) {
  return {
    target: 0,
    program
  }
}

function restore(params) {
  const { program, target } = params
  
  if (target === undefined) return restore(init(params))
  if (target === -1) return { program, target: -1 }
  if (program[target] === 99) return { program, target: -1 }

  const [opcode, inputA, inputB, output] = program.slice(target, target+4)

  if (opcode === 1) {
    program[output] = program[inputA] + program[inputB]
    return restore({ program, target: target + 4 })
  }

  if (opcode === 2) {
    program[output] = program[inputA] * program[inputB]
    return restore({ program, target: target + 4 })
  }
}

console.log( 'Test A:', equals(restore([1,9,10,3,2,3,11,0,99,30,40,50]), { program: [3500,9,10,70,2,3,11,0,99,30,40,50], target: -1 }) )
console.log( 'Test B:', equals(restore([1,0,0,0,99]), { program: [2,0,0,0,99], target: -1 }) )
console.log( 'Test C:', equals(restore([1,0,0,0,99]), { program: [2,0,0,0,99], target: -1 }) )
console.log( 'Test D:', equals(restore([2,3,0,3,99]), { program: [2,3,0,6,99], target: -1 }) )
console.log( 'Test E:', equals(restore([2,4,4,5,99,0]), { program: [2,4,4,5,99,9801], target: -1 }) )
console.log( 'Test F:', equals(restore([1,1,1,4,99,5,6,0,99]), { program: [30,1,1,4,2,5,6,0,99], target: -1 }) )