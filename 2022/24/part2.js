let start = { x: 1, y: 0 }
let players = [{x:1,y:0}]
let newPlayers = []
let iteration = 0

const winds = []

const input = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`

let width
let height

let map

let ending = null

let phase = 'first'

/*
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {

    moveWinds()
    console.log('Winds move')
    printMap('standard')

    newPlayers = []
    players.forEach(movePlayer)
    players = newPlayers
    console.log(players)
    console.log('Players move')
    printMap('players-only')

    if (players.find(same(6, 5)) !== undefined) {
      console.log('Player found exit at', iteration + 1, 'moves')
    }

    iteration++
  }
});
*/

const dirs = {
  '>': (x,y) => ({ x: x+1, y }),
  '<': (x,y) => ({ x: x-1, y }),
  '^': (x,y) => ({ x,      y: y-1}),
  'v': (x,y) => ({ x,      y: y+1}),
}

const playerOptions = {
  ...dirs,
  's': (x,y) => ({ x, y })
}

const wraps = {
  '>': (x,y) => ({ x: 1      , y }),
  '<': (x,y) => ({ x: width-2, y }),
  '^': (x,y) => ({ x,          y: height-2 }),
  'v': (x,y) => ({ x,          y: 1 }),  
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {


  width = data.trim().split('\n')[0].length
  height = data.trim().split('\n').length

  map = generateMountain(width, height)

  data.trim().split('\n').forEach((row, y, list) => {
    row.split('').forEach((char, x) => {
      if (char === '#') {
        map[x][y] = '#'
      } else if (char === '.') {
        
      } else if (char === 'E') {
        
      } else {
        winds.push({ x, y, direction: char })
      }
    }) 
  })

  ending = { x: width-2, y: height-1 }

  // printMap('standard')

  console.log('found map with', width, height, ending)
  
  while (true) {
    moveWinds()
    console.log('Winds move')
    const part1 = printMap('standard')

    newPlayers = []
    players.forEach(movePlayer)
    players = newPlayers
    console.log('Players move')
    printMap('players-only', part1)

    if (phase === 'first' && players.find(same(ending.x, ending.y)) !== undefined) {
      console.log('Player found exit at', iteration + 1, 'moves')
      players = [{ x: ending.x, y: ending.y }]
      phase = 'second'
    } else if (phase === 'second' && players.find(same(start.x, start.y)) !== undefined) {
      console.log('Player found start! at', iteration + 1, 'moves')
      players = [{ x: start.x, y: start.y }]
      phase = 'third'
    } else if (phase === 'third' && players.find(same(ending.x, ending.y)) !== undefined) {
      console.log('Player found ultimate exit at', iteration + 1, 'moves')
      break;
    }

    iteration++
  }
})

function checkPositions(x, y) {
  let options = []
  Object.keys(playerOptions).forEach(option => {
    const target = playerOptions[option](x, y)
    const isWall = map[target.x][target.y] === '#'
    const isOutsideBoundary = target.y < 0 || target.y > height-1
    const isWind = winds.filter(same(target.x,target.y)).length > 0
    if (!isWall && !isOutsideBoundary && !isWind) {
      options.push(option)
    }
  }) 
  return options
}

function movePlayer(player, idx, list) {
  const options = checkPositions(player.x, player.y)
  options.forEach(o => {
    const target = playerOptions[o](player.x, player.y)
    if (newPlayers.find(same(target.x,target.y)) === undefined) {
      newPlayers.push(target)
    }
  })
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

function same(x, y) {
  return ({x: xP, y: yP}) => x === xP && y === yP
}

function printMap(setting, part1) {
  let str = ''
  doForAllMountainSpots(map, (x, y) => { 
    if (setting === 'players-only') {
      if ( !!players.find(same(x, y)) ) {
        str += 'P'
      } else {
        str += map[x][y]
      }
    } else if (setting === 'standard') {
      if (x === ending.x && y === ending.y) {
        str += 'E' 
        return
      
      }
      const ws = winds.filter(same(x,y))
      if (ws.length === 1) {
        str += ws[0].direction 
      } else if (ws.length > 1) { 
        str += ws.length
      } else {
        str += map[x][y]
      }
    } else {
      throw new Error('needs configuration: panic')
    }
  }, () => {
    str += '\n'
  })
  if (setting !== 'standard') {
    console.log(part1)
    console.log(str)
  }
  return str
}


