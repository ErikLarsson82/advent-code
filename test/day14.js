const { discDefrag, hexToBinary, pad, sectionMarker, matrixReplacer, discUsed } = require('../day14.js')
const assert = require('assert')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

const matrix = [
  [1,1,1,0],
  [1,0,0,1],
  [0,0,0,0],
  [1,0,1,1],
]


describe('discUsed', () => {
  it('counts', () => {
    const disc = discDefrag('jzgqcdpd')
    assert( discUsed(disc, "1") === 8074)
  })
})

describe('sectionMarker', () => {
  it('traverses', () => {
    const result = sectionMarker(matrix, [], 3,1)
    const expected = []
    assert( compare( result, expected ) )
  })
  it('traverses', () => {
    const result = sectionMarker(matrix, [], 3,3)
    const expected = [{ x: 3, y: 2 }, { x: 3, y: 3 }]
    assert( compare( result, expected ) )
  })
  it('traverses', () => {
    const result = sectionMarker(matrix, [], 3,0)
    const expected = [{ x: 3, y: 0 }]
    assert( compare( result, expected ) )
  })
  it('traverses', () => {
    const result = sectionMarker(matrix, [], 0,0)
    const expected = [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 0 }, { x: 0, y: 0 }]
    assert( compare( result, expected ) )
  })
})

describe('matrixReplacer', () => {
  it('replaces a region with nines', () => {
    const result = matrixReplacer(matrix, 9)
    const expected = [ [ 9, 9, 9, 0 ], [ 9, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]
    assert( compare( result, expected ) )
  })
})

describe('hexToBinary', () => {
  it('converts 0', () => assert(hexToBinary('0') === '0000') )
  it('converts 1', () => assert(hexToBinary('1') === '0001') )
  it('converts e', () => assert(hexToBinary('e') === '1110') )
  it('converts f', () => assert(hexToBinary('f') === '1111') )
})

describe('pad', () => {
  it('converts 0', () =>          assert(pad('0')    === '0000') )
  it('converts 1', () =>          assert(pad('1')    === '0001') )
  it('converts 10', () =>         assert(pad('10')   === '0010') )
  it('converts 100', () =>        assert(pad('100')  === '0100') )
  it('doesn\'t touch 1010', () => assert(pad('1010') === '1010') )
})
