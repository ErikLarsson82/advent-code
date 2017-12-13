const { reverser, knotHash, densify, pad, paddedHex, hashDenser } = require('../day10_part2.js')
const xor = require('buffer-xor')
const assert = require('assert')
const _ = require('underscore')
const fs = require('fs')
const contentStr = fs.readFileSync('day10_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('pad', () => {
  it('doesn\'t touch double digits', () => assert( pad("5b") === "5b") )
  it('adds a zero to single digits', () => assert( pad("9") === "09") )
  it('adds two zeroes to nothing', () => assert( pad() === "00") )
})

describe('paddedHex', () => {
  it('converts', () => assert( paddedHex("65") === "41") )
  it('converts and pads', () => assert( paddedHex("9") === "09") )
})

describe('densify', () => {
  it('iterates once', () => {
    const result = densify( { idx: 0, denseList: [] }, paddedHex("65") )
    const expected = { idx: 1, denseList :[], accumulator: { type: "Buffer", "data": [65] } }
    assert(compare(result, expected))
  })
  it('iterates again', () => {
    const result = densify( { idx: 1, denseList: [], accumulator: new Buffer("41", "hex") }, paddedHex("27") )
    const expected = { idx: 2, denseList :[], accumulator: { type: "Buffer", "data": [90] } }
    assert(compare(result, expected ))
  })
  it('adds nr 16 to the list', () => {
    const expected = { idx: 16, denseList :[ "64" ] }
    const result = densify( { idx: 15, denseList: [], accumulator: new Buffer("56", "hex") }, paddedHex("22") )
    assert(compare(result, expected ))
  })
})

describe('hashDenser', () => {
  it('dense hashes this example', () => {
    assert(compare(hashDenser([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22]).denseList, ["64"]))
  })
})

describe('knotHash', () => {
  describe.only('hashes', () => {
    it('hashes an empty string', () => assert( knotHash("")         === "a2582a3a0e66e6e86e3812dcb672a272" ) )
    it('hashes "AoC 2017"',      () => assert( knotHash("AoC 2017") === "33efeb34ea91902bb2f59c9920caa6cd" ) )
    it('hashes "1,2,3"',         () => assert( knotHash("1,2,3")    === "3efbe78a8d82f29979031a4aa0b16a9d" ) )
    it('hashes "1,2,4"',         () => assert( knotHash("1,2,4")    === "63960835bcdc130f0b66d7ff4f6a5a8e" ) )

    it.only('hashes the puzzle input', () => {
      const allowed = ["0","1","2","3","4","5","6","7","8","9",","]
      const parsedContent = contentStr.split("").filter( x => allowed.indexOf(x) !== -1 ).join("")
      const result = knotHash(contentStr)
      console.log(JSON.stringify(parsedContent))
      console.log(result)
      //assert( result === "63960835bcdc130f0b66d7ff4f6a5a8e" ) 
    })
  })
  it('hashes an easy one', () => {
    const expected = _.range(0, 255)
    expected[0] = 4
    expected[1] = 3
    expected[2] = 2
    expected[3] = 1
    expected[4] = 0
    assert(compare(knotHash([5]).list, expected))
  })
  it('hashes the example one', () => {
    const expected = [3, 4, 2, 1, 0]
    const result = knotHash([3, 4, 1, 5], 5)
    assert(compare(result.list, expected))
  })
  it('hashes the puzzle input', () => {
    const expected = [170,172,173,174,175,176,177,178,179,180,181,182,11,10,9,8,7,6,5,4,3,2,1,0,76,77,165,164,163,162,161,160,159,158,157,156,155,154,153,152,151,42,43,44,45,46,47,48,49,50,51,52,53,54,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,150,149,148,147,146,250,249,248,247,246,245,244,243,242,241,240,239,238,237,236,235,234,233,232,231,230,229,228,227,226,225,224,223,222,221,220,219,218,217,216,215,214,213,212,211,210,209,208,207,206,205,204,203,202,201,200,199,198,197,196,195,194,193,192,191,190,189,188,187,186,185,184,183,12,254,253,252,251,145,144,143,142,141,140,139,23,22,21,19,20,18,17,16,167,166,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,13,255,75,74,73,72,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,55,26,25,24,138,14,15,168,169,171]
    const result = knotHash([76,1,88,148,166,217,130,0,128,254,16,2,130,71,255,229], 256)
    assert(compare(result.list, expected))
    assert(compare(result.firstEntries, 29240))
  })
})

describe('reverser', () => {
  describe('wrap', () => {
    it('solves length 1', () => {

    })
  })
  it('reverses a list with no wrap', () => {
    const input =    [10, 20, 30, 40, 50]
    const expected = [30, 20, 10, 40, 50]
    const position = 0
    const length = 3
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses another list with no wrap', () => {
    const input =    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    const expected = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10]
    const position = 0
    const length = 10
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses the longest wrapper', () => {
    const input =    [0,1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,18,19]
    const expected = [19,18,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,0]
    const position = 18
    const length = 4
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses the longestest wrapper', () => {
    const input =    [0,9,9,9,9,9,9,9,9,9,9,9,9,9,14,15,16,17,18,19]
    const expected = [14,9,9,9,9,9,9,9,9,9,9,9,9,9,0,19,18,17,16,15]
    const position = 14
    const length = 7
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses the longestest wrapper alt.', () => {
    const input =    [0,1,2,3,4,9,9,9,9,9,9,9,9,9,9,9,9,9,9,19]
    const expected = [3,2,1,0,19,9,9,9,9,9,9,9,9,9,9,9,9,9,9,4]
    const position = 19
    const length = 6
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses a very small list with wrap', () => {
    const input =    [10, 20, 30]
    const expected = [30, 20, 10]
    const position = 2
    const length = 2
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses a small list stretchy wrap', () => {
    const input =    [10, 20, 30, 40]
    const expected = [10, 40, 30, 20]
    const position = 3
    const length = 3
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses a small list stretchy wrap alt', () => {
    const input =    [10, 20, 30, 40]
    const expected = [40, 20, 30, 10]
    const position = 3
    const length = 2
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses another small stretchy wrap list', () => {
    const input =    [10, 20, 30, 40] // 10), (20, 30, 40
    const expected = [40, 20, 30, 10] // 20, 10, 40 ,30
    const position = 3
    const length = 2
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses a list with basic wrap', () => {
    const input =    [10, 20, 30, 40, 50, 60]
    const expected = [60, 50, 30, 40, 20, 10]
    const position = 4
    const length = 4
    assert(compare(reverser(input, position, length), expected))
  })
  it('reverses another list with basic wrap', () => {
    const input =    [10, 20, 30, 40, 50, 60, 70]
    const expected = [70, 20, 30, 40, 50, 60, 10]
    const position = 6
    const length = 2
    assert(compare(reverser(input, position, length), expected))
  })
  it('does nothing when length is 1', () => {
    const input =    [10, 20, 30, 40, 50, 60]
    const position = 0
    const length = 1
    assert(compare(reverser(input, position, length), input))
  })
})

/*

65 ^ 27 ^ 9 ^ 1 ^ 4 ^ 3 ^ 40 ^ 50 ^ 91 ^ 7 ^ 6 ^ 0 ^ 2 ^ 5 ^ 68 ^ 22 = 64

base 10:
65 ^ 27 = 90
90   9  = 83
83   1  = 82
82   4  = 86
86   3  = 85
85   40 = 125
125  50 = 79
79   91 = 20
20    7 = 19
19    6 = 21
21    0 = 21
21    2 = 23
23    5 = 18
18   68 = 86
86   22 = 64

*/