const { hexSteps } = require('../day11.js')
const assert = require('assert')
//const fs = require('fs')
//const contentStr = fs.readFileSync('day11_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe.only('hexSteps', () => {
  it('moves some',      () => assert(hexSteps('ne,ne,ne')       === 3))
  it('moves some more', () => assert(hexSteps('ne,ne,sw,sw')    === 0))
  it('moves again',     () => assert(hexSteps('ne,ne,s,s')      === 2))
  it.only('moves more',      () => assert(hexSteps('se,sw,se,sw,sw') === 3))
})
