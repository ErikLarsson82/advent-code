/*
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    map.forEach(findProposition)
    map.forEach(moveIfAlone)
    map.forEach(reset)
    cycleOrder()
    printMap()
    console.log('Empty ground', countEmptyGround())
  }
});
*/

const moveSet = {
  N:  (x, y) => ({ x, y: y-1 }),
  NE: (x, y) => ({ x: x + 1, y: y-1 }),
  NW: (x, y) => ({ x: x - 1, y: y-1 }),
  S:  (x, y) => ({ x, y: y+1 }),
  SE: (x, y) => ({ x: x + 1, y: y+1 }),
  SW: (x, y) => ({ x: x - 1, y: y+1 }),
  W:  (x, y) => ({ x: x - 1, y }),
  E:  (x, y) => ({ x: x + 1, y }),
}

let order = ['N', 'S', 'W', 'E']

function cycleOrder() {
  const head = order.slice(0,1)
  order = order.slice(1).concat(head)
}

const _map = [
  { x: 3, y: 2, propose: null },
  { x: 4, y: 2, propose: null },
  { x: 3, y: 3, propose: null },
  { x: 3, y: 5, propose: null },
  { x: 4, y: 5, propose: null },
]

const map = []

const input = `..............
..............
.......#......
.....###.#....
...#...#.#....
....#...##....
...#.###......
...##.#.##....
....#..#......
..............
..............
..............`

function minimum(key) {
  return (acc, curr) => curr[key] < acc ? curr[key] : acc
}

function maximum(key) {
  return (acc, curr) => curr[key] > acc ? curr[key] : acc
}

function same(x, y) {
  return ({ x: xP, y: yP }) => x === xP && y === yP
}

function countEmptyGround() {
  const xA = map.reduce(minimum('x'), Infinity)
  const xB = map.reduce(maximum('x'), 0)
  const yA = map.reduce(minimum('y'), Infinity)
  const yB = map.reduce(maximum('y'), 0)
  const width = xB - xA + 1
  const height = yB - yA + 1
  console.log(xA, xB, yA, yB, width, height)
  return (width * height) - map.length
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
      if (target === undefined) {
        str += '.'
      } else {
        str += '#'
      }
    }
    str += '\n'
  }
  console.log(str)
}

const moves = {
  N: ['N', 'NE', 'NW'],
  S: ['S', 'SE', 'SW'],
  W: ['W', 'NW', 'SW'],
  E: ['E', 'NE', 'SE'],
}

const noPropose = elf => elf.propose === null

function elfAtPosition(x, y) {
  return elf => elf.x === x && elf.y === y
}

function reset(elf) {
  elf.propose = null
}

function samePropositions(eA, eB) {
  if (eB.propose === null) return false
  const sameP = (eA.propose.x === eB.propose.x && eA.propose.y === eB.propose.y)
  const itsMe = (eA.x === eB.x && eA.y === eB.y)
  return sameP && !itsMe
}

function findProposition(elf) {
  const adjacentElves = Object.keys(moveSet).filter(key => {
    const targetPos = moveSet[key](elf.x, elf.y)
    return map.find(elfAtPosition(targetPos.x, targetPos.y)) !== undefined
  })

  if (adjacentElves.length === 0) return

  order.forEach(direction => {
    if (elf.propose === null) {
      const onlyEmpty = moves[direction].filter(move => {
        const targetPos = moveSet[move](elf.x, elf.y)
        return map.find(elfAtPosition(targetPos.x, targetPos.y)) === undefined
      })

      if (onlyEmpty.length === 3) {
        elf.propose = moveSet[direction](elf.x, elf.y)
      }
    }
  })
}

function moveIfAlone(elf) {
  if (elf.propose === null) return

  const other = map.find(elfPrime => samePropositions(elf, elfPrime))
  if (!other) {
    elf.x = elf.propose.x
    elf.y = elf.propose.y
  }
}

require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  data.split('\n')
    .map((row, y) => 
      row.split('').map((char, x) => {
        if (char === '#')
          map.push({ x: x + 100, y: y + 100, propose: null })
      })
    )

  for (let i = 0; i < 10; i++) {
    map.forEach(findProposition)
    map.forEach(moveIfAlone)
    map.forEach(reset)
    cycleOrder()
    console.log('Empty ground', countEmptyGround())
  }

  console.log('simulation done')
  console.log('Empty ground', countEmptyGround())
})
