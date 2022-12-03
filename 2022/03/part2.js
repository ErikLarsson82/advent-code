
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const elves = data.trim().split('\n')
  
  const groups = []
  for (let i = 0; i < elves.length; i+=3) {
    groups.push(
      [
        elves[i + 0],
        elves[i + 1],
        elves[i + 2],
      ]
    )
  }

  const chars = groups.map(findDuplicateInGroups)
  
  const output = chars.map(priority).reduce(sum, 0)
  console.log(output)
})

function findDuplicateInGroups(group) {
  let common
  group[0].split('').forEach(char => {
    if (group[1].includes(char) && group[2].includes(char)) {
      common = char
    }
  })
  if (!common) throw new Error('No common', group)

  return common
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
