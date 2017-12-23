const { hexToBinary, pad, sectionMarker } = require('../day14.js')
const assert = require('assert')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

const matrix = [
  [1,1,1,0],
  [1,0,0,1],
  [0,0,0,1],
  [1,1,1,1],
]
describe('sectionMarker', () => {
  it.only('traverses', () => console.log( sectionMarker(matrix, [], 0,0) ) )
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
