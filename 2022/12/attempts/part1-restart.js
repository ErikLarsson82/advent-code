
const END = 'E'

let trails = []
let map = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  generateHeightMap(data)

  map[0][20] = 'a'
  
  traverse([], 0, 20, 'a'.charCodeAt(0))

  trails.sort(shortest)
  console.log(trails.length, 'paths found')
  console.log('Shortest path detected:', trails[0].length-1)

  //walk(trails[0])
})

let counter = 0
function traverse(arr, x, y, height) {

  counter++
  if (counter % 1000000 === 0) {
    console.log('calling traverse', counter, trails.length)
  }

  if (map[x] === undefined) return null
  if (map[x] && map[x][y] === undefined) return null
  if (map[x][y] === END && height === 122) {
    trails.push(arr.concat({ x, y, letter: END}))
    return null
  }
  const compareHeight = map[x][y].charCodeAt(0)
  const isElevation = compareHeight > height
  const isTooHigh = compareHeight >= height + 2
  if (isTooHigh) return null

  const hasBeenBefore = !!arr.find(({ x: xP, y: yP }) => x === xP && y === yP)
  if (hasBeenBefore) return null
  
  const appended = arr.concat({ x, y, letter: map[x][y]})
  traverse(appended, x+1, y, isElevation ? height + 1 : height)
  traverse(appended, x-1, y, isElevation ? height + 1 : height)
  traverse(appended, x, y+1, isElevation ? height + 1 : height)
  traverse(appended, x, y-1, isElevation ? height + 1 : height)

  return null
}

function walk(trail) {
  for (let i = 0; i < trail.length; i++) {    
    setTimeout(() => {
      console.clear()
      console.log(printMap(trail[i].x, trail[i].y))
    }, i * 300)
  }
}

function printMap(xP, yP) {
  let str = ''
  doForAllHeights((x, y) => {    
    if (y === xP && x === yP) {
      str += ' '
    } else {
      str += map[y][x]
    }
  }, () => {
    str += '\n'
  })
  return str
}

function generateHeightMap(str) {
  const rows = str.trim().split('\n').map(x => x.trim())
  const vSize = rows.length
  const hSize = rows[0].length

  map = new Array(hSize).fill().map(() => new Array(vSize).fill('.'))
  
  rows.forEach((row, yIdx) => {  
    row.split('').forEach((value, xIdx) => {
      map[xIdx][yIdx] = value
    })
  })
}

function doForAllHeights(f, fPrime) {
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      f(x, y)
    }
    fPrime && fPrime()
  }
}

function shortest(a, b) {
  return a.length > b.length ? 1 : -1
}