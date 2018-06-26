const { ok, equal, deepEqual } = require('assert')
const {
  chunkRows,
  joinChunks,
  row,
  column,
  flip,
  compareAll,
  rotation
} = require('../day21_alt.js')
const data = require('../day21_input')

const dataArrays = data.map(({ input, output}) => {
  return { 
    input: input.replace(/\//gi, "").split(""),
    output: output.replace(/\//gi, "").split(""),
  }
})

describe('row', () => {
  it('detects row 0', () => equal(row(4, 2, 0), 0))
  it('detects row 0', () => equal(row(4, 2, 1), 0))
  it('detects row 0', () => equal(row(4, 2, 2), 2))
  it('detects row 2', () => equal(row(4, 2, 3), 2))
  it('detects row 0', () => equal(row(6, 3, 0), 0))
  it('detects row 0', () => equal(row(6, 3, 1), 0))
  it('detects row 0', () => equal(row(6, 3, 2), 0))
  it('detects row 2', () => equal(row(6, 3, 3), 3))
  it('detects row 2', () => equal(row(6, 3, 4), 3))
  it('detects row 2', () => equal(row(6, 3, 5), 3))
  it('detects row 4', () => equal(row(6, 3, 6), 6))
  it('detects row 4', () => equal(row(6, 3, 7), 6))
  it('detects row 4', () => equal(row(6, 3, 8), 6))
  describe('size 36', () => {
    it('detects row 0', () => equal(row(6, 3, 0), 0))
    it('detects row 0', () => equal(row(6, 3, 5), 0))
    it('detects row 1', () => equal(row(6, 3, 6), 3))
  })
})

/*
  4st
  2 = rad 1
  9st
  3 = rad 1
  36
  6 = rad 1
*/
describe('column', () => {
  it('detects column 0', () => equal(column(4, 2, 0), 0))
  it('detects column 1', () => equal(column(4, 2, 1), 2))
  it('detects column 0', () => equal(column(4, 2, 2), 0))
  it('detects column 1', () => equal(column(4, 2, 3), 2))
  it('detects column 0', () => equal(column(6, 3, 0), 0))
  it('detects column 1', () => equal(column(6, 3, 1), 3))
  it('detects column 2', () => equal(column(6, 3, 2), 6))
  it('detects column 0', () => equal(column(6, 3, 3), 0))
  it('detects column 1', () => equal(column(6, 3, 4), 3))
  it('detects column 2', () => equal(column(6, 3, 5), 6))
})

describe('chunks', () => {
  describe('chunkRows', () => {
    it('determines that a 3x3 grid is one chunk', () => {
      const from = [
        [0,1,2],
        [3,4,5],
        [6,7,8]
      ]
      const to = [
        [0,1,2,3,4,5,6,7,8]
      ]
      deepEqual(chunkRows(from), to)
    })
    it('splits 4x4 grid into 2x2 chunks', () => {
      const from = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
      ]
      const to = [
        [0,1,4,5],
        [2,3,6,7],
        [8,9,12,13],
        [10,11,14,15]
      ]
      deepEqual(chunkRows(from), to)
    })
    it('splits 6x6 grid into 3x3 chunks', () => {
      const from = [
        [0, 1, 2, 3, 4, 5 ],
        [6, 7, 8, 9, 10,11],
        [12,13,14,15,16,17],
        [18,19,20,21,22,23],
        [24,25,26,27,28,29],
        [30,31,32,33,34,35],
      ]
      const to = [
        [0,1,2,6,7,8,12,13,14],
        [3,4,5,9,10,11,15,16,17],
        [18,19,20,24,25,26,30,31,32],
        [21,22,23,27,28,29,33,34,35],
      ]
      deepEqual(chunkRows(from), to)
    })
    it('splits 8x8 grid into 2x2 chunks', () => {
      const from = [
        [1,2,0,0,0,0,0,0],
        [3,4,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,5,6],
        [0,0,0,0,0,0,7,8],
      ]
      const to = [
        [1,2,3,4],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [5,6,7,8],
      ]
      deepEqual(chunkRows(from), to)
    })
  })
  describe('joinChunks', () => {
    it('joins 2x2 chunks into a 4x4 grid', () => {
      const from = [
        [0,1,4,5],
        [2,3,6,7],
        [8,9,12,13],
        [10,11,14,15]
      ]
      const to = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
      ]
      deepEqual(joinChunks(from), to)
    })
    it('joins 2x2 chunks into a 4x4 grid', () => {
      const from = [
        [0,1,4,5],
        [2,3,6,7],
        [8,9,12,13],
        [10,11,14,15]
      ]
      const to = [
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
      ]
      deepEqual(joinChunks(from), to)
    })
    it('joins 3x3 chunks into a 6x6 grid', () => {
      const from = [
        [0,1,2,6,7,8,12,13,14],
        [3,4,5,9,10,11,15,16,17],
        [18,19,20,24,25,26,30,31,32],
        [21,22,23,27,28,29,33,34,35]
      ]
      const to = [
        [0, 1, 2, 3, 4, 5 ],
        [6, 7, 8, 9, 10,11],
        [12,13,14,15,16,17],
        [18,19,20,21,22,23],
        [24,25,26,27,28,29],
        [30,31,32,33,34,35],
      ]
      //console.log(joinChunks(from), to)
      deepEqual(joinChunks(from), to)
    })
    it('joins 3x3 chunks into a 6x6 grid easy', () => {
      const from = [
        [0,0,0,0,0,0,0,0,0],
        [1,1,1,1,1,1,1,1,1],
        [2,2,2,2,2,2,2,2,2],
        [3,3,3,3,3,3,3,3,3]
      ]
      const to = [
        [0, 0, 0, 1, 1, 1 ],
        [0, 0, 0, 1, 1, 1 ],
        [0, 0, 0, 1, 1, 1 ],
        [2, 2, 2, 3, 3, 3 ],
        [2, 2, 2, 3, 3, 3 ],
        [2, 2, 2, 3, 3, 3 ]
      ]
      console.log(joinChunks(from), to)
      deepEqual(joinChunks(from), to)
    })
    it('joins chunks into a 8x8 grid', () => {
      const from = [
        [1,2,3,4],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [5,6,7,8],
      ]
      const to = [
        [1,2,0,0,0,0,0,0],
        [3,4,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,5,6],
        [0,0,0,0,0,0,7,8],
      ]
      deepEqual(joinChunks(from), to)
    })
  })
})


const baseFour = [[1,2], [3,4]]
const baseNine = ["123", "456", "789"]

describe('flip', () => {
  describe('twos', () => {
    it('flips a grid h', () => deepEqual(flip(["#",".",".","."], true), [".","#",".","."]) )
    it('flips a grid v', () => deepEqual(flip(["#",".",".","."], false), [".",".","#","."]) )
  })
  describe('threes', () => {
    it('flips a grid h', () => deepEqual(flip(baseNine, true), ["321", "654", "987"]) )
    it('flips a grid v', () => deepEqual(flip(baseNine, false), ["789", "456", "123"]) )
  })
})

describe('rotation', () => {
  describe('twos', () => {
    it('rotates a grid once',   () => deepEqual(rotation(baseFour, 1), [3,1,4,2]) )
    it('rotates a grid twice',  () => deepEqual(rotation(baseFour, 2), [4,3,2,1]) )
    it('rotates a grid thrice', () => deepEqual(rotation(baseFour, 3), [2,4,1,3]) )
    it('rotates a grid once',   () => deepEqual(rotation(["#",".",".","."], 1), [".","#",".","."]) )
    it('rotates a grid twice',  () => deepEqual(rotation(["#",".",".","."], 2), [".",".","#","."]) )
    it('rotates a grid thrice', () => deepEqual(rotation(["#",".",".","."], 3), [".",".",".","#"]) )
  })
  describe('threes', () => {
    it('rotates a grid once',   () => deepEqual(rotation(baseNine, 1), ["741", "852", "963"]) ) //781, 692, 543
    it('rotates a grid twice',  () => deepEqual(rotation(baseNine, 2), ["987", "654", "321"]) )
    it('rotates a grid thrice', () => deepEqual(rotation(baseNine, 3), ["369", "258", "147"]) )
  })
})

describe.only('compareAll', () => {
  describe('twos', () => {
    it.only('detects flip', () => ok(compareAll(["#",".",".","."], [".","#",".","."])) )
    it('detects flip', () => ok(compareAll(["#",".",".","."], [".",".","#","."])) )
    it('detects rotation', () => ok(compareAll(["#",".",".","."], [".","#",".","."])) )
    it('detects rotation', () => ok(compareAll(["#",".",".","."], [".",".",".","#"])) )
    it('detects rotation', () => ok(compareAll(["#",".",".","."], [".",".","#","."])) )
    it('detects nothing', () => ok(!compareAll(["#",".",".","."], [".",".",".","."])) )
  })
  describe('threes', () => {
    it('detects flip', () => ok(compareAll([1,0,0,0,0,0,0,0,0], [0,0,1,0,0,0,0,0,0])) )
    /*it('detects flip', () => ok(compareAll(["#.#", "...", "..."], ["...", "...", "#.#"])) )
    it('detects roation', () => ok(compareAll(["#.#", "...", "..."], ["..#", "...", "..#"])) )
    it('detects roation', () => ok(compareAll(["#.#", "...", "..."], ["...", "...", "#.#"])) )
    it('detects roation', () => ok(compareAll(["#.#", "...", "..."], ["#..", "...", "#.."])) )
    it('detects nothing', () => ok(!compareAll(["#.#", "...", "..."], ["...", ".#.", "..."])) )*/
  })
})