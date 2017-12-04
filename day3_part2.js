
function grow(matrix) {
  matrix.forEach( list => list.unshift(0) )
  matrix.forEach( list => list.push(0) )
  matrix.unshift( new Array(matrix[0].length).fill(0) )
  matrix.push( new Array(matrix[0].length).fill(0) )
  pos.x +=1
  pos.y +=1
}

function value() {
  return matrix[pos.x][pos.y]
}

const matrix = [[1]]

let pos = { x: 0, y: 0 }

grow(matrix)

console.log(matrix, value())

grow(matrix)

console.log(matrix, value())

grow(matrix)

console.log(matrix, value())