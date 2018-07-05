const puzzleInput = require('./puzzle_input.json')
const splitInput = puzzleInput.map(x => x.split(" "))

const registers = {a:1,b:0,c:0,d:0,e:0,f:0,g:0,h:0}

//const registers = {a:1,b:107900,c:124900,d:3,e:107900,f:0,g:0,h:0} // d just incremented once, this is a possible shortcut
//const registers = {a:1,b:107900,c:124900,d:107900,e:107900,f:0,g:0,h:0} // longshot

let mulInstructionsRun = 0

let currentInstructionIdx = 0

let counter = 0

let tripwire = false

let last_d
let last_e
let last_f
let last_h

//Try to see if this is a register
function registerOrValue(input) {
  return registers[input] !== undefined ? registers[input] : parseInt(input)
}

function pad(i) {
  return "             ".substring(0, 13 - i.toString().length) + i.toString()
}

function logreg(regs) {
  let output = ""
  for (let i in registers) {
    output += i + ": " + pad(registers[i]) + "      "
  }
  return output
}

function run() {
  while(splitInput[currentInstructionIdx] !== undefined && !tripwire) {
    counter++
    if (counter % 10000000 === 0) {
      console.log('\nIteration',counter,' currentInstructionIdx', currentInstructionIdx)
      console.log('Registers before', logreg(registers))
    }

    if (false && counter > 20) {
      tripwire = true
      return
    }
     
    const currentInstruction = splitInput[currentInstructionIdx][0]
    const targetRegister = splitInput[currentInstructionIdx][1]
    const targetValue = registerOrValue(splitInput[currentInstructionIdx][2])


    if (false && targetRegister === "d" && currentInstruction === "jnz") {
        console.log('Making a decision based on D')
        console.log('Iteration',counter)
        console.log('Instruction id',currentInstructionIdx)
        console.log('Registers before', logreg(registers))
        console.log('\n')
    }
    if (false && targetRegister === "e" && currentInstruction === "jnz") {
        console.log('Making a decision based on D')
        console.log('Iteration',counter)
        console.log('Instruction id',currentInstructionIdx)
        console.log('Registers before', logreg(registers))
        console.log('\n')
    }

    if (false && currentInstructionIdx === 11) {
        console.log('Setting g to d')
        console.log('Regs', logreg(registers))
        console.log('Instruction id',currentInstructionIdx)
        console.log('\n')
    }

    if (false && counter === 12) {
        console.log('Stop at 12')
        console.log('Registers before', logreg(registers))
        console.log('Instruction id',currentInstructionIdx)
        console.log('\n')
    }
        

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


    if (false && counter === 12) {
        registers.d = 107900
        console.log('Stop at 12 after')
        console.log('Registers after', logreg(registers))
        console.log('\n')
    }

    if (false && last_d !== registers.d) {
      last_d = registers.d
      console.log('Change detected in register D')
      console.log('Registers after', logreg(registers))
      console.log('After Iteration',counter)
      console.log('Instruction id',currentInstructionIdx)
      console.log('\n')
    }
    if (false && last_e !== registers.e) {
      last_e = registers.e
      console.log('Change detected in register E')
      console.log('Registers after', logreg(registers))
      console.log('After Iteration',counter)
      console.log('Instruction id',currentInstructionIdx)
      console.log('\n')
    }
    if (false && last_f !== registers.f) {
      last_f = registers.f
      console.log('Change detected in register F')
      console.log('Registers after', logreg(registers))
      console.log('After Iteration',counter)
      console.log('Instruction id',currentInstructionIdx)
      console.log('\n')
    }
    if (last_h !== registers.h && registers.h !== 0) {
      last_h = registers.h
      console.log('Change detected in register H')
      console.log('Registers after', logreg(registers))
      console.log('After Iteration',counter)
      console.log('Instruction id',currentInstructionIdx)
      console.log('\n')
      tripwire = true
      return
    }

  }
}

run()

console.log('End registers', registers)
console.log('mulInstructionsRun', mulInstructionsRun)