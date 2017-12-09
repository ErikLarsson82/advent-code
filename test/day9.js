const streamProcesser = require('../day9_part1.js')
const assert = require('assert')
const fs = require('fs')
const contentStr = fs.readFileSync('day9_input.txt', 'utf-8')

describe('streamProcesser', () => {
  it('scores empty', () => {
    assert(streamProcesser('{}') === 1)
  })
  it('scores nested', () => {
    assert(streamProcesser('{{{}}}') === 6)
  })
  it('scores different nested', () => {
    assert(streamProcesser('{{},{}}') === 5)
  })
  it('scores crazy nesting', () => {
    assert(streamProcesser('{{{},{},{{}}}}') === 16)
  })
  it('handles flat garbage', () => {
    assert(streamProcesser('{<a>,<a>,<a>,<a>}') === 1)
  })
  it('handles basic nested chars', () => {
    assert(streamProcesser('{{<ab>},{<ab>},{<ab>},{<ab>}}') === 9)
  })
  it('handles exclamations', () => {
    assert(streamProcesser('{{<!!>},{<!!>},{<!!>},{<!!>}}') === 9)
  })
  it('lots of garbage', () => {
    assert(streamProcesser('{{<a!>},{<a!>},{<a!>},{<ab>}}') === 3)
  })
  it('solves part 1 puzzle input correctly', () => {
    assert(streamProcesser(contentStr) === 7640)
  })
})