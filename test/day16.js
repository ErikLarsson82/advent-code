const { spin, exchange, partner, dance } = require('../day16.js')
const assert = require('assert')
const fs = require('fs')
const contentStr = fs.readFileSync('day16_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('dance', () => {
  it('dances', () => assert( dance(contentStr).join("") === "cknmidebghlajpfo") )
})

describe('spin', () => {
  it('spins', () => assert(compare( spin(3, ["a","b","c","d","e"] ), ["c","d","e","a","b"] )))
  it('spins', () => assert(compare( spin(1, ["a","b","c","d","e"] ), ["e","a","b","c","d"] )))
})

describe('exchange', () => {
  it('exchanges', () => assert(compare( exchange(3, 4, "eabcd".split("") ), "eabdc".split("") )))
  it('exchanges', () => assert(compare( exchange(0, 1, "abcde".split("") ), "bacde".split("") )))
})


describe('partner', () => {
  it('partners', () => assert(compare( partner("b", "d", "abcde".split("") ), "adcbe".split("") )))
  it('partners', () => assert(compare( partner("a", "e", "abcde".split("") ), "ebcda".split("") )))
})
