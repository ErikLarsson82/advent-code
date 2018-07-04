const { spinlock, spinlockStep, nextPos } = require('../day17.js')
const assert = require('assert')
const { equal } = require('assert')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

const steps = 3
const stepsPuzzleInput = 363

describe('spinlock', () => {
  //it('computes example', () => assert( spinlock(steps) === 638) )
  it('computes puzzle input', () => equal( spinlock(stepsPuzzleInput, 2017),  136) )
  it.only('computes part two of puzzle input', () => equal( spinlock(stepsPuzzleInput) === 136) )
})

describe('nextPos', () => {
  it('computes', () => assert(nextPos(steps, 0, 1) === 0))
  it('computes', () => assert(nextPos(steps, 1, 2) === 0))
  it('computes', () => assert(nextPos(steps, 1, 3) === 1))
  it('computes', () => assert(nextPos(steps, 2, 4) === 1))
})

describe('spinlockStep', () => {
  it('a', () => {
    const list = spinlockStep(steps, 0, [0])
    assert( compare(list, [0,1]) )
  })
  it('b', () => {
    const list = spinlockStep(steps, 1, [0,1])
    assert( compare(list, [0,2,1]) )
  })
  it('c', () => {
    const list = spinlockStep(steps, 2, [0,2,1])
    assert( compare(list, [0,2,3,1]) )
  })
  it('d', () => {
    const list = spinlockStep(steps, 3, [0,2,3,1])
    assert( compare(list, [0,2,4,3,1]) )
  })
  it('e', () => {
    const list = spinlockStep(steps, 4, [0,2,4,3,1])
    assert( compare(list, [0,5,2,4,3,1]) )
  })
})
