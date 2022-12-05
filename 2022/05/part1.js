const exampleStacks = [
  ['Z', 'N'],
  ['M', 'C', 'D'],
  ['P']
]

let stacks = new Array(9).fill().map(() => [])
let moves

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  
  const [initialStacks, moveSet] = data.trim().split('\n\n')
  console.log('Initial stacks', initialStacks)

  parseInitialStacks(initialStacks)
  executeMoveSet(moveSet)

  console.log('Stacks after moves', stacks)
  console.log('Final end stack string', popAllStacks())
})

function executeMoveSet(str) {
  str.trim().split('\n').forEach(instructionStr => {
    const [,amount,,fromIdx,,toIdx] = instructionStr.split(' ')
    moveStacks(parseInt(amount), parseInt(fromIdx), parseInt(toIdx))
  })
}

function parseInitialStacks(str) {
  let indexes = []
  for (let i = 1; i < 7 * 5; i += 4) {
    indexes.push(i)
  }
  str.split('\n').forEach((row, idx) => {
    indexes.forEach((valueFoundAt, arrayIndex) => {
      if (!isNaN(parseInt(row[valueFoundAt])) || ['[', ']', ' '].includes(row[valueFoundAt])) return
      stacks[arrayIndex].unshift(row[valueFoundAt])
    })
  })
}

function move(fromIdx, toIdx) {
  let crate = stacks[fromIdx].pop(1)
  stacks[toIdx].push(crate)
}

function moveStacks(amount, fromIdx, toIdx) {
  for (var i = 0; i < amount; i++) {
    move(fromIdx-1, toIdx-1)
  }
}

function popAllStacks() {
  let str = ''
  stacks.forEach(stack => {
    str += stack.slice(stack.length-1)
  })
  return str
}
