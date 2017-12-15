const { pipeCounter, foundInList, archive } = require('../day12.js')
const assert = require('assert')
const fs = require('fs')
const contentStrExample = fs.readFileSync('day12_example.txt', 'utf-8')
const contentStrInput = fs.readFileSync('day12_input.txt', 'utf-8')

describe('pipeCounter', () => {
  it('counts example', () => assert(pipeCounter(contentStrExample)[0]().length === 6))
  it('counts puzzle input', () => assert(pipeCounter(contentStrInput)[0]().length === 134))

  it('counts groups of example input', () => assert(pipeCounter(contentStrExample).length === 2))
  it('counts groups of pussle input', () => assert(pipeCounter(contentStrInput).length === 193))
})


describe('foundInList', () => {
  it('finds one', () => {
    const a1 = archive()
    a1(0)
    assert(foundInList([a1], 0) === 0)
  })
  it('finds another', () => {
    const a1 = archive()
    a1(0)
    a1(2)
    a1(3)
    a1(4)
    assert(foundInList([a1], 2) !== -1)
  })
  it('doesnt find one', () => {
    const a1 = archive()
    a1(0)
    const a2 = archive()
    a2(500)
    a2(510)
    assert(foundInList([a1, a2], 700) === -1)
  })
})