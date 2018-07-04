const { curry, times } = require('ramda')

const max_size = 50000000 //2017
const list = new Array(max_size+1)

function spinlock(amount) {
  let iteration = 0
  let currentIdx = 0
  list[0] = 0
  while(iteration < max_size) {
    currentIdx = spinlockStep(amount, currentIdx, iteration)
    if (iteration % 10000 === 0)
      console.log(`After iteration ${iteration} idx 1 is: ${list[1]}`)
    iteration++
  }
  const whereIsTarget = list.indexOf(max_size)
  console.log(
    list[whereIsTarget-3],
    list[whereIsTarget-2],
    list[whereIsTarget-1],
    list[whereIsTarget],
    list[whereIsTarget+1],
    list[whereIsTarget+2],
    list[whereIsTarget+3]
  )
  console.log(`List 0: ${list[0]}`)
  console.log(`List 1: ${list[1]}`)
  console.log(`List 2: ${list[2]}`)
  console.log(`List 3: ${list[3]}`)
  return list[list.indexOf(max_size)+1]
}

function genTargetIdx(steps, currentIdx, length) {
  if (length === 1) return 0

  return (steps + currentIdx) % length
}

/*
//Tests
console.log(genTargetIdx(3, 0, 1), genTargetIdx(3, 0, 1) === 0)
console.log(genTargetIdx(3, 1, 2), genTargetIdx(3, 1, 2) === 0)
console.log(genTargetIdx(3, 1, 3), genTargetIdx(3, 1, 3) === 1)
console.log(genTargetIdx(3, 2, 4), genTargetIdx(3, 2, 4) === 1)
console.log(genTargetIdx(3, 2, 5), genTargetIdx(3, 2, 5) === 0)
console.log(genTargetIdx(3, 1, 6), genTargetIdx(3, 1, 6) === 4)
*/

function spinlockStep(steps, currentIdx, iteration) {
  const targetIdx = genTargetIdx(steps, currentIdx, iteration+1)
  for (var i = iteration+1; i >= 0; i--) {
    if (i > targetIdx && list[i-1]) {
      list[i] = list[i-1]
    }
    if (i === targetIdx) {
      list[i+1] = iteration + 1
      return i + 1
    }
  }
  console.log(`this should never happen`)
}

console.log(`Spinlock result: ${spinlock(363)}`)

module.exports = { spinlock, spinlockStep }
