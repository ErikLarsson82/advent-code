const { data, parse } = require('../common')
const { pipe, equals } = require('ramda')

require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(() => "99", parse(','), restore, print))

function print(x) {
  console.log('2020 / 2 / Part 1 (functional)\n1202 program alarm restored value:', x)
}

function init(program) {
  return {
    target: 0,
    program
  }
}

function restore(params) {
  const { program, target } = params
  //console.log('restore', params, program, target)

  if (target === undefined) return restore(init(params))
  if (target === -1) return { program, target: -1 }
  if (program[target] === 99) return { program, target: -1 }

  if (program[target] === 1) {
    program[target+3] = program[target+1] + program[target+2]
    restore({ program, target: target + 4 })
  }

  if (program[target] === 2) {
    program[target+3] = program[target+1] * program[target+2]
    restore({ program, target: target + 4 })
  }
}

console.log( equals(restore([1,2,3,4,99]), { program: [1,2,3,4,99], target: -1 }) )
console.log( equals(restore([1,9,10,3,2,3,11,0,99,30,40,50]), { program: [3500,9,10,70,2,3,11,0,99,30,40,50], target: -1 }) )