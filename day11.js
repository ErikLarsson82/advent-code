
function hexSteps(str) {
  const instructions = str.split(",")

  const pos = {
    x: 0,
    y: 0
  }

  const result = instructions.reduce( traverse, pos )
  return distance( result.x, result.y )
}

const directions = {
  "n":  { x: 0,  y: -1 },
  "nw": { x: -1, y: -1 },
  "ne": { x: 1,  y: 0  },
  "s":  { x: 0,  y: 1  },
  "sw": { x: -1, y: 0  },
  "se": { x: 1,  y: 1  }
}

function traverse( { x, y }, direction ) {
  const delta = directions[direction]
  return { x: x + delta.x, y: y + delta.y }
}

function distance(a, b) {
  return Math.abs(a) + Math.abs(b)
}

if (process.argv[2])
  console.log(process.argv[2] + ": " + hexSteps(process.argv[2]))

module.exports = { hexSteps }