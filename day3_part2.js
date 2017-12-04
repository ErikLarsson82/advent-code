
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

function crawl(iterations) {
  while(iterations > 0) {
    grow(matrix)
    console.log(matrix)
    //right()
    iterations--

    let sequence
    if (iterations === 1)
      sequence = [right]
    if (iterations === 0)
      sequence = [up, left, left, down, down, right, right, right, right]
    if (iterations === 1337)
      sequence = [up, up, up, left, left, left, left, down, down, down, down, right, right, right, right]

    while(sequence.length > 0) {
      value ++
      setValue(value)
      sequence.shift()()
    }
  }
}

const matrix = [[1]]

let pos = { x: 0, y: 0 }
let value = 0

crawl(1)

console.log(matrix[0][0] + " " + matrix[1][0] + " " + matrix[2][0] + " " + matrix[3][0] + " " + matrix[4][0])
console.log(matrix[0][1] + " " + matrix[1][1] + " " + matrix[2][1] + " " + matrix[3][1] + " " + matrix[4][1])
console.log(matrix[0][2] + " " + matrix[1][2] + " " + matrix[2][2] + " " + matrix[3][2] + " " + matrix[4][2])
console.log(matrix[0][3] + " " + matrix[1][3] + " " + matrix[2][3] + " " + matrix[3][3] + " " + matrix[4][3])
console.log(matrix[0][4] + " " + matrix[1][4] + " " + matrix[2][4] + " " + matrix[3][4] + " " + matrix[4][4])
//grow(matrix)

//console.log(matrix, value())

//grow(matrix)

//console.log(matrix, value())