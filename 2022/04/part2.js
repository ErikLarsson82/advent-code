
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const output = data.trim().split('\n').map(prepareRow).map(isSomeOverlap).filter(isContained => isContained === true).length
  console.log(`Fully contained rows: ${output}`)
})

function prepareRow(str) {
  return str.split(',').map(prepareNumbers)
}

function prepareNumbers(str) {
  return str.split('-').map(x => parseInt(x))
}

function asymmetricOverlap(pairA, pairB) {
  const [a1, a2] = pairA
  const [b1, b2] = pairB

  let found = false
  for (let i = a1; i <= a2; i++) {
    for (let j = b1; j <= b2; j++) {
      if (i === j) {
        found = true
      }
    }  
  }
  return found
}

function isSomeOverlap(row) {
  const [a, b] = row
  return asymmetricOverlap(a, b) || asymmetricOverlap(b, a)
}
