const { data, parse } = require('../common')
const { pipe, equals } = require('ramda')

require('fs').readFile('./puzzle-input.txt', 'utf-8', pipe(data, parse(','), boot, compute, print))
//pipe(parse(','), boot, compute, print)("1,9,10,3,2,3,11,0,99,30,40,50")
//pipe(parse(','), boot, compute, print)("3,0,4,0,99")
//pipe(parse(','), boot, compute, print)("1002,4,3,4,33")
//pipe(parse(','), boot, compute, print)("11101,13,37,9,44,55,66,77,88,5")
//pipe(parse(','), boot, compute, print)("01101,1337,1338,3,44,55,66,77,88,99")
//pipe(parse(','), boot, compute, print)("01101,1337,-1,3,44,55,66,77,88,99")


function print(state) {
  console.log('\n\n2020 / Day 5 / Part 1\n', state, '\n--------------------------\n\n\n\n')
}

function getInput() {
  return 1
}

function boot(memory) {
  return {
    memory,
    instructionPointer: 0,
    input: getInput()
  }
}

function compute(state) {
  let { memory, instructionPointer, input } = state

  let opLength

  const halt = { memory, instructionPointer: -1 }

  if (instructionPointer === -1) return halt
  if (memory[instructionPointer] === 99) return halt

  const [opcodeFull, parameter1, parameter2, parameter3] = memory.slice(instructionPointer, instructionPointer+4)

  if (!opcodeFull) {
    console.log('\n\n\nException: ', opcodeFull, parameter1, parameter2, parameter3)
    console.log('Instruction Pointer:', instructionPointer)
    console.log('Memory dump\n', memory)
    return halt
  }
  
  const { opcode, mode1, mode2, mode3 } = getOpcode(opcodeFull)
  
  const readMemory = read(memory)
  const writeMemory = write(memory)

  if (opcode === 1) {
    const value = readMemory(parameter1, mode1) + readMemory(parameter2, mode2)
    memory = writeMemory(parameter3, mode3, value)
    opLength = 4
  }

  if (opcode === 2) {
    const value = readMemory(parameter1, mode1) * readMemory(parameter2, mode2)
    memory = writeMemory(parameter3, mode3, value)
    opLength = 4
  }

  if (opcode === 3) {
    memory[parameter1] = input
    opLength = 2
  }

  if (opcode === 4) {
    console.log('Program output:', memory[parameter1])
    opLength = 2    
  }
  
  const configuration = {
    memory,
    instructionPointer: instructionPointer + opLength,
    input
  }

  return compute(configuration)
}

function read(memory) {
  return function(parameter, opmode) {
    return opmode === 'immediate' ? parameter : memory[parameter]
  }
}

function write(memory) {
  return function(parameter, opmode, value) {
    const memCopy = [...memory]
    const address = opmode === 'immediate' ? memory[parameter] : parameter
    memCopy[address] = value
    return memCopy
  } 
}

function getOpcode(opInt) {
  const opString = pad(opInt.toString())

  return {
    opcode: parseInt(opString.substr(3,2)),
    mode1: opString.substr(2,1) === "0" ? 'position' : 'immediate',
    mode2: opString.substr(1,1) === "0" ? 'position' : 'immediate',
    mode3: opString.substr(0,1) === "0" ? 'position' : 'immediate'
  }
}

function pad(str) {
  return "00000".slice(0, 5 - str.length) + str
}

//console.log( read([ 1002, 4, 3, 4, 132 ])(2, 'immediate') ) // 2
//console.log( read([ 1002, 4, 3, 4, 132 ])(2, 'position') ) // 3
//console.log( read([ 1002, 4, 3, 4, 132 ])(0, 'immediate') ) // 0
//console.log( read([ 1002, 4, 3, 4, 132 ])(0, 'position') ) // 1002

//console.log( 'opcode 1', getOpcode(1) )
//console.log( 'opcode 1101', getOpcode(1101) )
//console.log( getOpcode("12") )
//console.log( getOpcode("123") )
//console.log( getOpcode("1234") )
//console.log( getOpcode("12345") )