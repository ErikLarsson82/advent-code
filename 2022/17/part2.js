
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
let offset = 0

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  
  //wind = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'
  wind = data.trim().split('\n').reduce((acc, curr) => acc + curr)

  crevasse = new Array(9).fill().map(() => new Array(1).fill('-'))

  console.log(crevasse)
  console.log('Simulating...')
  simulate()
})

function addRow() {
  crevasse.forEach((column, idx) => {
    column.push((idx === 0 || idx === 8) ? '|' : '.')
  })  
}

function simulate() {
  while(rocksPutToRest <= 1000000000000) {
    if (iteration % 1000000 === 0) console.log('iteration', iteration, rocksPutToRest, crevasse[0].length, (rocksPutToRest / 1000000000000).toFixed(2))
    
    if (piece === null) {
      spawnRock()
      //console.log('Rock spawns', iteration)
      //printCrevasse()
    }
    
    const windDirection = convertWind(wind[windIdx])
    if (!checkCollision(windDirection, 0)) {
      movePiece(windDirection, 0)  
    }
    
    //console.log('Jet of gas pushes', iteration)
    //printCrevasse()
    
    if (checkCollision(0, -1)) {
      persistRock()
      piece = null
    } else {
      movePiece(0, -1)      
    }

    //console.log('Rock falls 1 unit', iteration)
    //printCrevasse()
    
    iteration++

    windIdx = (windIdx + 1) % wind.length

    chop()    
  }
  //printCrevasse()
  console.log('Simulation done...')
  console.log('After iteration', iteration, 'rocksPutToRest', rocksPutToRest, 'findClearEdge', findClearEdge() - 1, offset)
}

function chop() {
  if (crevasse[0].length > 200) {
    crevasse.forEach((c, idx) => {
      crevasse[idx] = c.slice(1)
    })
    offset = offset + 1
  }
}

function spawnRock() {
  rocksPutToRest++
  piece = [...rocks[rockSpawnIdx].map(z => ({ x: z.x, y: z.y }))]
  movePiece(0, findClearEdge() + 3)
  createPadding()
  rockSpawnIdx = (rockSpawnIdx + 1) % rocks.length
}

function createPadding() {
  piece.forEach(p => {
    while(crevasse[0][p.y-offset] === undefined) {
      addRow()
    }
  })
}

function movePiece(x, y) {
  piece.forEach(p => {
    p.x += x
    p.y += y
    if (p.y - offset < 0) {
      console.log('move attempted to bottom of cut screen', x, y, p.x, p.y, offset)
      throw new Error('I snuck by')
    }
  })
}

function persistRock() {
  piece.forEach(p => {
    crevasse[p.x][p.y-offset] = '#'
  })
}

function checkCollision(xMod, yMod) {
  let collision = false
  piece.forEach(p => {
    const x = p.x + xMod
    const y = p.y + yMod
    if (x === -1 || x === 9) {
      console.log('called with', x, y, crevasse[x])
      throw new Error('WAT')
    }
    if (crevasse[x] === undefined) {
      console.log('called with', x, y, crevasse[x])
    }
    const target = crevasse[x][y-offset]
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

  if (!edge) {
    // edge case LOL
    edge = crevasse[0].length
  }
  
  return edge + offset
}

function printCrevasse() {
  let str = ''
  doForAllCrevasseSpots(crevasse, (x, y) => {
    const isRock = piece && piece.find(({ x: xP, y: yP}) => x === xP && y+offset === yP)
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


