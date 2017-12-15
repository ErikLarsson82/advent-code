const { hexSteps, distanceRec } = require('../day11.js')
const assert = require('assert')
const fs = require('fs')
const contentStr = fs.readFileSync('day11_input.txt', 'utf-8')
const allowed = ["n","w","s","e",","]

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

describe('hexSteps', () => {
  it('moves some',      () => assert(hexSteps('ne,ne,ne').endDistance       === 3))
  it('moves some more', () => assert(hexSteps('ne,ne,sw,sw').endDistance    === 0))
  it('moves again',     () => assert(hexSteps('ne,ne,s,s').endDistance      === 2))
  it('moves more',      () => assert(hexSteps('se,sw,se,sw,sw').endDistance === 3))
  it('puzzle input',     () => {
    const parsedContent = contentStr.split("").filter( x => allowed.indexOf(x) !== -1 ).join("")
    assert(hexSteps(parsedContent).endDistance === 664)
  })
  it('puzzle input max distance',     () => {
    const parsedContent = contentStr.split("").filter( x => allowed.indexOf(x) !== -1 ).join("")
    assert(hexSteps(parsedContent).max === 1447)
  })
})

describe('distanceRec', () => {
  it('2,2',      () => assert(distanceRec(2,2)    === 2   ))
  it('-2, -2',   () => assert(distanceRec(-2, -2) === 2   ))
  it('0, 100',   () => assert(distanceRec(0, 100) === 100 ))
  it('100, 0',   () => assert(distanceRec(100, 0) === 100 ))
  it('1,2',      () => assert(distanceRec(1,2)    === 2   ))
  it('-2,-1',    () => assert(distanceRec(-2, -1) === 2   ))
  it('2,-1',     () => assert(distanceRec(2, -1)  === 3   ))
  it('-2,1',     () => assert(distanceRec(-2, 1)  === 3   ))
  it('2,3',     () => assert(distanceRec(2, 3)  === 3   ))
  
})    