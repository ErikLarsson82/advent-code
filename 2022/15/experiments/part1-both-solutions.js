
const sensor = {
  type: 'S',
  x: null,
  y: null,
  closestBeacon: { x: null, y: null },
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

const WIDTH = 40
const HEIGHT = 40
const BUFFER = 10              
const Y_ROW = 10 + BUFFER
const map = generateMap(WIDTH, HEIGHT)
const sensors = []
const beacons = []
let duplicates = 0

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, _data) => {

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

  data.trim().split('\n').map(parseRow)

  mapForEach(map, (x, y) => {
    if (map[x][y].type === 'S') {
      clearArea(x, y)    
    }
  })
  printMap()

  //isClear(20, 20)
  printDeuxMap()

  console.log('In row', Y_ROW, 'i find', countY())
  /*let hashes = 0
  mapForEach(map, (x, y) => {  
    const target = map[x][y]
    if (target.cleared && target.type === '.') {
      hashes++
    }        
  })
  console.log('Amount of duplicates', duplicates)
  console.log('Amount of hashes', hashes)
  console.log('Amount of cleared', countY())
  */
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
  
  const bufferedX = x + BUFFER
  const bufferedY = y + BUFFER
  const bufferedXPrime = xP + BUFFER
  const bufferedYPrime = yP + BUFFER

  const s = { ...sensor, x: bufferedX, y: bufferedY, closestBeacon: { x: bufferedXPrime, y: bufferedYPrime } }
  map[bufferedX][bufferedY] = s
  sensors.push(s)

  const b = { ... beacon, x: bufferedXPrime, y: bufferedYPrime }
  map[bufferedXPrime][bufferedYPrime] = b
  beacons.push(b)
}

function countY() {
  let amount = 0
  for (let x = 0; x < 100; x++) {
    if (isClear(x, Y_ROW)) {
      amount++
    }
  }
  return amount
}

function clearArea(x, y) {
  const sensor = map[x][y]
  const { x: xP, y: yP } = sensor.closestBeacon
  const distanceToKnownBeacon = manhattanDistance(x, y, xP, yP)
  
  walkAndClearDeux(x, y, distanceToKnownBeacon)
}

function walkAndClearDeux(x, y, distance) {
  for (let xP = x-distance; xP <= x+distance; xP++) {
    for (let yP = y-distance; yP <= y+distance; yP++) {
      if (manhattanDistance(x, y, xP, yP) < distance) {
        map[xP][yP].cleared = true
        //map.push({ ...empty, x: xP, y: yP })
      }
    }
  }
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
  if (map[x][y].type === '.' && map[x][y].cleared) {
    duplicates++
    return
  }
  map[x][y].cleared = true
  walkAndClear(x+1, y, distance - 1)
  walkAndClear(x-1, y, distance - 1)
  walkAndClear(x, y+1, distance - 1)
  walkAndClear(x, y-1, distance - 1)
}

function isClear(x, y) {
  let clear = false
  sensors.forEach((sensor, idx) => {
    const { x: xA, y: yA } = sensor
    const { x: xP, y: yP } = sensor.closestBeacon
    const distanceFromSensorToItsKnownBeacon = manhattanDistance(xA, yA, xP, yP)
    const distanceFromSpotToSensor = manhattanDistance(x, y, xA, yA)
    if (distanceFromSpotToSensor >= distanceFromSensorToItsKnownBeacon) {
      //console.log('im comparing', x, y, 'and the distance is too large, so i dismiss sensor with idx', idx, 'distanceFromSensorToItsKnownBeacon=', distanceFromSensorToItsKnownBeacon, 'distanceFromSpotToSensor=', distanceFromSpotToSensor)
    } else {
      clear = true
      //console.log('i could be influenced', idx, 'distanceFromSensorToItsKnownBeacon=', distanceFromSensorToItsKnownBeacon, 'distanceFromSpotToSensor=', distanceFromSpotToSensor)
    }
  })

  beacons.forEach((beacon, idx) => {
    if (beacon.x === x && beacon.y === y) {
      clear = false
      console.log('i found beacon at', x, y)
    }
  })

  sensors.forEach((sensor, idx) => {
    if (sensor.x === x && sensor.y === y) {
      clear = false
      console.log('i found sensor at', x, y)
    }
  })

  return clear
}

function manhattanDistance(x1, y1, x2, y2) {
  const [xA, xB] = x1 > x2 ? [x1, x2] : [x2, x1]
  const [yA, yB] = y1 > y2 ? [y1, y2] : [y2, y1]
  return Math.abs(xA - xB) + Math.abs(yA - yB)
}

function clearedSections(mhD) {
  let sum = 0
  let modifier = 4
  for (let i = 0; i < mhD; i++) {
    sum = sum + modifier
    modifier += 4
  }
  return sum
}

// 1 -> 0
// 2 -> 4
// 3 -> 12
// 4 -> 24
// 5 -> 40
// 6 -> 60
// 7 -> 84
// 8 -> 112

function generateMap(w, h) {
  return new Array(w).fill().map((_, idx) => {
    return new Array(h).fill().map(() => ({ ...empty }))
  })
}

function printMap() {
  let str = ''
  mapForEach(map, (x, y) => {
    if (x === 20 && y === 20) {
      str+='&'
      return
    }
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

function printDeuxMap() {
  let str = ''
  let cleared = 0
  mapForEach(map, (x, y) => {
    const clear = isClear(x, y)
    if (clear) {
      cleared++
      str += '#'
    } else {
      str += map[x][y].type
    }
  }, () => {
    str += '\n'
  })
  console.log(str)
  console.log('Total cleared places', cleared)
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
