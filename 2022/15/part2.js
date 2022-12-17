/*
const { memoize } = require('underscore')

const manhattanDistance = memoize(
  function manhattanDistance(x1, y1, x2, y2) {
    const [xA, xB] = x1 > x2 ? [x1, x2] : [x2, x1]
    const [yA, yB] = y1 > y2 ? [y1, y2] : [y2, y1]
    return Math.abs(xA - xB) + Math.abs(yA - yB)
  }, (a, b, c, d) => a + b + c + d //a + '-' + b + '-' + c + '-' + d
)
*/

function manhattanDistance(x1, y1, x2, y2) {
  const [xA, xB] = x1 > x2 ? [x1, x2] : [x2, x1]
  const [yA, yB] = y1 > y2 ? [y1, y2] : [y2, y1]
  return Math.abs(xA - xB) + Math.abs(yA - yB)
}

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

const sensors = []
const beacons = []
const edges = []

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

  const ___data = `Sensor at x=8, y=7: closest beacon is at x=11, y=7`

  data.trim().split('\n').map(parseRow)
  
  sensors.forEach(sensor => {
    const { x: xA, y: yA } = sensor
    const { x: xP, y: yP } = sensor.closestBeacon
    const distanceFromSensorToItsKnownBeacon = manhattanDistance(xA, yA, xP, yP)
    traverseEdge(sensor, distanceFromSensorToItsKnownBeacon+2, (x, y) => {
      //edges.push({ x, y })
      
      let clear = isClear(x, y)
      if (!clear) {
        let hasSensor = false
        sensors.forEach((sensor, idx) => {
          if (sensor.x === x && sensor.y === y) {
            hasSensor = true
          }
        })
        let hasBeacon = false
        beacons.forEach((beacon, idx) => {
          if (beacon.x === x && beacon.y === y) {
            hasBeacon = true
          }
        })
        const EDGE = 4000000
        if (!hasBeacon && !hasSensor && x >= 0 && x <= EDGE && y >= 0 && y <= EDGE) {
          console.log('Sector', x, y,'is clear')
        }
      }
      
    })
  })
  
  // printDeuxMap()
  
  // findTransmittingBeaconCoordinate()
})

function findTransmittingBeaconCoordinate() {
  for (let x = 0; x < 20; x++) {      
    for (let y = 0; y < 20; y++) {
      if (y === 0) console.log(x, y)
      let clear = isClear(x, y)
      if (!clear) {
        let hasSensor = false
        sensors.forEach((sensor, idx) => {
          if (sensor.x === x && sensor.y === y) {
            hasSensor = true
          }
        })
        let hasBeacon = false
        beacons.forEach((beacon, idx) => {
          if (beacon.x === x && beacon.y === y) {
            hasBeacon = true
          }
        })
        if (!hasBeacon && !hasSensor) {
          console.log('Sector', x, y,'is clear')
        }
      }
    }
  }
}

function traverseEdge(sensor, distanceToBeacon, func) {
  const operations = [
    {
      x: x=>x+1,
      y: y=>y+1,
      condition: (x, y) => y === sensor.y
    },
    {
      x: x=>x-1,
      y: y=>y+1,
      condition: (x, y) => x === sensor.x
    },
    {
      x: x=>x-1,
      y: y=>y-1,
      condition: (x, y) => y === sensor.y
    },
    {
      x: x=>x+1,
      y: y=>y-1,
      condition: (x, y) => x === sensor.x
    },
  ]

  let x = sensor.x
  let y = sensor.y - distanceToBeacon+1

  let operation = operations.shift(1)

  while(operation) {

    func(x, y)
    x = operation.x(x)
    y = operation.y(y)

    if (operation.condition(x, y)) {
      if (operations.length > 0) {
        operation = operations.shift(1)
      } else {
        operation = null
      }
    }
  }
}

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
  
  const s = { ...sensor, x, y, closestBeacon: { x: xP, y: yP } }
  sensors.push(s)

  const b = { ... beacon, x: xP, y: yP }
  beacons.push(b)
}

function isClear(x, y) {
  let clear = false
  sensors.forEach((sensor, idx) => {
    if (clear) return
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

  return clear
}

function printDeuxMap() {
  let str = ''
  for (let y = -10; y <= 30; y++) {
    for (let x = -10; x <= 30; x++) {
      if (edges.find(({ x: xP, y: yP }) => x === xP && y === yP)) {
        str += 'E'
      } else if (x === 2 && y === 10) {
        str += '1'
      } else if (x === 10 && y === 16) {
        str += '2'
      } else if (x === 14 && y === 11) {
        str += '3'
      } else if (x === 15 && y === 3) {
        str += '4'
      } else {
        str += isClear(x, y) ? '#' : '.'
      }
    }
    str += '\n'
  }
  console.log(str)
  return str
}
