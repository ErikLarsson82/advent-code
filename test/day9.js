const { streamProcessor, streamHandler } = require('../day9.js')
const assert = require('assert')
const fs = require('fs')
const contentStr = fs.readFileSync('day9_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('streamProcessor', () => {
  it('scores empty', () => {
    assert(streamProcessor('{}').score === 1)
  })
  it('scores nested', () => {
    assert(streamProcessor('{{{}}}').score === 6)
  })
  it('scores different nested', () => {
    assert(streamProcessor('{{},{}}').score === 5)
  })
  it('scores crazy nesting', () => {
    assert(streamProcessor('{{{},{},{{}}}}').score === 16)
  })
  it('handles flat garbage', () => {
    assert(streamProcessor('{<a>,<a>,<a>,<a>}').score === 1)
  })
  it('handles basic nested chars', () => {
    assert(streamProcessor('{{<ab>},{<ab>},{<ab>},{<ab>}}').score === 9)
  })
  it('handles exclamations', () => {
    assert(streamProcessor('{{<!!>},{<!!>},{<!!>},{<!!>}}').score === 9)
  })
  it('lots of garbage', () => {
    assert(streamProcessor('{{<a!>},{<a!>},{<a!>},{<ab>}}').score === 3)
  })
  it('solves part 1 puzzle input', () => {
    assert(streamProcessor(contentStr).score === 7640)
  })
  it('solves part 2 puzzle input', () => {
    assert(streamProcessor(contentStr).garbageCollected === 4368)
  })
})

describe('streamHandler', () => {
  it('dwelves deeper when finding start of block', () => {
    const inputState = {
      score: 0,
      depth: 1,
      garbage: false,
      garbageCollected: 0,
      ignore: false
    }
    const expected = {
      score: 0,
      depth: 2,
      garbage: false,
      garbageCollected: 0,
      ignore: false
    }
    assert(compare(streamHandler(inputState, '{'), expected))
  })
  it('closes garbage', () => {
    const inputState = {
      score: 0,
      depth: 1,
      garbage: true,
      garbageCollected: 0,
      ignore: false
    }
    const expected = {
      score: 0,
      depth: 1,
      garbage: false,
      garbageCollected: 0,
      ignore: false
    }
    assert(compare(streamHandler(inputState, '>'), expected))
  })
  it('closes block and gives points', () => {
    const inputState = {
      score: 0,
      depth: 2,
      garbage: false,
      garbageCollected: 0,
      ignore: false
    }
    const expected = {
      score: 2,
      depth: 1,
      garbage: false,
      garbageCollected: 0,
      ignore: false
    }
    assert(compare(streamHandler(inputState, '}'), expected))
  })
  describe('ignores all types of characters after !', () => {
    const inputState = {
      score: 0,
      depth: 1,
      garbage: false,
      garbageCollected: 0,
      ignore: true
    }
    it('ignores }', () => {
      const expected = {
        score: 0,
        depth: 1,
        garbage: false,
        garbageCollected: 0,
        ignore: false
      }
      assert(compare(streamHandler(inputState, '}'), expected))
    })
    it('ignores <', () => {
      const expected = {
        score: 0,
        depth: 1,
        garbage: false,
        garbageCollected: 0,
        ignore: false
      }
      assert(compare(streamHandler(inputState, '<'), expected))
    })
    it('ignores !', () => {
      const expected = {
        score: 0,
        depth: 1,
        garbage: false,
        garbageCollected: 0,
        ignore: false
      }
      assert(compare(streamHandler(inputState, '!'), expected))
    })
  })
})