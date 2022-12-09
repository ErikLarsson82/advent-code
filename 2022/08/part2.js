require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {


const exampleInput = `30373
25512
65332
33549
35390`

  generateForest(data)

  console.log(printTrees())
  
  let largest = 0

  doForAllTrees((x, y) => {
    const scoreUp = testUp(trees[x][y], x, y)
    const scoreDown = testDown(trees[x][y], x, y)
    const scoreLeft = testLeft(trees[x][y], x, y)
    const scoreRight = testRight(trees[x][y], x, y)

    const totalScore = scoreUp * scoreDown * scoreLeft * scoreRight
    console.log('x', x, 'y', y, ' score', totalScore)

    if (totalScore > largest) {
      largest = totalScore
    }
    // console.log('x', x, 'y', y, visibleUp, visibleDown, visibleLeft, visibleRight)
  })

  console.log('Largest scenic score', largest)

})

const trees = []

function generateForest(str) {

  const rows = str.trim().split('\n').map(x => x.trim())
  const size = rows.length

  rows.forEach(() => {
    trees.push(new Array(size).fill())
  })

  rows.forEach((row, yIdx) => {  
    row.split('').forEach((column, xIdx) => {
      trees[xIdx][yIdx] = column
    })
  })
}

function doForAllTrees(f, fPrime) {
  for (let x = 0; x < trees.length; x++) {
    for (let y = 0; y < trees.length; y++) {
      f(x, y)
    }
    fPrime && fPrime()
  }
  
}

function printTrees() {
  let str = ''
  doForAllTrees((x, y) => {
    str += trees[y][x]
  }, () => {
    str += '\n'
  })
  return str
}

function testUp(height, x, yPrime) {
  let score = 0
  for (let y = yPrime-1; y >= 0; y--) {
    score++
    if (trees[x][y] >= height) {
      break;
    }
  }
  return score
}

function testDown(height, x, yPrime) {
  let score = 0
  for (let y = yPrime+1; y <= trees.length-1; y++) {
    score++
    if (trees[x][y] >= height) {
      break;
    }
  }
  return score
}

function testLeft(height, xPrime, y) {
  let score = 0
  for (let x = xPrime-1; x >= 0; x--) {
    score++
    if (trees[x][y] >= height) {
      break;
    }
  }
  return score
}

function testRight(height, xPrime, y) {
  let score = 0
  for (let x = xPrime+1; x <= trees.length-1; x++) {
    score++
    if (trees[x][y] >= height) {
      break;
    }
  }
  return score
}
