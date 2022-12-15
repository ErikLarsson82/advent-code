const exampleInputA = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

const exampleInputB = `cEc
ESE
cEc`
/*
-> 
[
  [1,1 - 1,0], //north
  [1,1 - 1,2], //south
  [1,1 - 0,1], //east
  [1,1 - 2,1], //west
] 
// Four equally long paths found!
*/

/*
const exampleInputC = `cEc
ESE
cac
cEc`
/*
-> 
[
  [1,1 - 1,0], //north
  [1,1 - 1,2 - 1,3], //south
  [1,1 - 0,1], //east
  [1,1 - 2,1], //west
] 
// One longer path found
*/

let map

generateHeightMap(exampleInputB)
console.log(printMap())

traverse({ x: 1, y: 1 }, [])

function traverse(pos, path) {
	const north = { x: pos.x-1, y: pos.y }
	const south = { x: pos.x+1, y: pos.y }
	const east = { x: pos.x, y: pos.y+1 }
	const west = { x: pos.x, y: pos.y-1 }

	const currentHeight = getHeight(map[pos.x][pos.y])

  let newPaths = []

	if (map[north.x] && map[north.x][north.y] && currentHeight + 1 >= getHeight(map[north.x][north.y])) {
		newPaths.push(traverse(north, path))
	}
	if (map[south.x] && map[south.x][south.y] && currentHeight + 1 >= getHeight(map[south.x][south.y])) {
		newPaths.push(traverse(south, path))
	}
	if (map[east.x] && map[east.x][east.y] && currentHeight + 1 >= getHeight(map[east.x][east.y])) {
		newPaths.push(traverse(east, path))
	}
	if (map[west.x] && map[west.x][west.y] && currentHeight + 1 >= getHeight(map[west.x][west.y])) {
		newPaths.push(traverse(west, path))
	}
  return newPaths
}

function generateHeightMap(str) {

  const rows = str.trim().split('\n').map(x => x.trim())
  const vSize = rows.length
  const hSize = rows[0].length

  map = new Array(hSize).fill().map(() => new Array(vSize).fill('.'))
  
  rows.forEach((row, yIdx) => {  
    row.split('').forEach((value, xIdx) => {
      map[xIdx][yIdx] = value
    })
  })
}

function printMap() {
  let str = ''
  doForAllHeights((x, y) => {
    str += map[y][x]
  }, () => {
    str += '\n'
  })
  return str
}


function doForAllHeights(f, fPrime) {
  for (let x = 0; x < map[0].length; x++) {
    for (let y = 0; y < map.length; y++) {
      f(x, y)
    }
    fPrime && fPrime()
  }
}

function getHeight(str) {
	if (str === 'S') return 97
	return str.charCodeAt(0)
}