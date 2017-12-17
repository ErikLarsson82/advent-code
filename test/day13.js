const { step, packetScanner, firewallDelaySolver } = require('../day13.js')
const assert = require('assert')
const fs = require('fs')
const contentStrExample = fs.readFileSync('day13_example.txt', 'utf-8')
const contentStrInput = fs.readFileSync('day13_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}


describe.only('packetScanner', () => {
  it('scans', () => assert(packetScanner(contentStrExample).severitySum === 24) )
  it('scans', () => assert(packetScanner(contentStrInput).severitySum === 1876) )
})



describe('firewallDelaySolver', () => {
  it.only('finds it', () => console.log(firewallDelaySolver(contentStrExample)))
  it('finds it', () => console.log(firewallDelaySolver(contentStrInput)) )
})



describe.only('step', () => {
  describe('down', () => {
    it('steps starting at one', () => {
      const result = step({ pos: 0, range: 6, down: true })
      const expected =    { pos: 1, range: 6, down: true }
      assert(compare(result, expected))
    })
    it('turns around', () => {
      const result = step({ pos: 5, range: 6, down: true })
      const expected =    { pos: 4, range: 6, down: false }
      assert(compare(result, expected))
    })
    it('turns around a large one', () => {
      const result = step({ pos: 10, range: 11, down: true })
      const expected =    { pos: 9 , range: 11, down: false }
      assert(compare(result, expected))
    })
  })
  describe('up', () => {
    it('turns around', () => {
      const result = step({ pos: 0, range: 6, down: false })
      const expected =    { pos: 1, range: 6, down: true }
      assert(compare(result, expected))
    })
    it('steps to 0', () => {
      const result = step({ pos: 1, range: 6, down: false })
      const expected =    { pos: 0, range: 6, down: false }
      assert(compare(result, expected))
    })
  })
  describe('single range', () => {
    it('stays at one', () => {
      const result = step({ pos: 0, range: 1, down: false })
      const expected =    { pos: 0, range: 1, down: true }
      assert(compare(result, expected))
    })
    it('stays at one inverted', () => {
      const result = step({ pos: 0, range: 1, down: true })
      const expected =    { pos: 0, range: 1, down: false }
      assert(compare(result, expected))
    })
  })
})

