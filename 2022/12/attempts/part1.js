
const exampleInputA = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

const exampleInputB = `30373
25512
65332
33549
35390`

const exampleInputC = `SaE
aaa`

let map

generateHeightMap(exampleInputC)
console.log(printMap())

console.log(findShortestPath([{ x: 0, y: 0 }], 0))

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

function hasTried(pos, path) {
	return !!path.find(p => p.x === pos.x && p.y === pos.y)
}

function old() {
	const evolution = []

	branches.forEach(branch => {
		const north = { x: branch.x-1, y: branch.y }
		const south = { x: branch.x+1, y: branch.y }
		const east = { x: branch.x, y: branch.y+1 }
		const west = { x: branch.x, y: branch.y-1 }

		if (map[east.x] && map[east.x][east.y] === 'E') {
			evolution.push(branch.concat({ x: east.x, y: east.y, d: branch.d+1 }))
			return
		}

		/*if (map[north.x] && map[north.x][north.y] && !hasTried({ x: north.x, y: north.y }, path)) {
			console.log('north exist')
			branches.push(findShortestPath(path.concat({ x: north.x, y: north.y })))
		}
		if (map[south.x] && map[south.x][south.y] && !hasTried({ x: south.x, y: south.y }, path)) {
			console.log('south exist')
			branches.push(findShortestPath(path.concat({ x: south.x, y: south.y })))
		}*/
		//if (map[east.x] && map[east.x][east.y] && !hasTried({ x: east.x, y: east.y }, branches)) {
			//console.log('east exist')
			//branches.push(findShortestPath(path.concat({ x: east.x, y: east.y })))
			//return branches.concat({ x: east.x, y: east.y, d: branch.d+1 })
		//}
		/*
		if (map[west.x] && map[west.x][west.y] && !hasTried({ x: west.x, y: west.y }, path)) {
			console.log('west exist')
			branches.push(findShortestPath(path.concat({ x: west.x, y: west.y })))
		}
		console.log('branches', branches) //.map(b => b.length).join(' - '))*/
		//return path
	})

	return evolution
}

function findShortestPath(path, distance) {
  const east = { x: branch.x+1, y: branch.y }
  const south = { x: branch.x, y: branch.y+1 }

  if (map[east.x][east.y] === 'E') {
    return path
  } else {
    return path.concat({ x: east.x, y: east.y, d: branch.d+1 })
  }
}


// 0,0 -> 0,0 0,1 bust + 0,0 1,0 bust