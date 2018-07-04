const puzzleInput = require('./puzzle_input.json')
const splitInput = puzzleInput.map(x => x.split(" "))

const registers = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0
}

let mulInstructionsRun = 0

let currentInstructionIdx = 0

let counter = 0

//Try to see if this is a register
function registerOrValue(input) {
  const o = registers[input] !== undefined ? registers[input] : parseInt(input)
  return o
}

function run() {
  while(splitInput[currentInstructionIdx] !== undefined) {
    counter++
    if (counter % 100 === 0)
      console.log('iteration', counter, registers)

    const currentInstruction = splitInput[currentInstructionIdx][0]
    const targetRegister = splitInput[currentInstructionIdx][1]
    const targetValue = registerOrValue(splitInput[currentInstructionIdx][2])

    //console.log('Instruction: ', splitInput[currentInstructionIdx])
    //console.log('Idx: ', currentInstructionIdx)
    //console.log('Registers', registers)
    //console.log('Value', targetValue, typeof targetValue)
    //console.log('\n')

    switch(currentInstruction) {
      case "set": 
        registers[targetRegister] = targetValue
        currentInstructionIdx++
        break;
      case "sub":
        registers[targetRegister] = registers[targetRegister] - targetValue
        currentInstructionIdx++
        break;
      case "mul":
        registers[targetRegister] = registers[targetRegister] * targetValue
        currentInstructionIdx++
        mulInstructionsRun++
        break;
      case "jnz":
        if (registers[targetRegister] === 0) {
          currentInstructionIdx++
        } else {
          currentInstructionIdx = currentInstructionIdx + targetValue
        }
        break;
    }
  }
}

run()

console.log('End registers', registers)
console.log('mulInstructionsRun', mulInstructionsRun)