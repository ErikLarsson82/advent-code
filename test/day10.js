const { reverser } = require('../day10.js')
const assert = require('assert')
//const fs = require('fs')
//const contentStr = fs.readFileSync('day9_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe.only('reverser', () => {
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
