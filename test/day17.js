const { spinlock, spinlockStep } = require('../day17.js')
const assert = require('assert')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('spinlock', () => {
  //it('computes', () => assert(true) )
})

describe('spinlockStep', () => {
  it('a', () => {
    const result = spinlockStep(3, 0, 0, [0])
    assert( compare(result.list, [0,1] ) && result.currPos === 1)
  })
  it('b', () => {
    const result = spinlockStep(3, 1, 1, [0,1])
    assert( compare(result.list, [0,2,1] ) && result.currPos === 1)
  })
  it('c', () => {
    const result = spinlockStep(3, 2, 1, [0,2,1])
    assert( compare(result.list, [0,2,3,1] ) && result.currPos === 2)
  })
  it('d', () => {
    const result = spinlockStep(3, 3, 2, [0,2,3,1])
    assert( compare(result, [0,2,4,3,1] ) && result.currPos ===  2)
  })
  it('e', () => {
    const result = spinlockStep(3, 4, 2, [0,2,4,3,1])
    assert( compare(result.list, [0,5,2,4,3,1] ) && result.currPos === 1 )
  })
  /*
  it('f', () => assert( compare(spinlockStep(3, 5, 2, [0,5,2,4,3,1]), [0,5,2,4,3,6,1] ) ))
  it('g', () => assert( compare(spinlockStep(3, 6, 1, [0,5,2,4,3,6,1]), [0,5,7,2,4,3,6,1] ) ))
  it('h', () => assert( compare(spinlockStep(3, 7, 5, [0,5,7,2,4,3,6,1]), [0,5,7,2,4,3,8,6,1] ) ))
  it('i', () => assert( compare(spinlockStep(3, 8, 2, [0,5,7,2,4,3,8,6,1]), [0,9,5,7,2,4,3,8,6,1] ) ))
  */
})
