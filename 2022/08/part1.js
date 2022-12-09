require('fs').readFile('./puzzle-input.txt', 'utf-8', (err, data) => {

  generateForest(data)

  console.log(printTrees())

  let visibleTrees = 0

  doForAllTrees((x, y) => {
    const visibleUp = testUp(trees[x][y], x, y)
    const visibleDown = testDown(trees[x][y], x, y)
    const visibleLeft = testLeft(trees[x][y], x, y)
    const visibleRight = testRight(trees[x][y], x, y)

    if (visibleUp || visibleDown || visibleLeft || visibleRight) {
      visibleTrees++
    }
    // console.log('x', x, 'y', y, visibleUp, visibleDown, visibleLeft, visibleRight)
  })

  console.log('Total visible trees', visibleTrees)

})

const exampleInput = `30373
25512
65332
33549
35390`

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
  let visible = true
  for (let y = yPrime-1; y >= 0; y--) {
    if (trees[x][y] >= height) {
      visible = false
    }
  }
  return visible
}

function testDown(height, x, yPrime) {
  let visible = true
  for (let y = yPrime+1; y <= trees.length-1; y++) {
    if (trees[x][y] >= height) {
      visible = false
    }
  }
  return visible
}

function testLeft(height, xPrime, y) {
  let visible = true
  for (let x = xPrime-1; x >= 0; x--) {
    if (trees[x][y] >= height) {
      visible = false
    }
  }
  return visible
}

function testRight(height, xPrime, y) {
  let visible = true
  for (let x = xPrime+1; x <= trees.length-1; x++) {
    if (trees[x][y] >= height) {
      visible = false
    }
  }
  return visible
}
