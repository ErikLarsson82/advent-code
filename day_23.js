const puzzleInput = require('./day_23_input.json')
const splitInput = puzzleInput.map(x => x.split(" "))

/*const registers = {
  a: 1,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0
}*/
/*
//First skip
const registers = {
  a: 1,
  b: 107900,
  c: 124900,
  d: 2,
  e: 53950,
  f: 1,
  g: 0,
  h: 0
}*/
/*
//Second skip
const registers = {
  a: 1,
  b: 107900,
  c: 124900,
  d: 2,
  e: 107900,
  f: 0,
  g: 0,
  h: 0
}*/
/*
//Third skip
const registers = {
  a: 1,
  b: 107917,
  c: 124900,
  d: 107900,
  e: 107900,
  f: 1,
  g: -17000,
  h: 1
}*/
/*
//Fourth, when f goes from 1 to 0 again
const registers = {
  a: 1,
  b: 107917,
  c: 124900,
  d: 311,
  e: 347,
  f: 0,
  g: 0,
  h: 1
}
*/
/*//Fifth, when f goes from 1 to 0 again
const registers = {
  a: 1,
  b: 107917,
  c: 124900,
  d: 311,
  e: 1302+106615,
  f: 0,
  g: 0,
  h: 1
}*/

/*//sex, when f goes from 1 to 0 again
const registers = {
  a: 1,
  b: 107917,
  c: 124900,
  d: 312,
  e: 107917,
  f: 0,
  g: 0,
  h: 1
}*/
//sju
/*const registers = {
  a: 1,
  b: 107917,
  c: 124900,
  d: 312,
  e: 478+107438,
  f: 0,
  g: 0,
  h: 1
}*/
//åtta, g ? needs to be 0 to skip but is -16983 idx 28
const registers = {
  a: 1,
  b: 107917,
  c: 107917, //124900
  d: 312,
  e: 107916,
  f: 0,
  g: -16983,
  h: 2
}
/*
//This was once a baseline, starting at 19
const registers = {
  a: 1,
  b: 107900,
  c: 124900,
  d: 107898,
  e: 107900,
  f: 0,
  g: 0,
  h: 0
}*/

/*
// This turned out to be a dead end
const registers = {
  a: 1,
  b: 107917,
  c: 124900,
  d: 107900,
  e: 107900,
  f: 0,
  g: -17000,
  h: 1
}*/

let mulInstructionsRun = 0

let currentInstructionIdx = 28

let counter = 0

let terminate = false

//Try to see if this is a register
function registerOrValue(input) {
  const o = registers[input] !== undefined ? registers[input] : parseInt(input)
  return o
}

function run() {
  while(splitInput[currentInstructionIdx] !== undefined && terminate === false) {
    counter++
    if (counter % 10000000 === 0)
      console.log('iteration', counter, registers)

    const currentInstruction = splitInput[currentInstructionIdx][0]
    const targetRegister = splitInput[currentInstructionIdx][1]

    //if (targetRegister === undefined)
    //  console.log()
    const targetValue = registerOrValue(splitInput[currentInstructionIdx][2])

    //console.log('Instruction: ', splitInput[currentInstructionIdx])
    //console.log('Idx: ', currentInstructionIdx)
    //console.log('Registers', registers)
    //console.log('Value', targetValue, typeof targetValue)
    //console.log('\n')

    /*if (registers.d !== 312) {
      console.log('Register D warning', registers.d)
      console.log(registers, currentInstructionIdx)
      terminate = true
      return
    }*/
    if (targetRegister === "d") {
      //console.log('im gonna manipulate d', currentInstruction, targetValue, splitInput[currentInstructionIdx][2])
      //console.log('registers before', registers)
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
        if (currentInstructionIdx === 28) {
          console.log('status at 28')
          console.log(registers)
        }
        if (registers[targetRegister] === 0) {
          if (currentInstructionIdx !== 19 && currentInstructionIdx !== 14) {
            console.log(`skip jump!! goto next at ${registers[targetRegister]} idx ${currentInstructionIdx}`)
            console.log(registers)
            //terminate = true
            //return
          }
          currentInstructionIdx++
        } else {
          if (currentInstructionIdx === 28) {
              console.log(`who needs to be 0 to skip but is ${registers[targetRegister]} idx ${currentInstructionIdx}`)
              console.log(registers)
          }
          //console.log(`performing -- because ${registers[targetRegister]}, idx ${currentInstructionIdx}, target ${targetRegister}`)
          //console.log(registers)
          /*if (currentInstructionIdx !== 14) {
            if (registers[targetRegister] > -10) {
              console.log('regs', registers)
            }
            if (registers[targetRegister] === -1700) {
              console.log('regs2', registers)
            }
            if (registers[targetRegister] === undefined) {
              console.log('regs3', registers)
            }
            if (registers[targetRegister] > -107914 && registers[targetRegister] < -107910) {
              console.log('regs4', registers)
            }
            if (targetRegister === "g") {
              console.log('regs5', registers)
            }
          }*/
          currentInstructionIdx = currentInstructionIdx + targetValue
        }
        break;
    }
    //if (targetRegister === "d")
      //console.log('registers after', registers)
  }
}

run()

console.log('End registers', registers)
console.log('mulInstructionsRun', mulInstructionsRun)
