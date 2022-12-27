
let player = { x: 2, y: 1 }

const winds = []

const input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`

const width = input.split('\n')[0].length
const height = input.split('\n').length

const map = generateMountain(width, height)

input.split('\n').forEach((row, y, list) => {
  row.split('').forEach((char, x) => {
    console.log(x,y, char)
    if (char === '#') {
      map[x][y] = '#'
    } else if (char === '.') {
      
    } else if (char === 'E') {
      
    } else {
      winds.push({ x, y, direction: char })
    }
  })
})

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    moveWinds()
    printMap()
  }
});

printMap()

const dirs = {
  '>': (x,y) => ({ x: x+1, y}),
  '<': (x,y) => ({ x: x-1, y}),
  '^': (x,y) => ({ x, y: y-1}),
  'v': (x,y) => ({ x, y: y+1}),
}

const wraps = {
  '>': (x,y) => ({ x: 1, y}),
  '<': (x,y) => ({ x: width-2, y}),
  '^': (x,y) => ({ x, y: height-2}),
  'v': (x,y) => ({ x, y: 1}),  
}

function moveWinds() {
  winds.forEach(wind => {
    const target = dirs[wind.direction](wind.x, wind.y)
    wind.x = target.x
    wind.y = target.y 
    
    if (map[wind.x][wind.y] === '#') {
      const wrapTarget = wraps[wind.direction](wind.x, wind.y)
      wind.x = wrapTarget.x
      wind.y = wrapTarget.y
    }
  })
}

function generateMountain(w, h) {
  return new Array(w).fill().map(() => new Array(h).fill('.'))
}

function doForAllMountainSpots(m, f, fPrime) {
  for (let x = 0; x < m[0].length; x++) {
    for (let y = 0; y < m.length; y++) {
      f(y, x)
    }
    fPrime && fPrime()
  }
}

function printMap() {
  let str = ''
  doForAllMountainSpots(map, (x, y) => { 
    const ws = winds.filter(({x: xP, y: yP}) => x === xP && y === yP)
    if (ws.length === 1) {
      str += ws[0].direction 
    } else if (ws.length > 1) { 
      str += ws.length
    } else {
      str += map[x][y]
    }
  }, () => {
    str += '\n'
  })
  console.log(str)
  return str
}


