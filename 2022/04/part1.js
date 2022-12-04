
require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  const output = data.trim().split('\n').map(prepareRow).map(isFullyContained).filter(isContained => isContained === true).length
  console.log(`Fully contained rows: ${output}`)
})

function prepareRow(str) {
  return str.split(',').map(prepareNumbers)
}

function prepareNumbers(str) {
  return str.split('-').map(x => parseInt(x))
}

function asymmetricContained(pairA, pairB) {
  const [a1, a2] = pairA
  const [b1, b2] = pairB

  return (a1 <= b1 && a2 >= b2)
}

function isFullyContained(row) {
  const [a, b] = row
  return asymmetricContained(a, b) || asymmetricContained(b, a)
}
