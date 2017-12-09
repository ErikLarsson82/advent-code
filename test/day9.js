const streamProcesser = require('../day9.js')
const assert = require('assert')
const fs = require('fs')
const contentStr = fs.readFileSync('day9_input.txt', 'utf-8')

describe('streamProcesser', () => {
  it('scores empty', () => {
    assert(streamProcesser('{}').score === 1)
  })
  it('scores nested', () => {
    assert(streamProcesser('{{{}}}').score === 6)
  })
  it('scores different nested', () => {
    assert(streamProcesser('{{},{}}').score === 5)
  })
  it('scores crazy nesting', () => {
    assert(streamProcesser('{{{},{},{{}}}}').score === 16)
  })
  it('handles flat garbage', () => {
    assert(streamProcesser('{<a>,<a>,<a>,<a>}').score === 1)
  })
  it('handles basic nested chars', () => {
    assert(streamProcesser('{{<ab>},{<ab>},{<ab>},{<ab>}}').score === 9)
  })
  it('handles exclamations', () => {
    assert(streamProcesser('{{<!!>},{<!!>},{<!!>},{<!!>}}').score === 9)
  })
  it('lots of garbage', () => {
    assert(streamProcesser('{{<a!>},{<a!>},{<a!>},{<ab>}}').score === 3)
  })
  it('solves part 1 puzzle input correctly', () => {
    assert(streamProcesser(contentStr).score === 7640)
  })
  it('solves part 2 puzzle input correctly', () => {
    assert(streamProcesser(contentStr).garbageCollected === 4368)
  })
})