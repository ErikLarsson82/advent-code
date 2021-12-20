

const grid = new Array(10).fill().map(x => {
	return new Array(10).fill().map(y => {
		return null
	})
})


const _ = [
	'1163751742',
	'1381373672',
	'2136511328',
	'3694931569',
	'7463417111',
	'1319128137',
	'1359912421',
	'3125421639',
	'1293138521',
	'2311944581',
].forEach((row, y) => {
	return row.split('').forEach((item, x) => {
		grid[x][y] = item
	})
})

const width = grid.length
const height = grid[0].length

// grid[0][0] = 0

function printGrid() {
	let str = ''
	for (var y = 0; y < height; y++) {
		for (var x = 0; x < width; x++) {
			str += grid[x][y]
		}
		str += '\n'
	}
	return str
}

const path = [
	{ x: 0, y: 0 },
	/*{ x: 0, y: 1 },
	{ x: 0, y: 2 },
	{ x: 0, y: 3 },
	{ x: 1, y: 3 },
	{ x: 1, y: 2 },
	{ x: 2, y: 2 },
	{ x: 2, y: 3 },*/
]

function investigate(path) {
	const end = path[path.length-1]
	// console.log('calling investigate', path, end, width-1)

	if (end.x === width-1 && end.y === height-1) {
		return {
			sum: grid[width-1][height-1],
			path
		}
	}
	
	/*
	// north - where i came from (already in path)
	const north = apply('north', end)
	const northPosition = grid[north.x] && grid[north.x][north.y]
	const isNorthInPath = path.find(samePos(north))
	console.log('north is', northPosition, north, isNorthInPath)
	if (northPosition && !isNorthInPath)  {
		// more
		console.log('go deeper north')
	}
	
	// south - outside of boundary
	const south = apply('south', end)
	const southPosition = grid[south.x] && grid[south.x][south.y]
	const isSouthInPath = path.find(samePos(south))
	console.log('south is', southPosition, south, isSouthInPath)
	if (southPosition && !isSouthInPath)  {
		// more
		console.log('go deeper south')
	}
	

	// west - where i came from (already in path)
	const west = apply('west', end)
	const westPosition = grid[west.x] && grid[west.x][west.y]
	const isWestInPath = path.find(samePos(west))
	console.log('west is', westPosition, west, isWestInPath)
	if (westPosition && !isWestInPath)  {
		// more
		console.log('go deeper west')
	}

	// east - finish - return score
	const east = apply('east', end)
	const eastPosition = grid[east.x] && grid[east.x][east.y]
	const isEastInPath = path.find(samePos(east))
	console.log('east is', eastPosition, east, isEastInPath)
	if (eastPosition && !isEastInPath)  {
		// more
		console.log('go deeper east')
		return grid[end.x][end.y] + investigate(path.concat(east))
	}
	*/

	const values = ['north', 'east', 'south', 'west'].map(direction => {
		const target = apply(direction, end)
		const targetValue = grid[target.x] && grid[target.x][target.y]
		const isInPath = path.find(samePos(target))
		//console.log('is', target, targetValue, isInPath)
		if (targetValue && !isInPath)  {
			// more
			const deeper = investigate(path.concat(target))
			if (!deeper) {
				return null
			}
			//console.log('at sum', deeper, 'go deeper, from:', path.concat(target))
			return {
				sum: grid[end.x][end.y] + deeper.sum,
				path: deeper.path
			}
		}
	}).filter(isSomething)
	//console.log(values)
	if (values.length === 0) {
		// dead end
		return {
			sum: 0,
			path
		} 
	}
	return values.sort((a, b) => a.sum > b.sum ? 1 : -1)[0]
}

const coordinate = {
	north: { x: 0, y: -1 },
	south: { x: 0, y: 1 },
	west: { x: -1, y: 0 },
	east: { x: 1, y: 0 },
}

function samePos(posA) {
	return posB => posA.x === posB.x && posA.y === posB.y
}

function apply(direction, _coordinate) {
	return {
		x: _coordinate.x + coordinate[direction].x,
		y: _coordinate.y + coordinate[direction].y
	}
}

function isSomething(stuff) {
	return stuff !== null && stuff !== undefined
}

console.log(printGrid())
console.log(investigate(path))