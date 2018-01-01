const { times } = require('ramda')
const clone = require('clone')
const fs = require('fs')
const contentStrEx = fs.readFileSync('day19_example.txt', 'utf-8')
const contentStr = fs.readFileSync('day19_input.txt', 'utf-8')

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function fractalArt() {
  const grid = [
    ".#.",
    "..#",
    "###"
  ]
  
  console.log(grid[1][0])
}

function rotation(grid, amount) {
  let newGrid = clone(grid)
  if (grid.length === 2)
    times( () => newGrid = rotationTwo(newGrid), amount)
  if (grid.length === 3)
    times( () => newGrid = rotationThree(newGrid), amount)
  return newGrid
}

function rotationTwo(grid, amount) {
  const rotatedGrid = clone(grid).map(x => x.split(""))
  rotatedGrid[0][0] = grid[1][0]
  rotatedGrid[0][1] = grid[0][0]
  rotatedGrid[1][0] = grid[1][1]
  rotatedGrid[1][1] = grid[0][1]
  return rotatedGrid.map( x => x.join("") )
}

function rotationThree(grid, amount) {
  const rotatedGrid = clone(grid).map(x => x.split(""))
  rotatedGrid[0][0] = grid[2][0]
  rotatedGrid[0][1] = grid[1][0]
  rotatedGrid[0][2] = grid[0][0]
  rotatedGrid[1][0] = grid[2][1]
  rotatedGrid[1][1] = grid[1][1]
  rotatedGrid[1][2] = grid[0][1]
  rotatedGrid[2][0] = grid[2][2]
  rotatedGrid[2][1] = grid[1][2]
  rotatedGrid[2][2] = grid[0][2]
  
  return rotatedGrid.map( x => x.join("") )
}
 
function flip(_grid, dir) {
  let grid = clone(_grid)
  if (dir) {
    return grid.map(x => x.split("").reverse().join("") )
  } else {
    return grid.reverse()
  }
}

function compareAll(grid, comparee) {
  const list = [
    flip(comparee, true),
    flip(comparee, false),
    rotation(comparee, 1),
    rotation(comparee, 2),
    rotation(comparee, 3)
  ]
  return !!list.find( x => compare(grid, x) )
}

function conjoin(list) {
  if (list[0].length === 2) {
    list = list.map(x => x.map( y => y.split("")))
    const newGrid = [
      list[0][0].concat(list[1][0]),
      list[0][1].concat(list[1][1]),
      list[2][0].concat(list[3][0]),
      list[2][1].concat(list[3][1])
    ]
    return newGrid.map( x => x.join(""))
  }
  if (list[0].length === 3) {
    list = list.map(x => x.map( y => y.split("")))
    const newGrid = [
      list[0][0].concat(list[1][0]),
      list[0][1].concat(list[1][1]),
      list[0][2].concat(list[1][2]),
      list[2][0].concat(list[3][0]),
      list[2][1].concat(list[3][1]),
      list[2][2].concat(list[3][2]),
    ]
    return newGrid.map( x => x.join(""))
  }
}

function genericConjoin(list) {
  
}

function split(grid) {
  return []
}

fractalArt()

module.exports = { fractalArt, rotation, flip, compareAll, conjoin, split }