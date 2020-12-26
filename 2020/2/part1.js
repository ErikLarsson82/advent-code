require('fs').readFile('./puzzle-input.txt', 'utf-8', run)

function run(err, data) {
  let program = parse(data)

  // First instructions
  program[1] = 12
  program[2] = 2

  let instructionPos = 0

  do {
    const instruction = program.slice(instructionPos, instructionPos+4)

    if (instruction.length === 0) {
      console.log('Something went wrong')
      break
    }
    if (instruction[0] === 99) {
      console.log('Done')
      break
    }

    if (instruction[0] === 1) {
      // Opcode 1
      program[instruction[3]] = program[instruction[1]] + program[instruction[2]]
    }

    if (instruction[0] === 2) {
      // Opcode 2
      program[instruction[3]] = program[instruction[1]] * program[instruction[2]]
    }

    instructionPos += 4

  } while (true)

  console.log('2020 / 2 / Part 1\nPosition 0:', program[0])
}

function parse(data) {
  return data.trim()
    .split(',')
    .map(x => x.trim())
    .map(x => parseInt(x))
}