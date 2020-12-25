let matrix, pos, value

function grow(matrix) {
  matrix.forEach( list => list.unshift(0) )
  matrix.forEach( list => list.push(0) )
  matrix.unshift( new Array(matrix[0].length).fill(0) )
  matrix.push( new Array(matrix[0].length).fill(0) )
  pos.x +=1
  pos.y +=1
}

function getValue(x, y) {
  return matrix[x] && matrix[x][y] || 0
}

function setValue(value) {
  return matrix[pos.x][pos.y] = value
}

const up = function() {
  return pos.y -= 1
}

const down = function() {
  return pos.y += 1
}

const left = function() {
  return pos.x -= 1
}

const right = function() {
  return pos.x += 1
}

function getNeighborSum(pos) {
  return getValue(pos.x - 1, pos.y - 1) +
    getValue(pos.x, pos.y - 1) +
    getValue(pos.x + 1, pos.y - 1) +
    getValue(pos.x - 1, pos.y) +
    getValue(pos.x, pos.y) +
    getValue(pos.x + 1, pos.y) +
    getValue(pos.x - 1, pos.y + 1) +
    getValue(pos.x, pos.y + 1) +
    getValue(pos.x + 1, pos.y + 1)
}

function crawl(goal) {
  while(true) {
    grow(matrix)

    let sequence = []
    sequence.push(right)

    new Array(matrix.length - 2).fill(1).forEach( () => sequence.push(up) )
    new Array(matrix.length - 1).fill(1).forEach( () => sequence.push(left) )
    new Array(matrix.length - 1).fill(1).forEach( () => sequence.push(down) )
    new Array(matrix.length - 1).fill(1).forEach( () => sequence.push(right) )

    while(sequence.length > 0) {
      value = getNeighborSum(pos)
      setValue(value)
      if (value > goal)
        return value

      sequence.shift()()
    }
  }
}

function reset() {
  matrix = [[1]]
  pos = { x: 0, y: 0 }
  value = 0
}

reset()
console.log(crawl(368078)) //369601
console.log(matrix)