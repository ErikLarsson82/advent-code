const OFFSET_X = 392
const OFFSET_Y = 0

const origin = [500 - OFFSET_X, 0]
let sand = [...origin]
let generation = 0
let sandResting = 0

const WIDTH = 200 // 200 works
const HEIGHT = 400 // 400 works

// I have a better one
const cave = generateCave(WIDTH, HEIGHT)

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {
  data.trim().split('\n').map(x=>x.trim()).forEach(parse)

  while (true) {
    simulate()
    //console.clear()
    //console.log('generation', generation)
    //printMap()    
  }
})

function parse(str) {
  const data = str.split(' -> ')
  data.forEach((_, idx) => {
    if (data[idx+1] === undefined) return
    const [a1, b1] = data[idx+0].split(',').map(x => parseInt(x))
    const [a2, b2] = data[idx+1].split(',').map(x => parseInt(x))

    const a = a1 <= a2 ? a1 : a2
    const b = a2 > a1 ? a2 : a1
    const c = b1 <= b2 ? b1 : b2
    const d = b2 > b1 ? b2 : b1
    line(a, c, b, d)
  })
} 

function simulate() {
  generation++
  const [sandX, sandY] = sand
  if (generation % 100 === 0) {
    console.log('generation', generation)
    console.log('sand resting', sandResting)
  }
  if (sandX === WIDTH-1 || sandY === HEIGHT-1) {
    console.log('generation', generation)
    console.log('sand resting', sandResting)
    throw new Error('panic: sand outside')
  }
  if (cave[sandX][sandY + 1] === '.') {
    sand[1]++
    return
  }
  if (cave[sandX][sandY + 1] === '#' || cave[sandX][sandY + 1] === 'o') {
    if (cave[sandX - 1][sandY + 1] === '.') {
      sand[0] -= 1
      sand[1]++
    } else if (cave[sandX + 1][sandY + 1] === '.') {
      sand[0] += 1
      sand[1]++
    } else {
      cave[sandX][sandY] = 'o'
      sand = [...origin]
      sandResting++
    }
  }
}

function generateCave(h, w) {
  return new Array(h).fill().map(() => new Array(w).fill('.'))
}

function line(fromX, fromY, toX, toY) {
  if (fromX - OFFSET_X > toX - OFFSET_X) {
    console.log('compare', fromX, toX, 'offset', fromX - OFFSET_X, toX - OFFSET_X)
    throw new Error('panic: incorrect order')
  }
  if (fromY - OFFSET_Y > toY - OFFSET_Y) {
    console.log('compare', fromY, toY, 'offset', fromY - OFFSET_Y, toY - OFFSET_Y)
    throw new Error('panic: incorrect order')
  }
  
  for (let x = fromX - OFFSET_X; x <= toX - OFFSET_X; x++) {
	  for (let y = fromY - OFFSET_Y; y <= toY - OFFSET_Y; y++) {
      cave[x][y] = '#'
		}
	}
}

function printMap() {
  let str = ''
  doForAllCaveSpots(cave, (x, y) => {  
    const [xP, yP] = origin
    const [xP2, yP2] = sand
    if (x === xP2 && y === yP2) {
      str += '@'  
    } else if (x === xP && y === yP) {
      str += '+'  
    } else {
      str += cave[x][y]
    }
    
  }, () => {
    str += '\n'
  })
  console.log(str)
  return str
}

function doForAllCaveSpots(m, f, fPrime) {
  for (let x = 0; x < m[0].length; x++) {
    for (let y = 0; y < m.length; y++) {
      f(y, x)
    }
    fPrime && fPrime()
  }
}


//498,4 -> 498,6 -> 496,6
//503,4 -> 502,4 -> 502,9 -> 494,9