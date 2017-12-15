
function hexSteps(str) {
  const instructions = str.split(",")

  const result = instructions.reduce( traverse, { x: 0, y: 0, max: 0 } )

  return {
    endDistance: distanceRec( result.x, result.y ),
    max: result.max
  }
}

const directions = {
  "n":  { x: 0,  y: -1 },
  "nw": { x: -1, y: -1 },
  "ne": { x: 1,  y: 0  },
  "s":  { x: 0,  y: 1  },
  "sw": { x: -1, y: 0  },
  "se": { x: 1,  y: 1  }
}

function traverse( { x, y, max }, direction ) {
  const delta = directions[direction]
  const newPos = { x: x + delta.x, y: y + delta.y }
  const currentDist = distanceRec( newPos.x, newPos.y )
  if (currentDist > max)
    max = currentDist
  return { x: newPos.x, y: newPos.y, max }
}

function distanceRec(x, y) {

  if (x === y) return Math.abs(x)

  if (x === 0) return Math.abs(y)
  if (y === 0) return Math.abs(x)

  if (x < 0 && y < 0)
    return distanceRec(Math.abs(x), Math.abs(y))
  
  if (x < 0)
    return distanceRec(y + 1, Math.abs(x) + 1)

  if (y < 0)
    return distanceRec(Math.abs(y), x + 1)
  
  return distanceRec(x - 1, y - 1) + 1
}



if (process.argv[2])
  console.log(process.argv[2] + ": " + hexSteps(process.argv[2]))

module.exports = { hexSteps, distanceRec }