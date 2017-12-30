const { duet, excecute } = require('../day18.js')
const assert = require('assert')
const fs = require('fs')
const contentStrEx = fs.readFileSync('day18_example.txt', 'utf-8')
const contentStr = fs.readFileSync('day18_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('duet', () => {
  it('computes example',      () => assert( duet(contentStrEx).recover === 4   ) )
  it('computes puzzle input', () => assert( duet(contentStr).recover   === 3423) )
})
