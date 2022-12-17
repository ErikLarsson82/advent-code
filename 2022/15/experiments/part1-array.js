
const sensor = {
  type: 'S',
  closestBeacon: { x: 10, y: 10 },
  cleared: null // is this required!?
}

const beacon = {
  type: 'B',
  cleared: null // is this required!?
}

const empty = {
  type: '.',
  cleared: false
}

const WIDTH = 4900000
const HEIGHT = 4900000
const BUFFER = 20              
const Y_ROW = 2000000 + BUFFER
let lowestX = Infinity
let lowestY = Infinity
let highestX = 0
let highestY = 0
const map = generateMap(WIDTH, HEIGHT)

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  data.trim().split('\n').map(parseRow)

  console.log('lowest x', lowestX, 'lowest y', lowestY)
  console.log('highest x', highestX, 'highest y', highestY)
  console.log('diff x', highestX - lowestX, 'diff y', highestY - lowestY)

  mapForEach(map, (x, y) => {
    if (map[x][y].type === 'S') {
      clearArea(x, y)    
    }
  })
  // printMap()
  console.log('Amount of cleared', countY())
})

function parseRow(str) {
  const [sensorData, beaconData] = str.split(':').map(x=>x.trim())

  const [xFluff, yFluff] = sensorData.split(',')
  const [,xStr] =  xFluff.split('=')
  const [,yStr] =  yFluff.split('=')

  const x = parseInt(xStr)
  const y = parseInt(yStr)

  const [xBFluff, yBFluff] = beaconData.split(',')
  const [,xPStr] =  xBFluff.split('=')
  const [,yPStr] =  yBFluff.split('=')

  const xP = parseInt(xPStr)
  const yP = parseInt(yPStr)
  
  if (x < lowestX) {
    lowestX = x
  }
  if (xP < lowestX) {
    lowestX = xP
  }
  if (x > highestX) {
    highestX = x
  }
  if (xP > highestX) {
    highestX = xP
  }
  if (y < lowestY) {
    lowestY = y
  }
  if (yP < lowestY) {
    lowestY = yP
  }
  if (y > highestY) {
    highestY = y
  }
  if (yP > highestY) {
    highestY = yP
  }

  const bufferedX = x + BUFFER
  const bufferedY = y + BUFFER
  const bufferedXPrime = xP + BUFFER
  const bufferedYPrime = yP + BUFFER

  map[bufferedX][bufferedY] = { ...sensor, closestBeacon: { x: bufferedXPrime, y: bufferedYPrime } }
  map[bufferedXPrime][bufferedYPrime] = { ... beacon }
}

function countY() {
  let amount = 0
  mapForEach(map, (x, y) => {
    if (map[x][y].cleared && y === Y_ROW) {
      amount++
    }
  })
  return amount
}

function clearArea(x, y) {
  const sensor = map[x][y]
  const { x: xP, y: yP } = sensor.closestBeacon
  const distanceToKnownBeacon = manhattanDistance(x, y, xP, yP)
  
  walkAndClear(x, y, distanceToKnownBeacon)
}

function walkAndClear(x, y, distance) {
  if (distance <= 0) return
  if (x < 0 || x > WIDTH) {
    //throw new Error('Out of bounds')
    return
  }
  if (y < 0 || y > WIDTH) {
    //throw new Error('Out of bounds')
    return
  }
  map[x][y].cleared = true
  walkAndClear(x+1, y, distance - 1)
  walkAndClear(x-1, y, distance - 1)
  walkAndClear(x, y+1, distance - 1)
  walkAndClear(x, y-1, distance - 1)
}

function manhattanDistance(x1, y1, x2, y2) {
  const [xA, xB] = x1 > x2 ? [x1, x2] : [x2, x1]
  const [yA, yB] = y1 > y2 ? [y1, y2] : [y2, y1]
  return Math.abs(xA - xB) + Math.abs(yA - yB)
}

function generateMap(w, h) {
  return new Array(w).fill().map((_, idx) => {
    if (idx % 3 === 0) console.log('at idx', idx, 4900000 * 4900000)
    return new Array(h).fill()// .map(() => ({ ...empty }))
  })
}

function printMap() {
  let str = ''
  mapForEach(map, (x, y) => {  
    const target = map[x][y]
    if (target.type === '.') {
      str += target.cleared ? '#' : '.'
    } else {
      str += target.type
    }        
  }, () => {
    str += '\n'
  })
  console.log(str)
  return str
}

function mapForEach(m, f, fPrime) {
  for (let y = 0; y < m[0].length; y++) {
    for (let x = 0; x < m.length; x++) {
      f(x, y)
    }
    fPrime && fPrime()
  }
}
