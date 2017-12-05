
function crawl(goal, callback) {
  if (goal === 1)
    return 0
  findValue({ horizontal: 1, vertical: 0, value: 2, direction: "up" }, goal, callback)
}

function findValue({ horizontal, vertical, value, direction }, goal, callback) {

  if (value === goal) {
    callback(Math.abs(horizontal) + Math.abs(vertical))
    return
  }
    
  const bottomLeft = (horizontal >= 1 && vertical <= -1)
  const newLayer = (horizontal >= 1 && vertical <= -1 && horizontal+vertical === 1)

  if ( Math.abs(horizontal) === Math.abs(vertical) && !bottomLeft || newLayer )
    direction = turn(direction)

  const updated = forward({ horizontal, vertical, direction })
    
  value++

  process.nextTick(() => findValue({ horizontal, vertical, value, direction, ...updated }, goal, callback))
}

function turn(direction) {
  const turns = {
    "up": "left",
    "left": "down",
    "down": "right",
    "right": "up"
  }
  return turns[direction]
}

function forward({ horizontal, vertical, direction }) {

  if (direction === "up")
    vertical++

  if (direction === "down")
    vertical--

  if (direction === "left")
    horizontal--

  if (direction === "right")
    horizontal++

  return { horizontal, vertical }
}

crawl(1024, console.log) //31
crawl(368078, console.log) //371
