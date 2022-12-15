
const START = 'S'
const END = 'E'

let trails = []
let map = []
let startX = null
let startY = null
let counter = 0
let highscore = null

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  generateHeightMap(data)
  console.log(printMap(null, null))
  traverse([], startX, startY, 'a'.charCodeAt(0))
  console.log('Shortest path found', highscore)

})

function traverse(arr, x, y, fromHeight) {
  counter++
  if (counter % 2000 === 0) {
    console.clear()
    console.log(printMap(null, null, true))
  }
  // if (counter > 100) return
  if (map[x] === undefined) {
    //console.log('out of bounds')
    return null
  }
  if (map[x][y] === undefined) {
    //console.log('out of bounds')
    return null
  }
  const target = map[x][y]

  const isTooHigh = target.height >= fromHeight + 2
  if (isTooHigh) {
    //console.log('too high elevation')
    return null
  }

  const currentLength = arr.length+1
  if (target.score === null || target.score > currentLength) {
    // Keep traversing but save the score and the path
    target.score = currentLength
    target.path = arr.concat({ x, y })
    if (target.letter === END) {
      highscore = currentLength-1
      return null
    }  
  } else {
    //console.log('found a path with a lower or same score')
    return null
  }

  
  
  const appended = arr.concat({ x, y })
  traverse(appended, x+1, y, target.height)
  traverse(appended, x-1, y, target.height)
  traverse(appended, x, y+1, target.height)
  traverse(appended, x, y-1, target.height)

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

function printMap(xP, yP, onlyHeight) {
  let str = ''
  doForAllHeights((x, y) => {    
    if (onlyHeight) {
      str += map[y][x].score === null ? '   .' : pad(map[y][x].score)
      return
    }
    if (y === xP && x === yP) {
      str += ' '
    } else {
      str += ' ' + map[y][x].letter
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
      if (value === START) {
        startX = xIdx
        startY = yIdx
      }
      map[xIdx][yIdx] = {
        letter: value,
        height: getHeight(value),
        score: null,
        path: null
      }
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

function getHeight(value) {
  if (value === 'S') return 97 // as 'a'
  if (value === 'E') return 123 // one higher than 'z'
  return value.charCodeAt(0)
}

function pad(int) {
  if (int.toString().length === 4) return int
  if (int.toString().length === 3) return ' ' + int
  if (int.toString().length === 2) return '  ' + int
  if (int.toString().length === 1) return '   ' + int
  return                                  '    ' + int
}
