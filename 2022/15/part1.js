
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

const Y_ROW = 2000000
const sensors = []
const beacons = []
const xPersist = []
let x_min
let x_max

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  /*
  const data = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
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
*/
  //const data = 'Sensor at x=8, y=7: closest beacon is at x=8, y=8'

  data.trim().split('\n').map(parseRow)
  
  //printDeuxMap()
  console.log('x minimum is', Math.min(...xPersist),'x maximum is', Math.max(...xPersist))
  console.log('In row', Y_ROW, 'i find', countY())
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
  
  xPersist.push(x)
  xPersist.push(xP)
  const s = { ...sensor, x, y, closestBeacon: { x: xP, y: yP } }
  sensors.push(s)

  const b = { ... beacon, x: xP, y: yP }
  beacons.push(b)
}

function countY() {
  let amount = 0
  for (let x = Math.min(...xPersist) - 100000000; x < Math.max(...xPersist) + 100000000; x++) {
    const output = isClear(x, Y_ROW)
    if (output) {
      amount++
    }
  }
  return amount
}

function isClear(x, y) {
  let clear = false
  sensors.forEach((sensor, idx) => {
    const { x: xA, y: yA } = sensor
    const { x: xP, y: yP } = sensor.closestBeacon
    const distanceFromSensorToItsKnownBeacon = manhattanDistance(xA, yA, xP, yP)
    const distanceFromSpotToSensor = manhattanDistance(x, y, xA, yA)
    if (distanceFromSpotToSensor > distanceFromSensorToItsKnownBeacon) {
      //noop
    } else {
      clear = true
    }
  })

  beacons.forEach((beacon, idx) => {
    if (beacon.x === x && beacon.y === y) {
      clear = false
    }
  })

  /*sensors.forEach((sensor, idx) => {
    if (sensor.x === x && sensor.y === y) {
      clear = false
    }
  })*/

  return clear
}

function manhattanDistance(x1, y1, x2, y2) {
  const [xA, xB] = x1 > x2 ? [x1, x2] : [x2, x1]
  const [yA, yB] = y1 > y2 ? [y1, y2] : [y2, y1]
  return Math.abs(xA - xB) + Math.abs(yA - yB)
}

function printDeuxMap() {
  let str = ''
  for (let y = -10; y <= 30; y++) {
    for (let x = -10; x <= 30; x++) {
      str += isClear(x, y) ? '#' : '.'
    }
    str += '\n'
  }
  console.log(str)
  return str
}
