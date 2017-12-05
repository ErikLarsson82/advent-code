
function crawl(goal) {
  if (goal === 1)
    return 0
  return findValue({ horizontal: 1, vertical: 0, value: 2, direction: "up" }, goal)
}

function findValue({ horizontal, vertical, value, direction }, goal) {

  if (value === goal)
    return Math.abs(horizontal) + Math.abs(vertical)
    
  const bottomLeft = (horizontal >= 1 && vertical <= -1)
  const newLayer = (horizontal >= 1 && vertical <= -1 && horizontal+vertical === 1)

  if ( Math.abs(horizontal) === Math.abs(vertical) && !bottomLeft || newLayer )
    direction = turn(direction)

  const updated = forward({ horizontal, vertical, direction })
    
  value++

  return findValue({ horizontal, vertical, value, direction, ...updated }, goal)
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

console.log(crawl(1024)) //31

console.log(crawl(368078)) //
