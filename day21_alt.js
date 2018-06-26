const data = require('./day21_input')
const { times } = require('ramda')
const clone = require('clone')

const startGrid = [[".", "#", "."], [".", ".", "#"], ["#", "#", "#"]]
let grid = startGrid

function compare(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}

const chunkRows = list => {
  const divider = list.length % 3 === 0 ? 3 : 2
  return list.reduce((acc, curr, idx, list) => {
    const activeRow = idx % divider === 0
    if (activeRow) {
      return acc.concat(
          curr.reduce((_acc, _curr, _idx, _list) => {
          if (_idx % divider === 0) {
            const currList = list[idx]
            const nextRow = list[idx + 1]

            if (divider === 3) {
              const thirdRow = list[idx + 2]
              return _acc.concat([[
                _curr,
                currList[_idx+1],
                currList[_idx+2],
                nextRow[_idx],
                nextRow[_idx+1],
                nextRow[_idx+2],
                thirdRow[_idx],
                thirdRow[_idx+1],
                thirdRow[_idx+2]
              ]])
            } else {
              return _acc.concat([[
                _curr,
                currList[_idx+1],
                nextRow[_idx],
                nextRow[_idx+1],
              ]])
            }
          }
          return _acc
        }, [])
      )
    }
    return acc
  }, [])
}

const row = (sqr, divider, x) => {
  return Math.floor(x / (sqr/divider)) * divider
}
const column = (sqr, divider, x) => {
  return (x % (sqr / divider)) * divider
}

const joinChunks = list => {
  const divider = list[0].length === 9 ? 3 : 2
  const magicNumber = Math.sqrt(list.length)
  const grid = new Array(magicNumber * divider).fill(true).map(() => new Array(magicNumber * divider).fill("-"))
  return list.reduce((acc, curr, idx, list) => {
    const targetRow = Math.floor(idx / magicNumber)
    const scaledRow = targetRow * divider
    const targetColumn = idx % magicNumber
    const scaledColumn = targetColumn * divider
    if (divider === 3) {
      acc[scaledRow][scaledColumn] = curr[0]
      acc[scaledRow][scaledColumn+1] = curr[1]
      acc[scaledRow][scaledColumn+2] = curr[2]
      acc[scaledRow+1][scaledColumn] = curr[3]
      acc[scaledRow+1][scaledColumn+1] = curr[4]
      acc[scaledRow+1][scaledColumn+2] = curr[5]
      acc[scaledRow+2][scaledColumn] = curr[6]
      acc[scaledRow+2][scaledColumn+1] = curr[7]
      acc[scaledRow+2][scaledColumn+2] = curr[8]
    } else {
      acc[scaledRow][scaledColumn] = curr[0]
      acc[scaledRow][scaledColumn+1] = curr[1]
      acc[scaledRow+1][scaledColumn] = curr[2]
      acc[scaledRow+1][scaledColumn+1] = curr[3]
    }
    return acc
  }, grid)
}

function rotation(grid, amount) {
  console.log('rotation called with', grid)
  //let newGrid = clone(grid)
  if (grid.length === 4) {
    //times(() => newGrid = rotationTwo(newGrid), amount)
    const newGrid = rotationTwo(grid)
    console.log('after rotation ',amount,' times', newGrid)

    //newGrid = rotationTwo(newGrid)
    //newGrid = rotationTwo(newGrid)
    //newGrid = rotationTwo(newGrid)
    //newGrid = rotationTwo(newGrid)
  }
  return
  if (grid.length === 9)
    times( () => newGrid = rotationThree(newGrid), amount)
  return newGrid
}

function rotationTwo(grid) {
  console.log('called with', grid)
  const rotatedGrid = clone(grid) //.map(x => x.split(""))
  //console.log(rotatedGrid)
  //console.log(grid[0][1])
  //console.log(grid[0][0])
  //console.log(grid[1][0])
  //console.log(grid[1][1])
  //rotatedGrid[0][0] = grid[1][0]
  //rotatedGrid[0][1] = grid[0][0]
  //rotatedGrid[1][0] = grid[1][1]
  //rotatedGrid[1][1] = grid[0][1]
  //rotatedGrid[1][1] = grid[1][0]
  rotatedGrid[0] = grid[2]
  rotatedGrid[1] = grid[0]
  rotatedGrid[2] = grid[3]
  rotatedGrid[3] = grid[1]
  const res = rotatedGrid //.map( x => x.join("") )
  console.log(res)
  return res
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
    grid[0] = _grid[1]
    grid[1] = _grid[0]
    grid[2] = _grid[3]
    grid[3] = _grid[2]
    return grid
    //return grid.map(x => x.reverse() )
  } else {
    grid[0] = _grid[2]
    grid[1] = _grid[3]
    grid[2] = _grid[0]
    grid[3] = _grid[1]
    return grid
    //return grid.reverse()
  }
}


function compareAll(grid, comparee) {
  console.log('are these the same?', grid, comparee)
  const list = [
    flip(comparee, true),
    flip(comparee, false),
    rotation(comparee, 1),
    rotation(comparee, 2),
    rotation(comparee, 3)
  ]
  console.log(list)
  const out = !!list.find( x => {
    const o = compare(grid, x)
    console.log('im comparing', x, o)
    return o
  })
  console.log('... ', out)
  return out
}


const convert = x => {
  const finding = data.find((y, idx) => {
    const o = compareAll(y.input.replace(/\//gi, "").split(""), x)
    if (o) {
      return true
    }
    return false
  })
  return finding && finding.output//
}

const growGrid = iterations => {
  times(() => {
    const chunks = chunkRows(grid)
    //grid = chunks.map(convert)
    const joined = convert(chunks[0]).split("\/").map(x => x.split(""))
    const moreChunks = chunkRows(joined)
    const evenMore = moreChunks.map(convert)
    console.log(evenMore)
  }, iterations)
}

//growGrid(1)


module.exports = { 
  chunkRows,
  joinChunks,
  row,
  column,
  flip,
  rotation,
  compareAll
}