
let x = 0
let y = 0
let currentSide = 'green'

const WIDTH = 5
const HEIGHT = 5

const cube = {}

// up down left right
cube.green = {
  transforms: {
    up: { side: 'white', func: flipY },
    left: { side: 'orange', func: flipX }
  },
  map: generateSide(WIDTH, HEIGHT)
}

cube.white = {
  transforms: {
    down: { side: 'green', func: flipY },
    left: { side: 'orange', func: rotate }
  },
  map: generateSide(WIDTH, HEIGHT)
}

cube.orange = {
  transforms: {
    up: { side: 'white', func: rotate },
    right: { side: 'green', func: flipX }
  },
  map: generateSide(WIDTH, HEIGHT)
}

cube.green.map[2][2] = '#'
cube.white.map[3][3] = '#'

function generateSide(w, h) {
  return new Array(w).fill().map(() => new Array(h).fill('.'))
}


function doForAllSideSpots(m, f, fPrime) {
  for (let x = 0; x < m[0].length; x++) {
    for (let y = 0; y < m.length; y++) {
      f(y, x)
    }
    fPrime && fPrime()
  }
}

function printSide(side) {
  const map = cube[side].map
  let str = ''
  doForAllSideSpots(map, (_x, _y) => {
    if (_x === x && _y === y && side === currentSide) {
      str += 'P'
      return
    }
    str += map[_x][_y]
  }, () => {
    str += '\n'
  })
  console.log(side)
  console.log(str)
  return str
}

const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    console.clear()
  
    if (key.name === 'up') {
      y -= 1      
    }
    if (key.name === 'down') {
      y += 1      
    }
    if (key.name === 'left') {
      x -= 1
    }
    if (key.name === 'right') {
      x += 1
    }

    teleport()
  }

  printCube()
});

function cap(x, y) {
  return { x: Math.max(0, Math.min(x, WIDTH)), y: Math.max(0, Math.min(y, HEIGHT)) }
}

function flipX(x, y) {
  return { x: x < 0 ? WIDTH-1 : 0, y }
}

function flipY(x, y) {
  return { x, y: y < 0 ? HEIGHT-1 : 0 }
}

function rotate(x, y) {
  const temp = x
  x = y
  y = temp
  x = cap(x,y).x
  y = cap(x,y).y
  return { x, y }
}

function teleport() {
  let target
  let execute = false
  if (x < 0) {
    target = cube[currentSide].transforms.left
    execute = true
  }
  if (x > WIDTH-1) {
    target = cube[currentSide].transforms.right
    execute = true
  }
  if (y < 0) {
    target = cube[currentSide].transforms.up
    execute = true
  }
  if (y > HEIGHT-1) {
    target = cube[currentSide].transforms.down
    execute = true
  }
  
  if (execute) {
    currentSide = target.side
    const { x: xP, y: yP } = target.func(x, y)
    x = xP
    y = yP
  }
}

function printCube() {
  console.clear()
  printSide('green')
  printSide('white')
  printSide('orange')
}

printCube()