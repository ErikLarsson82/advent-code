
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

function crawl(goal) {
  let iterations = 1
  while(true) {
    grow(matrix)

    //console.log(matrix)
    //console.log('pos', pos)

    let sequence = []
    if (iterations === 1)
      sequence = [right, up, left, left, down, down, right, right]
    if (iterations === 2)
      sequence = [right, up, up, up, left, left, left, left, down, down, down, down, right, right, right, right]
    if (iterations === 3)
      sequence = [right, up, up, up, up, up, left, left, left, left, left, left, down, down, down, down, down, down, right, right, right, right, right, right]

    while(sequence.length > 0) {
      value ++
      setValue(value)
      //console.log('compare ' +  getValue() + " " + goal)
      if (getValue() === goal) {
        //console.log('found goal', pos, matrix)
        const xDiff = pos.x - Math.floor(matrix[0].length/2)
        const yDiff = pos.y - Math.floor(matrix[0].length/2)
        //console.log('xDiff, yDiff ' + xDiff + " : " + yDiff)
        return Math.abs(xDiff) + Math.abs(yDiff)
      }
      sequence.shift()()
    }

    iterations++
  }
}

let matrix
let pos
let value

function reset() {
  matrix = [[1]]
  pos = { x: 0, y: 0 }
  value = 0
}

reset()
console.log(crawl(20))
/*
reset()
console.log(crawl(3, 1))
reset()
console.log(crawl(3, 2))
reset()
console.log(crawl(3, 3))
reset()
console.log(crawl(3, 4))
reset()
console.log(crawl(3, 5))
reset()
console.log(crawl(3, 6))
reset()
console.log(crawl(3, 7))
reset()
console.log(crawl(3, 8))
reset()
console.log(crawl(3, 9))
reset()
console.log(crawl(3, 10))
reset()
console.log(crawl(3, 11))
reset()
console.log(crawl(3, 12))
reset()
console.log(crawl(3, 13))
*/
console.log(matrix)
