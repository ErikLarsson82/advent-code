const puzzleInput = require('./puzzle_input.json')
const splitInput = puzzleInput.map(x => x.split(" "))

const registers = {
  a: 1,
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
  return registers[input] !== undefined ? registers[input] : parseInt(input)
}

function pad(i) {
  return "          ".substring(0, 10 - i.toString().length) + i.toString()
}

function run() {
  while(splitInput[currentInstructionIdx] !== undefined) {
    counter++
    if (counter % 10000000 === 0) {
      console.log('\nIteration',counter)
      let output = ""
      for (let i in registers) {
        output += i + ": " + pad(registers[i]) + "      "
      }
      console.log('Registers', output)
    }
     
    const currentInstruction = splitInput[currentInstructionIdx][0]
    const targetRegister = splitInput[currentInstructionIdx][1]
    const targetValue = registerOrValue(splitInput[currentInstructionIdx][2])

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
        if (registerOrValue(targetRegister) === 0) {
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