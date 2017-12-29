const { curry, times } = require('ramda')

function spinlock(amount) {
  let counter = 0
  let list = [0]
  while(counter < 2017) {
    list = spinlockStep(amount, counter, list)
    counter++
  }
  return list[list.indexOf(2017)+1]
}

function nextPos(steps, prevPos, length) {
  return (prevPos + steps) % length
}

function spinlockStep(steps, id, list) {
  const prevPos = list.indexOf(id)
  const pos = nextPos(steps, prevPos, list.length)
  const one = list.concat().splice(0, pos+1)
  const two = list.concat().splice(pos+1, list.length)
  return ([]).concat(one, ++id, two)
}

module.exports = { spinlock, spinlockStep, nextPos }