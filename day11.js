
function hexSteps(str) {
  const instructions = str.split(",")

  const pos = {
    x: 0,
    y: 0
  }

  const result = instructions.reduce( traverse, pos )
  console.log(result)
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

function distance(x, y) {
  
  let counter = 0
  if (y > 0) {
    if (x > y) {
      while(y > 0) {
        counter++
        x--
        y--
      }

      return counter + x
    }
    if (y > x) {
      console.log('its true')
      while(x > 0) {
        counter++
        x--
        y--
      }

      return counter + y
    }
  }

  if (y < 0) {
    while(y < 0) {
      counter++
      y++
      x++
    }

    return counter + x
  }
    
  return Math.abs(x) + Math.abs(y)
}

if (process.argv[2])
  console.log(process.argv[2] + ": " + hexSteps(process.argv[2]))

module.exports = { hexSteps }