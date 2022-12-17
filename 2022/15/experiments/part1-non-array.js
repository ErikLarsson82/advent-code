//const ramda = require('ramda')
const { memoize } = require('underscore')

const manhattanDistance = memoize(
  function manhattanDistance(x1, y1, x2, y2) {
    const [xA, xB] = x1 > x2 ? [x1, x2] : [x2, x1]
    const [yA, yB] = y1 > y2 ? [y1, y2] : [y2, y1]
    return Math.abs(xA - xB) + Math.abs(yA - yB)
  }, (a, b, c, d) => a + '-' + b + '-' + c + '-' + d
)

const sensor = {
  type: 'S',
  x: null,
  y: null,
  closestBeacon: { x: null, y: null }
}

const beacon = {
  type: 'B',
  x: null,
  y: null
}

const cleared = {
  type: '#',
  x: null,
  y: null,
}

function isSensor(obj) {
  return obj.type === 'S'
}

function isCleared(obj) {
  return obj.type === '#'
}

const Y_ROW = 2000000
const map = []
let bust = 0

const find = memoize(
  function find(xP, yP) {
    return map.find(coordinate(xP,yP))
  }, (xP, yP) => xP + '-' + yP + '-' + bust
)

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const _data = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

  data.trim().split('\n').map(parseRow)

  map.filter(isSensor).forEach(({ x, y }) => clearArea(x, y))
  // printMap()
  console.log('Amount of cleared', countY())
})

let p = 0

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
  
  map.push({ ...sensor, x, y, closestBeacon: { x: xP, y: yP } })
  map.push({ ...beacon, x: xP, y: yP })
  bust++
  if (++p % 5000 === 0) console.log('parsing', p)
}

function countY() {
  return map.filter(({ y }) => y === Y_ROW).filter(isCleared).length
}

function coordinate(x, y) {
  return ({ x: xP, y: yP }) => x === xP && y === yP
}

function clearArea(x, y) {
  const sensor = find(x, y)
  if (!sensor) {
    throw new Error('Unable to find sensor')
  }
  const { x: xP, y: yP } = sensor.closestBeacon
  const distanceToKnownBeacon = manhattanDistance(x, y, xP, yP)
  
  walkAndClearDeux(x, y, distanceToKnownBeacon)
}

let c = 0
let k = 0
let l = 0
function walkAndClearDeux(x, y, distance) {
  if (++c % 5000 === 0) console.log('walk and clear', c)
  for (let xP = x-distance; xP <= x+distance; xP++) {
    if (++k % 5000 === 0) console.log('x loop', k)
    l = 0
    for (let yP = y-distance; yP <= y+distance; yP++) {
      if (++l % 50000 === 0) console.log('y loop', l)
      if (manhattanDistance(x, y, xP, yP) < distance && find(xP,yP) === undefined) {
        map.push({ ...cleared, x: xP, y: yP })
        bust++
      }
    }
  }
}

function printMap() {
  let str = ''
  for (let y = -10; y < 30; y++) {
    for (let x = -10; x < 30; x++) {
      const target = find(x, y)
      if (target) {
        str += target.type
      } else {
        str += '.'
      }
    }
    str += '\n'
  }
  console.log(str)
  return str
}
