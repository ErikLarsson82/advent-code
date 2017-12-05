
function grow(matrix) {
  matrix.forEach( list => list.unshift(0) )
  matrix.forEach( list => list.push(0) )
  matrix.unshift( new Array(matrix[0].length).fill(0) )
  matrix.push( new Array(matrix[0].length).fill(0) )
  pos.x +=1
  pos.y +=1
}

function getValue() {
  return matrix[pos.x][pos.y]
}

function setValue(value) {
  console.log(pos)
  return matrix[pos.x][pos.y] = value
}

const up = (function() {
  return () => pos.y -= 1
})()

const down = (function() {
  return () => pos.y += 1
})()

const left = (function() {
  return () => pos.x -= 1
})()

const right = (function() {
  return () => pos.x += 1
})()

function crawl(maxIterations) {
  let iterations = 0
  while(iterations <= maxIterations) {
    grow(matrix)
    console.log(matrix)

    let sequence = []
    if (iterations === 0)
      sequence = [right, up, left, left, down, down, right, right, right]
    if (iterations === 1)
      sequence = [up, up, up, left, left, left, left, down, down, down, down, right, right, right, right]

    while(sequence.length > 0) {
      value ++
      setValue(value)
      sequence.shift()()
    }

    iterations++
  }
  console.log(matrix)
}

const matrix = [[1]]

let pos = { x: 0, y: 0 }
let value = 0

//grow(matrix)

crawl(2)

//grow(matrix)

//console.log(matrix, value())

//grow(matrix)

//console.log(matrix, value())