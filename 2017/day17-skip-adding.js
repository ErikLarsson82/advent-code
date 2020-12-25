const { curry, times } = require('ramda')

const max_size = 50000000

function spinlock(amount) {
  let iteration = 0
  let currentIdx = 0
  let afterFirst = 0
  while(iteration < max_size) {
    currentIdx = genTargetIdx(amount, currentIdx, iteration)
    if (currentIdx === 0) {
      console.log(`New idx after first: ${iteration}`)
      afterFirst = iteration
    }
    currentIdx++
    if (iteration % 10000 === 0)
      console.log(`Iteration ${iteration}`)
    iteration++
  }
  console.log(`Index 1 contains: ${afterFirst}`)
}

function genTargetIdx(steps, currentIdx, length) {
  if (length === 1) return 0

  return (steps + currentIdx) % length
}

console.time('spinlock')
spinlock(363)
console.timeEnd('spinlock')

module.exports = { spinlock }
