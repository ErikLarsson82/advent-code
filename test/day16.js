const { spin, exchange, partner, dance, bitwiseExchange, bitwiseSpin, printBinary } = require('../day16.js')
const assert = require('assert')
const fs = require('fs')
const contentStr = fs.readFileSync('day16_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('dance', () => {
  //it('dances', () => assert( dance(contentStr) === "cknmidebghlajpfo") )
  //it.only('dances on BILLION times', () => console.log(dance(contentStr, 1000000000).join("")) )
})

/*describe('spin', () => {
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
})*/


describe('spin', () => {
  it('spins', () => assert(compare( spin(3, "abcde" ), "cdeab" )))
  it('spins', () => assert(compare( spin(1, "abcde" ), "eabcd" )))
})


describe.only('bitwiseSpin', () => {
  const abcdef = parseInt("000000010010001101000101", 2) //"0000 0001 0010 0011 0100 0101"
  const allF =   parseInt("111111111111111111111111", 2)
  it('spins 1',     () => assert(printBinary(bitwiseSpin(abcdef, 1)) === "010100000001001000110100")) // "0101 0000 0001 0010 0011 0100"
  it('spins 2',     () => assert(printBinary(bitwiseSpin(abcdef, 2)) === "010001010000000100100011")) // "0100 0101 0000 0001 0010 0011"
  it('spins 3',     () => assert(printBinary(bitwiseSpin(abcdef, 3)) === "001101000101000000010010")) // "0011 0100 0101 0000 0001 0010"
  it('spins 4',     () => assert(printBinary(bitwiseSpin(abcdef, 4)) === "001000110100010100000001")) // "0010 0011 0100 0101 0000 0001"
  it('spins all f', () => assert(printBinary(bitwiseSpin(allF  , 1)) === "111111111111111111111111"))
})


describe.only('bitwiseExchange', () => {
  const abcdef = parseInt("000000010010001101000101", 2) //"0000 0001 0010 0011 0100 0101"
  const allF =   parseInt("111111111111111111111111", 2)
  it('exchange pos 0 and 1', () => assert(printBinary(bitwiseExchange(abcdef, 0, 1)) === "000100000010001101000101")) //"0001 0000 0010 0011 0100 0101"
  it('exchange pos 0 and 5', () => assert(printBinary(bitwiseExchange(abcdef, 0, 5)) === "010100010010001101000000")) //"0101 0001 0010 0011 0100 0000"
  it('exchange pos 5 and 1', () => assert(printBinary(bitwiseExchange(abcdef, 5, 1)) === "000001010010001101000001")) //"0000 0101 0010 0011 0100 0001"
  it('exchange pos 0 and 1', () => assert(printBinary(bitwiseExchange(allF  , 0, 1)) === "111111111111111111111111"))
  it('exchange pos 1 and 2', () => assert(printBinary(bitwiseExchange(allF  , 1, 2)) === "111111111111111111111111"))
  it('exchange pos 5 and 1', () => assert(printBinary(bitwiseExchange(allF  , 5, 1)) === "111111111111111111111111"))
})

describe('exchange', () => {
  it('exchanges', () => assert(compare( exchange(3, 4, "eabcd" ), "eabdc" )))
  it('exchanges', () => assert(compare( exchange(0, 1, "abcde" ), "bacde" )))
  it('exchanges', () => assert(compare( exchange(10, 6, "abcdefnhijklmgop" ), "abcdefkhijnlmgop" )))
})


describe('partner', () => {
  it('partners', () => assert(compare( partner("b", "d", "abcde" ), "adcbe" )))
  it('partners', () => assert(compare( partner("a", "e", "abcde" ), "ebcda" )))
})
