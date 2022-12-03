const pipe = (a, b, c) => {
  return x => c(b(a(x)))
}

const prioFromRucksackString = pipe(split, findDuplicate, priority)

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const prioSum = data.trim().split('\n').map(prioFromRucksackString).reduce(sum, 0)
  console.log(prioSum)
})

function split(str) {
  return {
    compartmentA: str.slice(0, str.length / 2),
    compartmentB: str.slice(str.length / 2, str.length)
  }
}

function findDuplicate({ compartmentA, compartmentB }) {
  let char
  compartmentA.split('').forEach(charA => {
    compartmentB.split('').forEach(charB => {
      if (charA === charB) {
        char = charA
      }
    })
  })
  if (!char) {
    throw new Error('Missing char')
  }
  return char
}

function priorityLowercase(char) {
  return char.charCodeAt(0) - 96
}

function priorityUpperCase(char) {
  return char.charCodeAt(0) - 64 + 26
}

function priority(char) {
  return char === char.toUpperCase() ? priorityUpperCase(char) : priorityLowercase(char)
}

function sum(acc, curr) {
  return acc + curr
}
