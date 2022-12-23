
const rocksStr = `####

.#.
###
.#.

..#
..#
###

#
#
#
#

##
##`

const rocks = [
  [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
  ],
  [
    { x: 4, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
    { x: 4, y: 2 },
  ],
  [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 5, y: 1 },
    { x: 5, y: 2 },
  ],
  [
    { x: 3, y: 0 },
    { x: 3, y: 1 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ],
  [
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
  ],
]

let crevasse
let piece = null
let iteration = 0
let rockSpawnIdx = 0
let windIdx = 0
let rocksPutToRest = 0
let wind

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  // const wind = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'
  wind = data.trim().split('\n').reduce((acc, curr) => acc + curr)


  crevasse = new Array(9).fill().map(() => new Array(1).fill('-'))

  addRow()
  addRow()
  addRow()
  addRow()
  console.log('Starting condition')
  printCrevasse()
  console.log('Simulating...')
  simulate()
})

function addRow() {
  crevasse.forEach((column, idx) => {
    column.push((idx === 0 || idx === 8) ? '|' : '.')
  })  
}

function simulate() {
  while(iteration < 100000 && rocksPutToRest <= 2022) {

    if (piece === null) {
      spawnRock()
      //console.log('Rock spawns', iteration)
      //printCrevasse()
    }
    // spawn rock
      // add rows
      // create piece
    
    const windDirection = convertWind(wind[windIdx])
    if (!checkCollision(windDirection, 0)) {
      movePiece(windDirection, 0)  
    }
    
    if (false && iteration > 23) { //true || 
      console.log('Jet of gas pushes', iteration)
      printCrevasse()
    }

    if (checkCollision(0, -1)) {
      persistRock()
      piece = null
    } else {
      movePiece(0, -1)      
    }

    if (false && iteration > 23) { //true || 
      console.log('Rock falls 1 unit', iteration)
      printCrevasse()
    }

    // repeat
    iteration++

    windIdx = (windIdx + 1) % wind.length
    //console.log('incrementing', windIdx, rockSpawnIdx)
  }
  printCrevasse()
  console.log('Simulation done...')
  console.log('After iteration', iteration, 'rocksPutToRest', rocksPutToRest, 'findClearEdge', findClearEdge()-1)
}

function spawnRock() {
  rocksPutToRest++
  addRow()
  addRow()
  addRow()
  addRow()
  piece = [...rocks[rockSpawnIdx].map(z => ({...z}))]
  movePiece(0, findClearEdge() + 3)
  rockSpawnIdx = (rockSpawnIdx + 1) % rocks.length
}

function movePiece(x, y) {
  piece.forEach(p => {
    p.x += x
    p.y += y
  })
}

function persistRock() {
  piece.forEach(p => {
    crevasse[p.x][p.y] = '#'
  })
}

function checkCollision(xMod, yMod) {
  let collision = false
  piece.forEach(p => {
    const x = p.x + xMod
    const y = p.y + yMod
    const target = crevasse[x][y]
    if (['#', '-', '|'].includes(target)) {
      collision = true
    }
  })
  return collision
}

function convertWind(windStr) {
  return windStr === '<' ? -1 : 1
}

function findClearEdge() {
  let edge
  for (let i = 0; i < crevasse[0].length; i++) {
    if (edge !== undefined) continue;
    
    let rowClear = true
    
    crevasse.forEach((row, index) => {
      if ([0, 8].includes(index)) return 
      if (row[i] !== '.') rowClear = false
    })

    if (rowClear) {
      edge = i
    }
  }
  
  return edge
}

function printCrevasse() {
  let str = ''
  doForAllCrevasseSpots(crevasse, (x, y) => {
    const isRock = piece && piece.find(({ x: xP, y: yP}) => x === xP && y === yP)
    if (!!isRock) {
      str += '£'   
    } else {
      str += crevasse[x][y]   
    }
    
  }, () => {
    str += '\n'
  })
  console.log(str)
  return str
}


function doForAllCrevasseSpots(m, f, fPrime) {
  for (let y = m[0].length-1; y >= 0; y--) {
    for (let x = 0; x < m.length; x++) {
      f(x, y)
    }
    fPrime && fPrime()
  }
}


