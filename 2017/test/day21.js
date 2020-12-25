const { fractalArt, flip, compareAll, rotation, conjoin, split } = require('../day21.js')
const assert = require('assert')
const fs = require('fs')
//const contentStrEx = fs.readFileSync('day21_example.txt', 'utf-8')
//const contentStr = fs.readFileSync('day21_input.txt', 'utf-8')

function compare(a, b) {
  return assert(JSON.stringify(a) === JSON.stringify(b))
}

describe('fractalArt', () => {
  it('computes example', () => assert(true) )
})

const baseFour = ["12", "34"]
const baseNine = ["123", "456", "789"]

describe('conjoin', () => {
  it('joins four two wide grids', () => {
    /*
      12  56
      34  78
      
      90  cd
      ab  ef
    */
    const input = [
      ["12","34"],
      ["56","78"],
      ["90","ab"],
      ["cd","ef"]
    ]
    const expected = [
      "1256",
      "3478",
      "90cd",
      "abef",
    ]
    return compare(conjoin(input), expected) 
  })
  it('joins four three wide grids', () => {
    /*
      123  abc
      456  def
      789  ijk

      lmn  uvx
      opq  yzå
      rst  äö.
    */
    const input = [
      ["123", "456", "789"],
      ["abc", "def", "ijk"],
      ["lmn", "opq", "rst"],
      ["uvx", "yzå", "äö."]
    ]
    const expected = [
      "123abc",
      "456def",
      "789ijk",
      "lmnuvx",
      "opqyzå",
      "rstäö.",
    ]
    compare(conjoin(input), expected)
  })
})

describe('flip', () => {
  describe('twos', () => {
    it('flips a grid h', () => compare(flip(["#.", ".."], true), [".#", ".."]) )
    it('flips a grid v', () => compare(flip(["#.", ".."], false), ["..", "#."]) )
  })
  describe('threes', () => {
    it('flips a grid h', () => compare(flip(baseNine, true), ["321", "654", "987"]) )
    it('flips a grid v', () => compare(flip(baseNine, false), ["789", "456", "123"]) )
  })
})

describe('rotation', () => {
  describe('twos', () => {
    it('rotates a grid once',   () => compare(rotation(baseFour, 1), ["31", "42"]) )
    it('rotates a grid twice',  () => compare(rotation(baseFour, 2), ["43", "21"]) )
    it('rotates a grid thrice', () => compare(rotation(baseFour, 3), ["24", "13"]) )
  })
  describe('threes', () => {
    it('rotates a grid once',   () => compare(rotation(baseNine, 1), ["741", "852", "963"]) )
    it('rotates a grid twice',  () => compare(rotation(baseNine, 2), ["987", "654", "321"]) )
    it('rotates a grid thrice', () => compare(rotation(baseNine, 3), ["369", "258", "147"]) )
  })
})

describe('compareAll', () => {
  describe('twos', () => {
    it('detects flip', () => assert(compareAll(["#.", ".."], [".#", ".."])) )
    it('detects flip', () => assert(compareAll(["#.", ".."], ["..", "#."])) )
    it('detects rotation', () => assert(compareAll(["#.", ".."], [".#", ".."])) )
    it('detects rotation', () => assert(compareAll(["#.", ".."], ["..", ".#"])) )
    it('detects rotation', () => assert(compareAll(["#.", ".."], ["..", "#."])) )
  })
  describe('threes', () => {
    it('detects flip', () => assert(compareAll(["#..", "...", "..."], ["..#", "...", "..."])) )
    it('detects flip', () => assert(compareAll(["#.#", "...", "..."], ["...", "...", "#.#"])) )
    it('detects roation', () => assert(compareAll(["#.#", "...", "..."], ["..#", "...", "..#"])) )
    it('detects roation', () => assert(compareAll(["#.#", "...", "..."], ["...", "...", "#.#"])) )
    it('detects roation', () => assert(compareAll(["#.#", "...", "..."], ["#..", "...", "#.."])) )
  })
})
