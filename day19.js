const fs = require('fs')
const contentStr = fs.readFileSync('day19_input.txt', 'utf-8')
const clone = require('clone')

const letters = "ABCDEFGIJKLMNOPQRSTUVQYZ"

function seriesOfTubes(str, callback) {
  const tubes = str.split("\n").map( x => x.split("") )

  let pos = findStart(tubes)
  
  const acc = {
    pos,
    direction: "down",
    trail: [],
    endFound: false,
    tubes
  }

  let interval = setInterval(() => {
    print(acc)
    traverse(acc)
    if (acc.endFound)
      clearInterval(interval)
    callback(acc.trail.join(""))
  }, 300)
}

function print(acc) {
  let newMap = clone(acc.tubes)
  newMap[acc.pos.y][acc.pos.x] = "@"
  newMap = newMap.map( x => x.slice(0, 240) )
  newMap = newMap.slice(0, 100)
  newMap = newMap.map( x => x.join("") + "\n" )
  console.log(newMap.join(""))
}

function traverse(acc) {
  
  const actions = {
    "up":    () => acc.pos.y--,
    "down":  () => acc.pos.y++,
    "left":  () => acc.pos.x--,
    "right": () => acc.pos.x++
  }
  actions[acc.direction]()
  if (letters.indexOf(acc.tubes[acc.pos.y][acc.pos.x]) !== -1)
    acc.trail = acc.trail.concat(acc.tubes[acc.pos.y][acc.pos.x])

  function isSomething(pos) {
    return pos && pos !== " "
  }

  if (acc.tubes[acc.pos.y][acc.pos.x] === "+") {
    if (acc.direction === "up" || acc.direction === "down") {
      if (isSomething(acc.tubes[acc.pos.y][acc.pos.x-1])) {
        acc.direction = "left"
      } else if (isSomething(acc.tubes[acc.pos.y][acc.pos.x+1])) {
        acc.direction = "right"
      } else {
        acc.endFound = true
      }
    } else {
      if (isSomething(acc.tubes[acc.pos.y-1][acc.pos.x])) {
        acc.direction = "up"
      } else if (isSomething(acc.tubes[acc.pos.y+1][acc.pos.x])) {
        acc.direction = "down"
      } else {
        acc.endFound = true 
      }
    }
  } else if (acc.tubes[acc.pos.y][acc.pos.x] === " ") {
    acc.endFound = true
  }

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