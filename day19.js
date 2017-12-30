const fs = require('fs')
const contentStr = fs.readFileSync('day19_input.txt', 'utf-8')

const letters = "ABCDEFGIJKLMNOPQRSTUVQYZ"

function seriesOfTubes(str) {
  const tubes = str.split("\n").map( x => x.split("") )

  
  let pos = findStart(tubes)
  console.log(str, pos)

  const acc = {
    pos,
    direction: "down",
    trail: [],
    endFound: false,
    tubes
  }

  while(!acc.endFound) {
    traverse(acc)
  }

  return acc
}

function traverse(acc) {
  console.log(acc.pos, acc.tubes[acc.pos.y][acc.pos.x])
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

console.log(seriesOfTubes(contentStr).trail.join(""))

module.exports = { seriesOfTubes }