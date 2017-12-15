const { pipeCounter } = require('../day12.js')
const assert = require('assert')
const fs = require('fs')
const contentStrExample = fs.readFileSync('day12_example.txt', 'utf-8')
const contentStrInput = fs.readFileSync('day12_input.txt', 'utf-8')

describe('pipeCounter', () => {
  it('counts example',      () => assert(pipeCounter(contentStrExample) === 6))
  it('counts puzzle input', () => assert(pipeCounter(contentStrInput) === 134))
})