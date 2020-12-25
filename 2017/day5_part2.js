const fs = require('fs')
const R = require('ramda')

function solveMaze(maze) {
  let idx = 0
  let counter = 0
  
  while(idx < maze.length) {
    //console.log("---------------")
    //console.log(maze + " idx " + idx)
    counter++
    idx = jumpAndIncrement(maze, idx)
    //console.log(idx)
  }

  return counter
}

function jumpAndIncrement(maze, idx) {
  const returnValue = maze[idx] + idx
  maze[idx] = (maze[idx] >= 3) ? maze[idx] = maze[idx] - 1 : maze[idx] = maze[idx] + 1;
  return returnValue
}

const contentStr = fs.readFileSync('day5.txt', 'utf-8')

const mazeStr = contentStr.split(/\n/)

const nonEmpty = R.filter( str => !!str, mazeStr )

const maze = nonEmpty.map( str => parseInt(str) )

console.log(solveMaze(maze))
//console.log(solveMaze([0, 3, 0, 1, -3]))
