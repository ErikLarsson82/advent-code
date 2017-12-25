const { curry, times } = require('ramda')

function spinlock() {
  
}

function spinlockStep(steps, id, step, list) {
  const idx = (id + steps+ step) % list.length
  console.log('final id', idx)
  return {
    list,
    id: idx
  }
}

module.exports = { spinlock, spinlockStep }