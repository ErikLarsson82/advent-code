
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    if (key.name === 'up') {
      rotation = 'up'
      movePrime()
    }
    if (key.name === 'down') {
      rotation = 'down'
      movePrime()
    }
    if (key.name === 'left') {
      rotation = 'left'
      movePrime()
    }
    if (key.name === 'right') {
      rotation = 'right'
      movePrime()
    }
    /*
    if (key.name === 'right') {
      if (rotation === 'up') {
        rotation = 'right'
      } else if (rotation === 'right') {
        rotation = 'down'
      } else if (rotation === 'down') {
        rotation = 'left'
      } else if (rotation === 'left') {
        rotation = 'up'
      }
    }
    if (key.name === 'left') {
      if (rotation === 'up') {
        rotation = 'left'
      } else if (rotation === 'left') {
        rotation = 'down'
      } else if (rotation === 'down') {
        rotation = 'right'
      } else if (rotation === 'right') {
        rotation = 'up'
      }
    }*/
    
    console.clear()
    printMap()
  }
});


let player
let rotation = 'right'

const trim = x=>x.trim()

const _map = [
  {x:1,y:1, type: '.' },
  {x:2,y:1, type: '.' },
  {x:2,y:2, type: '.' },
  {x:2,y:3, type: '.' },
  {x:2,y:4, type: '#' },
  {x:2,y:5, type: '.' },
  {x:2,y:6, type: '.' },
  {x:3,y:2, type: '#' },
  {x:3,y:3, type: '.' },
  {x:3,y:4, type: '.' },
  {x:3,y:5, type: '.' },
  {x:3,y:6, type: '.' },
]

const map = []

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  const input = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

  const [mapStr, instructionStr] = input.split('\n\n')

  mapStr.split('\n').forEach((row, y) => {
    row.split('').forEach((char, x) => {
      if (char === '.' || char === '#')
        map.push({ x: x + 1, y: y + 1, type: char })
    })
  })

  player = findStart()

  printMap()

  return

  const instructions = []

  let temp = ''
  instructionStr.split('').forEach(char => {
    if (char === 'R') {
      instructions.push(parseInt(temp))
      temp = ''
      instructions.push('R')
    } else if (char === 'L') {
      instructions.push(parseInt(temp))
      temp = ''
      instructions.push('L')
    } else {
      temp += char
    }
  })
  instructions.push(parseInt(temp))

  instructions.forEach((instruction, idx) => {

    setTimeout(() => {
      if (typeof instruction === 'number') {
        new Array(instruction).fill().forEach((_, y) => {

          //setTimeout(() => {
            movePrime()
            console.clear()
            printMap()

          //}, (idx * 1000) + (y * 100))
        })
      } else {
        if (instruction === 'R') {
          if (rotation === 'up') {
            rotation = 'right'
          } else if (rotation === 'right') {
            rotation = 'down'
          } else if (rotation === 'down') {
            rotation = 'left'
          } else if (rotation === 'left') {
            rotation = 'up'
          }
        } else if (instruction === 'L') {
          if (rotation === 'up') {
            rotation = 'left'
          } else if (rotation === 'left') {
            rotation = 'down'
          } else if (rotation === 'down') {
            rotation = 'right'
          } else if (rotation === 'right') {
            rotation = 'up'
          }
        }
      }
      console.clear()
      printMap()
    }, idx * 1000)
  // count()
  })
})


function count() {
  const column = player.x
  const row = player.y
  const facing = {
    right: 0,
    down: 1,
    left: 2,
    up: 3,
  }[rotation]

  console.log('Total', row, column, facing, '=', (row * 1000) + (column * 4) + facing)
}

function findStart() {
  const y = 1
  const x = map.filter(({y}) => y === 1).reduce(minimum('x'), Infinity)
  return { x, y }
}

function printMap() {
  const xA = map.reduce(minimum('x'), Infinity)
  const xB = map.reduce(maximum('x'), 0)
  const yA = map.reduce(minimum('y'), Infinity)
  const yB = map.reduce(maximum('y'), 0)
  let str = ''
  for (let y = yA; y <= yB; y++) {
    for (let x = xA; x <= xB; x++) {
      const target = map.find(same(x,y))
      if (player.x === x && player.y === y) {
        str += 'P'
      } else if (target === undefined) {
        str += ' '
      } else {
        str += target.type
      }
    }
    str += '\n'
  }
  console.log(str)
}

function movePrime() {
  const x = player.x
  const y = player.y
  
  let modifierX = 0
  if (rotation === 'left') {
    modifierX = -1
  }
  if (rotation === 'right') {
    modifierX = 1
  }
  let modifierY = 0
  if (rotation === 'up') {
    modifierY = -1
  }
  if (rotation === 'down') {
    modifierY = 1
  }
  let target = map.find(same(x+modifierX,y+modifierY))
  if (target === undefined) {
    if (rotation === 'left') {
      const newX = map.filter(({y: yP}) => y === yP).reduce(maximum('x'), 0)
      target = map.find(same(newX, y))
    }
    if (rotation === 'right') {
      const newX = map.filter(({y: yP}) => y === yP).reduce(minimum('x'), Infinity)
      target = map.find(same(newX, y))
    }
    if (rotation === 'down') {
      const newY = map.filter(({x: xP}) => x === xP).reduce(minimum('y'), Infinity)
      target = map.find(same(x, newY))
    }
    if (rotation === 'up') {
      const newY = map.filter(({x: xP}) => x === xP).reduce(maximum('y'), 0)
      target = map.find(same(x, newY))
    }
  }
  if (target.type === '.') {
    player.x = target.x
    player.y = target.y
  }
}

function same(x, y) {
  return ({ x: xP, y: yP }) => x === xP && y === yP
}

function minimum(key) {
  return (acc, curr) => curr[key] < acc ? curr[key] : acc
}

function maximum(key) {
  return (acc, curr) => curr[key] > acc ? curr[key] : acc
}