const fs = require('fs')
const contentStrEx = fs.readFileSync('day19_example.txt', 'utf-8')
const contentStr = fs.readFileSync('day19_input.txt', 'utf-8')
const clone = require('clone')
const { curry } = require('ramda')
const Jetty = require('jetty')
var jetty = new Jetty(process.stdout)
jetty.clear()

const letters = "ABCDEFGIJKLMNOPQRSTUVQYZ"

function seriesOfTubes(str, callback) {
  const tubes = str.split("\n").map( x => x.split("") )

  let pos = findStart(tubes)
  
  const acc = {
    pos,
    direction: "down",
    trail: [],
    endFound: false,
    steps: 0,
    tubes
  }

  let interval = setInterval(() => {
    //print(acc)
    traverse(acc)
    if (acc.endFound) {
      clearInterval(interval)
      callback(acc.trail.join(""), acc.steps)
    }
  }, 1)
}

function print(acc) {
  let newMap = clone(acc.tubes)
  newMap[acc.pos.y][acc.pos.x] = "@"
  let slicePos = [0, 100]
  if (acc.pos.y > 100)
    slicePos = [100, 200]
  if (acc.pos.y > 200)
    slicePos = [200, 300]
  newMap = newMap.map( x => x.slice(0, 240) )
  newMap = newMap.slice(slicePos[0], slicePos[1])
  newMap = newMap.map( x => x.join("") + "\n" )
  
  jetty.moveTo([0,0])
  newMap.forEach( x => jetty.text(x) )
}

function isSomething(pos) {
  return pos && pos !== " "
}

const findInTubes = curry((tubes, pos, modX, modY) => {
  return tubes[pos.y + modY][pos.x + modX]
})

function traverse(acc) {
  acc.steps++
  const actions = {
    "up":    () => acc.pos.y--,
    "down":  () => acc.pos.y++,
    "left":  () => acc.pos.x--,
    "right": () => acc.pos.x++
  }
  actions[acc.direction]()

  const find = findInTubes(acc.tubes, acc.pos)

  if (letters.indexOf(find(0,0)) !== -1)
    acc.trail = acc.trail.concat(find(0,0))

  const horizontal = () => {
    const up = find(0, -1)
    const down = find(0, +1)
    if (isSomething(up))
      acc.direction = "up"
    if (isSomething(down))
      acc.direction = "down"
  }

  const vertical = () => {
    const left = find(-1, 0)
    const right = find(+1, 0)
    if (isSomething(left))
      acc.direction = "left"
    if (isSomething(right))
      acc.direction = "right"
  }

  const cornerFound = (find(0,0) === "+")
  const isVertical = (acc.direction === "up" || acc.direction === "down")
  const isEmpty = (find(0,0) === " ")

  const move = () => (isVertical) ? vertical() : horizontal()
  const checkForEnd = () => (isEmpty) ? acc.endFound = true : null;

  (cornerFound) ? move() : checkForEnd()
  
  return acc
}

function findStart(tubes) {
  return {
    x: tubes[0].indexOf("|"),
    y: 0
  }
}

seriesOfTubes(contentStr, console.log)

module.exports = { seriesOfTubes }